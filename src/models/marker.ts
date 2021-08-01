class Marker {
  id: string;
  title: string;
  latitude: number;
  longitude: number;

  constructor(id: string, title: string, latitude: number, longitude: number) {
    this.id = id;
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export default Marker;
