import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/Navbar"
import MyMap from "./components/Map"

function App() {
  return (
    <div className="App">
      <NavBar />
      <MyMap />
    </div>
  );
}

export default App;
