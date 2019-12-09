import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./components/Map"
import LocationSearch from './components/LocationSearch';
import Sidebar from './components/Sidebar'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      test: ""
    }
  }

  output(evt){
    console.log(evt)
    }

  
  render(){
    return (
      <div className="App">
        <LocationSearch func={this.output}/>
      </div>
    );
  }
}

export default App;