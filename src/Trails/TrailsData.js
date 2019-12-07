import React from 'react';

export default class TrailsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: undefined,
    }

    this.addtofav = this.addtofav.bind(this);
    // this.initialGoogleClient = this.initialGoogleClient.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  async getWeather() {
    console.log(process.env.REACT_APP_DARK_SKY_API);
    let url = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API}/${this.props.trail.latitude},${this.props.trail.longitude}`;
    // let url = `api.openweathermap.org/data/2.5/weather?lat=${this.props.trail.latitude}&lon=${this.props.trail.longitude}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API}`;
    let weather;
    try {
      weather = await fetch(url, {
        mode: 'no-cors',
        contentType: 'application/json',
      });
      console.log(weather);
      weather = await weather.json();
      console.log(weather);
    } catch(e) {
      console.log('unsf', e);
    }
    console.log('weather');
    console.log(weather);
    // return weather.weather[0].main;
    return weather.currently.summery;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('want to update', this.props.trail);
    return this.props.key !== nextProps.key;
  }

  async componentDidMount() {
    let simpleWeather = await this.getWeather();
    this.setState({weather: simpleWeather});
  }

  async addtofav() {
    alert('click');
    let data = {
      "values": [
        [
          this.props.trail.name,
          this.props.trail.summery,
          this.props.trail.difficulty,
          this.props.trail.stars,
          this.props.trail.location,
          this.props.trail.length,
          this.props.trail.ascent,
        ]
      ]
    };
  }

  render() {
    return (
      <div className='database'>
        <div>{this.state.weather}</div>
        {/* <button type='button' value='Add' onClick={this.addtofav}>Add</button> */}
      </div>
    )
  }
}