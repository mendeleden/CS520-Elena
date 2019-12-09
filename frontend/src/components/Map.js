import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: -122.48383155304096,
      lat: 37.82882682974591,
      zoom: 1.5,
      coordinates: [
        [-122.4833858013153, 37.829607404976734],
        [-122.4830961227417, 37.82932776098012],
        [-122.4830746650696, 37.82932776098012],
        [-122.48218417167662, 37.82889558180985],
        [-122.48218417167662, 37.82890193740421],
        [-122.48221099376678, 37.82868372835086],
        [-122.4822163581848, 37.82868372835086],
        [-122.48205006122589, 37.82801003030873]
      ],
      test: 5,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom, coordinates } = this.state;
    console.log( coordinates)

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom : 16,
    });

    map.on('load', function () {
      map.addLayer({
        'id': 'lines',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'properties': {
                'color': '#F7455D' // red
              },
              'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
              }
            },]
          }
        },
        'paint': {
          'line-width': 3,
          // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
          // to set the line-color to a feature property value.
          // 'line-color': ['get', 'color']
        }
      });
    });
    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

// ReactDOM.render(<Application />, document.getElementById('app'));
export default Map;