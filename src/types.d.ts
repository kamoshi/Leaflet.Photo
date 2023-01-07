import * as L from 'leaflet';


declare module 'leaflet' {
    class Photo extends L.FeatureGroup {
        Cluster: MarkerClusterGroup;
    }

    function photo(photos, options): Photo;
}
