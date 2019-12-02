import React from 'react';
import './Welcome.css'

// first welcome part
class Welcome_page extends React.Component {
  render() {
    return (
      <div className="welcome-page">
        <a href={this.props.link}>{this.props.name}</a>
      </div>
    );
  }
}

class Welcome_title extends React.Component {
  render() {
    return (
      <div>{this.props.title}</div>
    );
  }
}

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <div className="welcome-page-container">
          <a href='#/'><i className="fas fa-hiking welcome-page" /></a>
          <Welcome_page link={"#/"} name={"Home"} />
          <Welcome_page link={"#/about"} name={"About"} />
          <Welcome_page link={'#/database'} name={'Data'} />
        </div>
        <Welcome_title title={this.props.title} />
      </div>
    )
  }
}

export default Welcome;