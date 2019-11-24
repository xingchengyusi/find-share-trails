import React from 'react';

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

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-page-container">
        <a href='#/'><i className="fas fa-hiking welcome-page" /></a>
        <Welcome_page link={"#/"} name={"Find and Share Trails"} />
        <Welcome_page link={"#/about"} name={"About"} />
      </div>
    </div>
  );
}

export default Welcome;