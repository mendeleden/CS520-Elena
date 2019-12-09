import React from 'react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
    Button,
} from "reactstrap";
import axios from 'axios';

class C extends React.Component {
    constructor(props) {
      super(props) 
      console.log(this.props.name) // nnamdi


    }
  
    handleSelect = async value => {
        this.setAddressTo(value);
    };
    
    handleSelectF = async value => {
        this.setAddressFrom(value);
    };

    gen_values() {
        this.setRoute.then(res => { console.log(res)})
        return [42.27822345, -71.37579087084606];
      }

    render() {
        return (
            <div>
                C component
                <button onClick={
                  (evt) => 
                    this.props.func(this.gen_values())
                  }>
                  Send To Parent
                </button>
            </div>
        )
    }
  }

export default C;
