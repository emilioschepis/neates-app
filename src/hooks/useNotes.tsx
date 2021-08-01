import { ApolloError } from "@apollo/client";
import { useMemo, useRef } from "react";

import { NotesQuery, useNotesQuery } from "../graphql/generated";
import Location from "../models/location";

type UseNotesResult = {
  loading: boolean;
  notes: NotesQuery["notes"];
  error: ApolloError | undefined;
};

/**
 * Returns the list of notes around the user's location
 *
 * @param location - The location of the user
 */
export default function useNotes(location: Location | null): UseNotesResult {
  const notesRef = useRef<NotesQuery["notes"]>([]);
  const { loading, error, data, previousData } = useNotesQuery({
    variables: {
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    },
  });

  const notes: NotesQuery["notes"] = useMemo(() => {
    if (!location) return [];

    if (loading || !data) {
      return notesRef.current;
    }

    notesRef.current = data.notes ?? [];

    return notesRef.current;
  }, [data]);

  return { loading: loading && !previousData, notes, error };
}
