import React, {Component, Fragment} from 'react';
import DeckGL from 'deck.gl';
import {GeoJsonLayer} from '@deck.gl/layers';
import ReactMapGL, { StaticMap } from 'react-map-gl';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from "@deck.gl/layers";
import axios from 'axios';
import {Button} from 'reactstrap';


export default class Map extends Component {

    constructor(props){
        super(props);
        this.map = null;
        this.state = {
            init: 0,
            viewport: {
                latitude: 5,
                longitude: 34,
                zoom: 2,
                bearing:0,
                pitch: 0,
                width: 500,
                height: 500
            }
        }
    }

    componentDidMount(){
        const map = this.reactMap.getMap();
        map.on('load', () => {
         //add the GeoJSON layer here
         map.addLayer({
            "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": [[42.2781674, -71.3733123], [42.2781859, -71.3740851], [42.2781789, -71.3743694], [42.2781665, -71.3751255], [42.2781516, -71.3756383], [42.2781568, -71.3763113], [42.2782976, -71.3766419], [42.2786926, -71.3773061], [42.2790774, -71.3777637]]
            }
        })
        })
    }

    setRoute(res){
        this.setState({
            init: 1,
            viewport: {
                ...this.viewport,
                longitude: res.data.from_lat[1],
                latitude: res.data.from_lat[0],
                zoom: 14
            }
        })
        this.renderLayers()
    }

    getRoute(){
        axios
        .get("http://ec2-3-85-127-123.compute-1.amazonaws.com:8000/simple/route/216,%20Pond%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States/14,%20Mill%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States")
        .then(res => this.setRoute(res))
        .catch(err => console.log(err));
    }

    renderLayers(){
            return [
                new GeoJsonLayer()
            ];
        }

    render(){
        const {viewport} = this.state;
        const layers = [
            new GeoJsonLayer({
                id: 'geojson',
                data: {
                  "type": "Feature",
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[42.2781674, -71.3733123], [42.2781859, -71.3740851], [42.2781789, -71.3743694], [42.2781665, -71.3751255], [42.2781516, -71.3756383], [42.2781568, -71.3763113], [42.2782976, -71.3766419], [42.2786926, -71.3773061], [42.2790774, -71.3777637]]
                  }
              }  ,
                opacity: 1,
                stroked: false,
                filled: true,
                lineWidthMinPixels: 1.5,
                getLineColor: [255,0,0],
                getLineWidth: 10
            })
        ]
        return(
            <React.Fragment>
            <ReactMapGL
                    ref={(reactMap) => this.reactMap = reactMap} />
                    {{...viewport}}
                    mapboxApiAccessToken='pk.eyJ1IjoiZHNhbmF0YXIiLCJhIjoiY2szcm81eTlpMGVndjNja2l5cGtobnRuMyJ9.0c8156xZy5h97w6Uq-f8wg'
                    onViewportChange={newViewport => {
                        this.setState({ viewport: newViewport });
                    }}
            />
            <Button className="test" onClick={() => this.getRoute()}>Test</Button>
        </React.Fragment>
        )
    }

}
