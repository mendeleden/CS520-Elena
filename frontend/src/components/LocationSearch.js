import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
    Button,
} from "reactstrap";
import axios from 'axios';

export default function LocationSearch(props) {

  const [addressTo, setAddressTo] = React.useState("");

  const [addressFrom, setAddressFrom] = React.useState("");

  const handleSelect = async value => {
    setAddressTo(value);
  };

  const handleSelectF = async value => {
    setAddressFrom(value);
  };

  function getData(res){
    var coordList = res.data
    return res
  }

  function setRoute() {
    var dict = {}
    var uri = encodeURI("http://ec2-3-85-127-123.compute-1.amazonaws.com:8000/simple/route/ " + addressTo + "/" + addressFrom);
    // console.log(uri)
    axios
    .get(uri)
    .then(res => { dict = res.data } )
    console.log('from search' + dict)
    return dict
    }

  return (
    <div>

    <form>
        <PlacesAutocomplete
            value={addressTo}
            onChange={setAddressTo}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>

                <input {...getInputProps({ placeholder: "Address To" })} />

                <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                    const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>


        <PlacesAutocomplete
            value={addressFrom}
            onChange={setAddressFrom}
            onSelect={handleSelectF}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>

                <input {...getInputProps({ placeholder: "Address From" })} />

                <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                    const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
        <Button onClick={(evt) => props.func(setRoute())}> Go </Button>
    </form>
    </div>
  );
}