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

    render(){
        return(
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <Button onClick={() => this.getRoute()}>Test</Button>
                <Map />
                <LocationSearch />
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