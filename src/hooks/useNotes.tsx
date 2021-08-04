import { ApolloError } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

import { NotesQuery, useNotesQuery } from "../graphql/generated";
import Location from "../models/location";
import { LocationConstants } from "../utils/constants";

type UseNotesResult = {
  loading: boolean;
  notes: NotesQuery["notes"];
  error: ApolloError | undefined;
};

/**
 * Returns the list of notes around the user's location
 *
 * @param currentLocation - The current location of the user
 */
export default function useNotes(currentLocation: Location | null): UseNotesResult {
  const [queryLocation, setQueryLocation] = useState<Location | null>(currentLocation);
  const { loading, error, data, previousData } = useNotesQuery({
    variables: {
      latitude: queryLocation?.latitude ?? 0,
      longitude: queryLocation?.longitude ?? 0,
    },
  });

  const notes: NotesQuery["notes"] = useMemo(() => {
    if (!queryLocation) return [];

    if (loading || !data) {
      return previousData?.notes ?? [];
    }

    return data.notes ?? [];
  }, [data]);

  useEffect(() => {
    if (!currentLocation) {
      return;
    }

    if (!queryLocation) {
      setQueryLocation(currentLocation);
      return;
    }

    const distance = currentLocation.distance(queryLocation);

    if (distance >= LocationConstants.minimumRefetchDistance) {
      setQueryLocation(currentLocation);
    }
  }, [currentLocation, queryLocation]);

  return { loading: loading && !previousData, notes, error };
}
