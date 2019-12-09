import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
    Button,
} from "reactstrap";
import axios from 'axios';

export default function LocationSearch() {
  const [addressTo, setAddressTo] = React.useState("");
  const [coordinatesTo, setCoordinatesTo] = React.useState({
    lat: null,
    lng: null
  });

  const [addressFrom, setAddressFrom] = React.useState("");
  const [coordinatesFrom, setCoordinatesFrom] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressTo(value);
    setCoordinatesTo(latLng);
  };

  const handleSelectF = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressFrom(value);
    setCoordinatesFrom(latLng);
  };

  function setRoute() {

    var uri = encodeURI("http://ec2-3-85-127-123.compute-1.amazonaws.com:8000/simple/route/ " + addressTo + "/" + addressFrom);
    console.log(uri)
    axios
    .get(uri)
    .then(res => res.data.from_lat[1]);
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

        { console.log(coordinatesTo.lat)}

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
        <Button onClick={setRoute}> Go </Button>
    </form>
    </div>
  );
}