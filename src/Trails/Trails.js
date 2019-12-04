import React from 'react';
import TrailsList from './TrailsList';
import TrailsMap from './TrailsMap';
import TrailsPage from './TrailsPage';
import TrailsSearch from './TrailsSearch';
import TrailsFilter from './TrailsFliter';

export default class Trails extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      trails: [],
      filter: {
        weather: 1,
        condition: 1,
      },
      default_para: {
        lat: 39.9787,
        lon: -105.2755,
        maxDistance: 30,
        maxResults: 30,
        sort: `quality`,
        minLength: 0,
        minStars: 0,
      },
    };

    this.getTrails = this.getTrails.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.geocoding = this.geocoding.bind(this);
    this.searchTrails = this.searchTrails.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
    // if (nextState.num !== this.state.num)
    //   return true;
    // else if (this.state.trails !== nextState.trails)
    //   return true;
  // }

  // set state
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  // // filter those trails by several parameters.
  // filterTrails() {
  //   if (this.state.filter.weather === 1)
  //     this.filterByWeather();
  //   if (this.state.filter.condition === 1)
  //     this.filterByCondition();
  // }
  //
  // filterByWeather() {
  // }
  //
  // filterByCondition() {
  //   let time = new Date();
  //   // filter condition in all trails
  //   for (let i = 0; i < this.state.trails.length; i++) {
  //     let t = this.state.trails[i];
  //     // available param: 0: danger 1: safe 2: don't know
  //     t.available = 1;
  //
  //     // the condition may be keep some times. so just 1 year.
  //     let tdate = new Date(t.conditionDate);
  //     tdate.setFullYear(tdate.getFullYear()-1);
  //     // by date.
  //     if (tdate < time)
  //       t.available = 2;
  //     else if (t.conditionStatus === ("Unknown" || "Minor Issues"))
  //       // by condition.
  //       t.available = 0;
  //   }
  // }

  async geocoding(location) {
    location = location.split(/\s|,\s|,/i).join('+');
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_API}`;

    try {
      let res = await fetch(url);
      res = await res.json();

      console.log(res);
      return res.results[0].geometry.location;
    } catch(e) {
      console.log("Oops, error", e);
    }
  }

  async getTrails(loca) {
    // update new parameter
    let parameters = this.state.default_para;
    // console.log(loca);
    parameters.lon = loca.lng;
    parameters.lat = loca.lat;
    this.setState({default_para: parameters});
    console.log(parameters.lng);
    console.log(parameters.lat);

    let url = `https://www.hikingproject.com/data/get-trails?lat=${parameters.lat}&lon=${parameters.lon}&maxDistance=${parameters.maxDistance}&maxResults=${parameters.maxResults}&sort=${parameters.sort}&minLength=${parameters.minLength}&minStars=${parameters.minStars}&key=${process.env.REACT_APP_HIKING_PROJECT_API}`;

    let x;
    try {
      let res = await fetch(url);
      res = await res.json();
      x = res;
    } catch(e) {
      console.log("Oops, error", e);
    }
    this.setStateAsync({trails: x.trails});
  }

  // change pages.
  previousPage() {
    if (this.state.num > 1)
      this.setStateAsync({num: this.state.num-1,});
      // this.setState({num: this.state.num-1,});
    else
      alert('This is the first page.');
  }

  nextPage() {
    console.log('to next');
    if(this.state.num < this.state.trails.length/5)
      this.setStateAsync({num: this.state.num+1,});
    else
      alert('This is the last page.');
    
    console.log(this.state.num);
    console.log('to next call finish');
  }

  async componentDidMount() {
    const loca = await this.geocoding('portland');
    await this.getTrails(loca);
    this.setState({num: 1});
    // this.filterTrails();
  }

  // when search trails, call this function
  async searchTrails(address) {
    // console.log(address);
    this.setStateAsync({num: 0});
    const loca = await this.geocoding(address);
    await this.getTrails(loca);
    this.setStateAsync({num: 1});
    // this.filterTrails();
  }

  render() {
    // current page number.
    let num = this.state.num;
    console.log(num);
    console.log(this.state.trails);
    // current display trails.
    let trails = [];
    let center = {lat: this.state.default_para.lat, lng: this.state.default_para.lon};
    if (this.state.trails.length !== 0) {
      console.log('get info');
      if (num === 0) {
        num = 1;
        // this.setState({num: 1});
      }
      trails = this.state.trails.slice((num-1)*5, num*5);
      center = {lat: trails[0].latitude, lng: trails[0].longitude};
    }

    // console.log(center);
    console.log('begin render');
    console.log(num);
    return (
      <div className="trails">
        <TrailsSearch searchTrails={this.searchTrails} />
        {/* <TrailsFilter /> */}
        <TrailsMap num={num} trails={trails} id='map' options={{center, zoom: 10, mapTypeId: 'terrain'}} />
        <TrailsList num={num} trails={trails} />
        <TrailsPage num={num} previousPage={this.previousPage} nextPage={this.nextPage} />
      </div>
    );
  }
}