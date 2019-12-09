import React from 'react';
import './App.css';
import NavBar from "./components/Navbar"
import Map from "./components/Map"
import Sidebar from "./components/Sidebar"
import M from "./components/M"
import C from "./components/C"

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
      lat: 37.82882682974591
    }
  }
  
  output(evt) {
    console.log("With love from parent P land :)")
    console.log(evt)
    this.setState({lng: evt[0], lat:evt[1]})
  }
  render() {
      return (
          <div>
            <C name="banana" func={this.output}/>

            <M 
              mid_lat={this.state.lng} 
              mid_lon={this.state.lat}
              />
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
