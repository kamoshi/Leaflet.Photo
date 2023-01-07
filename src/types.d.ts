

interface PhotoDetails {
  thumbnail: string;
  photoUrl: string;
  caption: string;
  date: string;
}

interface Photo {
  coords: L.LatLngExpression;
  details: PhotoDetails;
}
