import React from 'react';
import './About.css';
import Welcome from "./Welcome";
import Footer from './Footer';

class Title extends React.Component {
  render() {
    return (
      <div className='title'>About</div>
    )
  }
}

class Introduce extends React.Component {
  render() {
    return (
      <div className='intro'>
        <div className='intro-title'>ABOUT</div>
        <div className='intro-normal'>
          The is a React Web Application that create by <a className='intro-normal'>Ching-Wei Lin</a> and <a className='intro-normal'>Dajun Gu</a>.
        </div>
      </div>
    );
  }
}

class Member extends React.Component {
  render() {
    return (
      <div id='about-member'>
      </div>
    )
  }
}

function About() {
  return (
    <div>
      <Welcome title={(<Title />)} />
      <Introduce />
      <Member />
      <Footer />
    </div>
  );
}

export default About;