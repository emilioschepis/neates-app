import { ApolloCache } from "@apollo/client";

import firebase from "../firebase/firebase";
import { CreateNoteMutation, DeleteNoteMutation, MyNotesDocument, MyNotesQuery } from "../graphql/generated";

export function updateCacheAfterCreateNote(cache: ApolloCache<CreateNoteMutation>, data: CreateNoteMutation) {
  const userId = firebase.auth().currentUser?.uid ?? "";
  const myNotesQuery: MyNotesQuery | null = cache.readQuery({ query: MyNotesDocument, variables: { userId } });

  if (myNotesQuery) {
    const newNote = data.create_note.note;
    const allNotes = [
      { __typename: "note", id: newNote.id, content: newNote.content, createdAt: newNote.createdAt },
      ...myNotesQuery.notes,
    ];
    cache.writeQuery({
      query: MyNotesDocument,
      variables: { userId },
      data: {
        ...myNotesQuery,
        notes: allNotes,
      },
    });
  }
}

export function updateCacheAfterDeleteNote(cache: ApolloCache<DeleteNoteMutation>, data: DeleteNoteMutation) {
  const normalizedId = cache.identify({ id: data.delete_note?.id, __typename: data.delete_note?.__typename });

  const evicted = cache.evict({ id: normalizedId });
  if (evicted) {
    cache.gc();
  }
}
