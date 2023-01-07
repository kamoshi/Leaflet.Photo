import * as L from 'leaflet';


declare module 'leaflet' {

  class Photo extends L.FeatureGroup {
    static Cluster?: { new(...args: any[]): any } & L.Class;
  }

  let photo: {
    (photos: Photo[], options: any): Photo;
    cluster?: (options: any) => any;
  };
}
