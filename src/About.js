import React from 'react';
import './About.css';
import Welcome from "./Welcome";
import Footer from './Footer';

class Title extends React.Component {
  render() {
    return (
      <div className='title'>About</div>
    );
  }
}

class Introduce extends React.Component {
  render() {
    return (
      <div className='intro'>
        <div className='intro-title'>ABOUT</div>
        <div className='intro-normal'>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          The is a React Web Application that create by <a href={null} className='intro-normal'>Ching-Wei Lin</a> and <a href={null} className='intro-normal'>Dajun Gu</a>.
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