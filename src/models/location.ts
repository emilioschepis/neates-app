import { calculateDistance } from "../utils/locationUtils";

class Location {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  distance(other: Location): number {
    return calculateDistance(this, other);
  }
}

export default Location;
