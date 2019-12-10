import React from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'


class G extends React.Component {
    constructor(props) {
      super(props) 
      console.log(this.props) // nnamdi
      this.state = {
          lng: -71.401468,  
          lat: 42.2909342,
          zoom: 11,
        };
    }

    render() {
            return (
                <div className="details">
                    <h1> Total Elevation: {this.props.elevation[2]} </h1>
                    <h1> Up Elevation {this.props.elevation[0]}</h1>
                    <h1> Down Elevation {this.props.elevation[1]}</h1>
                </div>
            )
        }
    }
    
export default G;
    