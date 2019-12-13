import React from 'react';
import './App.css';
// import NavBar from "./components/Navbar"
// import Map from "./components/Map"
// import Sidebar from "./components/Sidebar"
import M from "./components/M"
import LocationSearch from "./components/C"
import G from "./components/G"

// class M extends React.Component {
//   constructor(props) {
//     super(props) 
//     console.log(this.props) // nnamdi
//   }

//   render() {
//       return (
//           <div>
//               Map component {this.props.mid}
//           </div>
//       )
//   }
// }


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
    console.log("From app js")
    evt.then(res=>{
      console.log('in app'); 
      console.log(res.data.midpoint_lat);
      console.log(res.data.midpoint_lon);
      console.log(res.data.lat_lon_steps);
      console.log(res.data.elevation);
      
      this.setState({
        lng: res.data.midpoint_lon,
        lat:res.data.midpoint_lat, 
        steps : res.data.lat_lon_steps,
        elevation : res.data.elevation,
      })
    })
  }
  // output(evt) {
  //   console.log("With love from parent P land :)")
  //   console.log(evt)
    //  }
  
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
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       coordinates: [],
//       test: 5,
//     };
//   }

//   render() {
//     const { lng, lat, zoom } = this.state;

//     return (
//       <div className="App">
//         <div> <NavBar /> </div>
        
//         <div data={this.state.data}> <Map />  </div>
        
//         <div id="left" name="nnamdi" > <Sidebar />  </div>
      
//     </div>
//     );
//   }
// }

export default App;
