import * as L from 'leaflet';


declare module 'leaflet' {
    class Photo extends L.FeatureGroup {
        static Cluster?: { new(...args: any[]): any } & L.Class;
    }

    function _photo(photos: Photo[], options: any): Photo;

    let photo: typeof _photo & { cluster?: (options: any) => any } = _photo;
}
