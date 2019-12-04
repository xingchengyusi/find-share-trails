import React from 'react';
import './Welcome.css';

// first welcome part
class WelcomePage extends React.Component {
  render() {
    return (
      <div className="welcome-page">
        <a href={this.props.link}>{this.props.name}</a>
      </div>
    );
  }
}

class WelcomeTitle extends React.Component {
  render() {
    return (
      <div className='animated fadeInLeft slow'>{this.props.title}</div>
    );
  }
}

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <div className="welcome-page-container animated fadeInDown slow">
          <a href='#/'><i className="fas fa-hiking welcome-page" /></a>
          <WelcomePage link={"#/"} name={"Home"} />
          <WelcomePage link={"#/about"} name={"About"} />
          <WelcomePage link={'https://script.google.com/macros/s/AKfycbyfMV84qnntX_Wgks26-tNOOGHQ9xQcJ2MWVi4XQxpHcYoqXgl5/exec'} name={'Data'} />
        </div>
        <WelcomeTitle title={this.props.title} />
      </div>
    )
  }
}

export default Welcome;