# Leaflet.Photo in TypeScript
Plugin to show geotagged photos on a Leaflet map. 


## Example usage
```ts
const template = `
  <div class="popup">
    <a href="{photo}">
      <img width="{width}" height="{height}" src="{photo}" />
      <div class="meta">
        <span class="date">{date}</span><span class="caption">{caption}</span>
      </div>
    </a>
  </div>
`;

const photoLayer = L.photo.cluster().on('click', function(evt) {
  evt.layer.bindPopup(L.Util.template(template, evt.layer.photo)).openPopup();
});

const data = [
  {
    photo: 'https://example.com/image.png',
    width: 1080,
    height: 960,
    date: '2023-01-01',
    caption: 'What a nice photo!',
  },
  {
    photo: 'https://example.com/image.png',
    width: 1080,
    height: 960,
    date: '2023-01-02',
    caption: 'What a nice photo!',
  }
];

photoLayer.add(data).addTo(map);
```