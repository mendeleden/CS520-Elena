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

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';       // lowkey same thing as original
import './index.css';
import App from './App';
import Map from './components/Map';
import LocationSearch from './components/LocationSearch';
import Sidebar from './components/Sidebar'
import * as serviceWorker from './serviceWorker';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

class Application extends Component {
    render(){
        return(
            <div>
                <Map />
                <LocationSearch />
                <Sidebar />
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();