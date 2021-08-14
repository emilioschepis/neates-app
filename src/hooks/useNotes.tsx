import { ApolloError } from "@apollo/client";
import { useMemo } from "react";

import { useLocation } from "../context/LocationContext";
import { NotesQuery, useNotesQuery } from "../graphql/generated";

type UseNotesResult = {
  loading: boolean;
  notes: NotesQuery["notes"];
  error: ApolloError | undefined;
};

/**
 * Returns the list of notes around the user's location
 */
export default function useNotes(): UseNotesResult {
  const { loading: locationLoading, granted, location } = useLocation();

  const { loading, error, data, previousData } = useNotesQuery({
    variables: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    skip: locationLoading || !granted,
  });

  const notes: NotesQuery["notes"] = useMemo(() => {
    if (locationLoading || !granted) return [];

    if (loading || !data) {
      return previousData?.notes ?? [];
    }

    return data.notes ?? [];
  }, [data]);

  return { loading: loading && !previousData, notes, error };
}
