import React from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class M extends React.Component {
  constructor(props) {
    super(props) 
    console.log(this.props) // nnamdi
    this.state = {
        lng: -71.401468,  
        lat: 42.2909342,
        zoom: 11,
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
  componentWillReceiveProps(nextProps) {
    console.log("recieved some props");
    console.log(this.state.coordinates)
    console.log(nextProps.steps)
    this.map.flyTo({
        center : [nextProps.mid_lon, nextProps.mid_lat],
        zoom : 12
    }) 
    try {
        this.map.removeSource('lines')
      } catch (e) {
        console.log('Error' + e)
    }
        
    this.map.addLayer({
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
                'coordinates': nextProps.steps
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
    }
  componentDidMount() {
    const { lng, lat, zoom, coordinates } = this.state;
    console.log( coordinates)

    this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [lng, lat],
        zoom: zoom
      });
  
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v9',
    //   center: [lng, lat],
    //   zoom : 16,
    // });

    this.map.on('move', () => {
        const { lng, lat } = this.map.getCenter();
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: this.map.getZoom().toFixed(2)
        });
      });

}
  render() {
    const { lng, lat, zoom } = this.state;

      return (
          <div>
              Map component: <br/> 
               mid_lat : {this.props.mid_lat} || { this.state.lat}
               <br />
               mid_lon : {this.props.mid_lon} || { this.state.lng}

               <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
          </div>
      )
  }
}

export default M;
