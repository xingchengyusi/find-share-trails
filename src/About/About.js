import React from 'react';
import AboutMember from './AboutMember';
import AboutApp from './AboutApp';
import Footer from '../Other/Footer';
import Welcome from '../Other/Welcome';
import './About.css';

class AboutTitle extends React.Component {
  render() {
    return (
      <div className='title'>About</div>
    );
  }
}

export default function About() {
  return (
    <div>
      <Welcome title={(<AboutTitle />)} />
      <AboutApp />
      <AboutMember />
      <Footer />
    </div>
  );
}