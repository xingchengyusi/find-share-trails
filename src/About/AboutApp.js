import React from 'react';

export default class AboutApp extends React.Component {
  render() {
    return (
      <div className='intro'>
        <div className='intro-title'>About This App</div>
        <div className='intro-normal'>The is a Web Application that create by React.</div>
        <div className='intro-third'>React</div>
        <div className='intro-third'>Google App Script</div>
        <div className='intro-third'>Google Sheet</div>
        <div className='intro-third'>Hiking Project</div>
        <div className='intro-third'>Google Map</div>
      </div>
    );
  }
}