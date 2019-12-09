import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyMap from "./components/Map"
import LocationSearch from './components/LocationSearch';
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <LocationSearch />
      <MyMap />
    </div>
  );
}

export default App;