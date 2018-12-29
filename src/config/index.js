const mapLib = {
      js: {
            endPoint: 'https://unpkg.com/leaflet@1.3.4/dist/leaflet.js',
            integrity:
                  'sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==',
      },
      css: {
            endPoint: 'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css',
            integrity:
                  'sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==',
      },
};

const tileLayer = {
      id: 'mapbox.outdoors',
      url: 'https://a.tile.hosted.thunderforest.com/komoot-2/{z}/{x}/{y}.png',
      maxZoom: 18,
      attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
};

export default {
      mapLib,
      tileLayer,
      zoom: 11,
      latitude: 47.6,
      longitude: 10.8,
      mapIconSize: [20, 20],
      polyLineColor: '#007ed3',
      polylineWeight: 4,
};
