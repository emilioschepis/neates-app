import Location from "../models/location";

/**
 * Returns the distance in meters between two locations.
 *
 * Uses the Equirectangular approximation.
 * https://www.movable-type.co.uk/scripts/latlong.html#equirectangular
 *
 * @param location1 - The first location
 * @param location2 - The second location
 * @returns the distance in meters between the locations
 */
export function calculateDistance(
  location1: Location,
  location2: Location
): number {
  const R = 6371e3; // Earth's radius
  const lat1 = (location1.latitude * Math.PI) / 180;
  const lat2 = (location2.latitude * Math.PI) / 180;
  const lon1 = (location1.longitude * Math.PI) / 180;
  const lon2 = (location2.longitude * Math.PI) / 180;

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const x = deltaLon * Math.cos((lat1 + lat2) / 2);
  const y = deltaLat;

  return Math.sqrt(x * x + y * y) * R;
}
