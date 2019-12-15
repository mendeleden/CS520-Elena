import React from 'react';
import './App.css';
import M from "./components/M"
import LocationSearch from "./components/C"
import G from "./components/G"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.output = this.output.bind(this)
    this.state = {
      data: 0,
      lng: -122.48383155304096,
      lat: 37.82882682974591,
      steps : [],
      elevation : [],
    }
  }
  
  async output(evt){
    let test = await evt
    evt.then(res=>{
      this.setState({
        lng: res.data.midpoint_lon,
        lat:res.data.midpoint_lat, 
        steps : res.data.lat_lon_steps,
        elevation : res.data.elevation,
      })
    })
  }
  render() {
      return (
          <div>
            <LocationSearch func={this.output}/>

            <M 
              mid_lat={this.state.lat} 
              mid_lon={this.state.lng}
              steps = {this.state.steps}
              />
            
            <G elevation={this.state.elevation} />
          </div>
      )
  }
}

export default App;
