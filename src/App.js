import React from 'react';
import './App.css';
import Welcome from "./Welcome";
import Footer from './Footer';
import Trails from './Trails/Trails';

class TrailsTitle extends React.Component {
  render() {
    return (
      <div className='title'>Find Your Trails</div>
    );
  }
}

function App() {
  return (
    <div>
      <Welcome title={(<TrailsTitle />)} />
      <Trails />
      <Footer />
    </div>
  );
}

export default App;