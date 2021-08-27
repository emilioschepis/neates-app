import type { ApolloCache, DocumentNode, FetchResult } from "@apollo/client";
import produce from "immer";
import type { WritableDraft } from "immer/dist/internal";

import firebase from "../firebase/firebase";
import { CreateNoteMutation, DeleteNoteMutation, MyNotesDocument, MyNotesQuery } from "../graphql/generated";

export const updateQueryCache = <T>(
  cache: ApolloCache<unknown>,
  query: DocumentNode,
  variables: object = {},
  recipe: (draft: WritableDraft<T>) => void
) => {
  const cached = cache.readQuery<T>({ query, variables });

  if (cached) {
    cache.writeQuery<T>({
      query,
      variables,
      data: produce(cached, recipe as any),
    });
  }
};

export const updateCacheWith =
  <T>(f: (cache: ApolloCache<T>, data: T) => void) =>
  (cache: ApolloCache<T>, mutation: Omit<FetchResult<T>, "context">) => {
    if (!cache) return;
    if (!mutation) return;
    if (!mutation.data) return;

    return f(cache, mutation.data);
  };

export function updateCacheAfterCreateNote(cache: ApolloCache<CreateNoteMutation>, data: CreateNoteMutation) {
  const userId = firebase.auth().currentUser?.uid;

  if (!userId) {
    return;
  }

  updateQueryCache<MyNotesQuery>(cache, MyNotesDocument, { userId }, (draft) => {
    draft.notes.splice(0, 0, {
      __typename: "note",
      id: data.create_note.note.id,
      content: data.create_note.note.content,
      createdAt: data.create_note.note.createdAt,
      views_aggregate: {
        aggregate: {
          count: 0,
        },
      },
    });
  });
}

export function updateCacheAfterDeleteNote(cache: ApolloCache<DeleteNoteMutation>, data: DeleteNoteMutation) {
  const normalizedListId = cache.identify({ id: data.delete_note?.id, __typename: data.delete_note?.__typename });

  // Removes the note from the map cache in case it is still visible.
  const normalizedMapId = cache.identify({ id: data.delete_note?.id, __typename: "GetNotesOutput" });

  const evicted = cache.evict({ id: normalizedListId }) && cache.evict({ id: normalizedMapId });
  if (evicted) {
    cache.gc();
  }
}
