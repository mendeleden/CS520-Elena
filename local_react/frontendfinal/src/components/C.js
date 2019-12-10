import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Button } from "reactstrap";
import axios from "axios";

export default function LocationSearch(props) {
  const [addressTo, setAddressTo] = React.useState("");

  const [addressFrom, setAddressFrom] = React.useState("");

  const handleSelect = async value => {
    setAddressTo(value);
  };

  const handleSelectF = async value => {
    setAddressFrom(value);
  };

  function getData(res) {
    var coordList = res.data;
  }

  async function setRoute() {
    var uri = encodeURI(
      "http://ec2-52-90-226-146.compute-1.amazonaws.com:8000/simple/route/ " +
        addressTo +
        "/" +
        addressFrom
    );
    console.log(uri);
    const req = axios.get(uri);
    return req.then(res => {
      console.log("inside req");
      return res;
    });
  }

  return (
    <div className="inputs">
      <h2>Route Options:</h2>
      <form>
        <PlacesAutocomplete
          value={addressTo}
          onChange={setAddressTo}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <h3>To: </h3>
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
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <h3>From: </h3>
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
        <Button className="submit" onClick={evt => props.func(setRoute())}> Go </Button>
      </form>
    </div>
  );
}
