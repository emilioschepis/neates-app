import { ApolloError } from "@apollo/client";
import { useMemo, useRef } from "react";

import { useNotesQuery } from "../graphql/generated";
import Location from "../models/location";
import Marker from "../models/marker";

type UseMarkersResult = {
  loading: boolean;
  markers: Marker[];
  error: ApolloError | undefined;
};

/**
 * Returns the list of markers available around the user's location
 *
 * @param location - The location of the user
 */
export function useMarkers(location: Location | null): UseMarkersResult {
  const markersRef = useRef<Marker[]>([]);
  const { loading, error, data, previousData } = useNotesQuery({
    variables: {
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    },
  });

  const markers: Marker[] = useMemo(() => {
    if (!location) return [];

    if (loading || !data) {
      return markersRef.current;
    }

    markersRef.current = data.notes.map(
      (note) =>
        new Marker(
          note.id,
          note.content,
          note.location.coordinates[1],
          note.location.coordinates[0]
        )
    );

    return markersRef.current;
  }, [data]);

  return { loading: loading && !previousData, markers, error };
}
