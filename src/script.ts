

L.Photo = L.FeatureGroup.extend({
  options: {
    icon: {
      iconSize: [40, 40] as L.PointTuple
    }
  },

  initialize: function (photos: Photo[], options: any) {
    L.setOptions(this, options);
    // @ts-ignore
    L.FeatureGroup.prototype.initialize.call(this, photos);
  },

  addLayers: function (photos: Photo[]) {
    for (const photo of photos)
      this.addLayer(photo);
    return this;
  },

  addLayer: function (photo: Photo) {
    L.FeatureGroup.prototype.addLayer.call(this, this.createMarker(photo));
  },

  createMarker: function (photo: Photo) {
    const marker = L.marker(photo, {
      icon: L.divIcon(L.extend({
        html: `<div style="background-image: url(${photo.thumbnail});"></div>`,
        className: 'leaflet-marker-photo'
      }, photo, this.options.icon)),
      title: photo.caption || ''
    });
    // @ts-ignore
    marker.photo = photo;
    return marker;
  }
});

L.photo = function (photos, options) {
  return new L.Photo(photos, options);
};


if (L.MarkerClusterGroup) {
  L.Photo.Cluster = L.MarkerClusterGroup.extend({
    options: {
      featureGroup: L.photo,
      maxClusterRadius: 100,
      showCoverageOnHover: false,
      icon: { iconSize: [40, 40] as L.PointTuple },

      iconCreateFunction: function(cluster: any) {
        const markers = cluster.getAllChildMarkers();
        return new L.DivIcon(L.extend({
          html: `<div style="background-image: url(${markers[0].photo.thumbnail});"></div><b>${markers.length}</b>`,
          className: 'leaflet-marker-photo',
        }, this.icon));
      },
    },

    initialize: function (options: any) {
      options = L.Util.setOptions(this, options);
      // @ts-ignore
      L.MarkerClusterGroup.prototype.initialize.call(this);
      this._photos = options.featureGroup(null, options);
    },

    add: function (photos: Photo) {
      this.addLayer(this._photos.addLayers(photos));
      return this;
    },

    clear: function () {
      this._photos.clearLayers();
      this.clearLayers();
    }

  });

  L.photo.cluster = function (options: any) {
    return new L.Photo.Cluster!(options);
  };

}
