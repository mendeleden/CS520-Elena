// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';       // lowkey same thing as original
import './index.css';
import App from './App';
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import * as serviceWorker from './serviceWorker';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import LocationSearch from './components/LocationSearch';
import LocationTo from './components/LocationTo';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHNhbmF0YXIiLCJhIjoiY2szcm81eTlpMGVndjNja2l5cGtobnRuMyJ9.0c8156xZy5h97w6Uq-f8wg';

class Application extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        }
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }

    setRoute(res){
        this.setState({ lng: res.data.from_lat[1], lat: res.data.from_lat[0], zoom: 12});
        // zoom is hard coded rn
        // we might want to write a function that calculates how zoomed it should be
        // based on the two points

        this.componentDidMount();
    }

    getRoute(){
        axios
        .get("http://ec2-3-85-127-123.compute-1.amazonaws.com:8000/simple/route/216,%20Pond%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States/14,%20Mill%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States")
        .then(res => this.setRoute(res))
        .catch(err => console.log(err));
    }


    render(){
        return(
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <Button onClick={() => this.getRoute()}>Test</Button>
                <LocationTo />
                <LocationSearch />
                <Map/>
                <Sidebar/>
            </div>

        );
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();