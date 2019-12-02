import React from 'react';
import './App.css';
import Welcome from "./Welcome";
import Footer from './Footer';

class Trails_title extends React.Component {
  render() {
    return (
      <div className='title'>Find Your Trails</div>
    );
  }
}

class Trails_data extends React.Component {
  constructor(props) {
    super(props);

    this.addtofav = this.addtofav.bind(this);

    // create a google sheet api client
  }

  addtofav() {
    alert('click');
  }

  componentDidMount() {
    // window.gapi.load("client", this.initClient);
  }

  render() {
    return (
      <div className='database'>
        <button type='button' value='Add' onClick={this.addtofav}>Add</button>
      </div>
    )
  }
}

class Trails_list extends React.Component {
  render() {
    // always receive five items that should be displayed.
    this.trailsList = this.props.trails.map((trail) =>
      <div className='list-item' key={trail.id}>
        <div className='list-item-title'>{trail.name}</div>
        <div className='list-item-length'>{trail.length}miles</div>
        <div className='list-item-ascent'>{trail.ascent}m</div>
        <div className='list-item-state'>{trail.conditionStatus}</div>
        <Trails_data trails={trail} />
      </div>
    );
    console.log('in trails list');
    console.log(this.props.trails);
    console.log(this.props.num);

    return (
      <div className='trails-list'>{this.trailsList}</div>
    );
  }
}

class Trails_map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: Object,
      markers: [],
      num: 0,
    }

    // when the component mount, load map and markers in the first page
    this.onScriptLoad = this.onScriptLoad.bind(this);
    // clear all markers
    this.markerClear = this.markerClear.bind(this);
    // load new markers in the current page
    this.markerLoad = this.markerLoad.bind(this);
    // recenter the map when the list is update
    this.recenter = this.recenter.bind(this);
  }

  onScriptLoad() {
    this.setState({map: new window.google.maps.Map(document.getElementById(this.props.id), this.props.options)});
    this.markerLoad();
  }

  markerLoad() {
    const markers = [];
    for (let i = 0; i < this.props.trails.length; i++) {
      let t = this.props.trails[i];
      let mark = new window.google.maps.Marker({
        position: {
          lat: t.latitude,
          lng: t.longitude,
        },
        map: this.state.map,
        title: t.name,
        label: String(i+1),
      })
      markers.push(mark);
    }

    this.setState({
      markers: markers,
    })
  }

  markerClear() {
    let m2 = this.state.markers;
    for (let i = 0; i < m2.length; i++) {
      m2[i].setMap(null);
    }
    this.setState({markers: []});
  }

  recenter() {
    let map = this.state.map;
    let center = this.props.options.center;
    map.setCenter(new window.google.maps.LatLng(center.lat, center.lng));
    this.setState({map: map});
  }

  componentDidMount() {
    if (!window.google){
      let googlescript = document.createElement('script');
      googlescript.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}`;
      googlescript.type = 'text/javascript';
      let x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(googlescript, x);

      googlescript.addEventListener('load', e => {
        this.onScriptLoad();
      })
    } else {
      this.onScriptLoad();
    }
    console.log(this.name);
  }

  componentDidUpdate() {
    console.log('in trails map')
    console.log(this.state.markers);
    console.log(this.state.num);
    console.log(this.props.num);
    console.log(this.props.trails);
    // console.log(this.name);
    if (this.props.trails !== [] && this.props.num !== this.state.num) {
      console.log(this.name);
      this.markerClear();
      this.markerLoad();
      this.setState({num: this.props.num,});
      this.recenter();
    }
    // console.log(this.name);
  }

  render() {
    return (
      <div className='map' id={this.props.id} />
    );
  }
}

class Trails_page extends React.Component {
  constructor(props) {
    super(props);

    this.previousPage = this.props.previousPage.bind(this);
    this.nextPage = this.props.nextPage.bind(this);
  }

  previousPage() {
    this.props.previousPage();
  }

  nextPage() {
    this.props.nextPage();
  }

  render() {
    console.log('in trails page');
    console.log(this.props.num);
    return (
      <div id='page' className='page'>
        <button className='page-change page-pre' onClick={this.previousPage}>Previous</button>
        <div className='page-num'>{this.props.num}</div>
        <button className='page-change page-next' onClick={this.nextPage}>Next</button>
      </div>
    );
  }
}

class Trails_search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
    this.props.searchTrails(this.state.value);
  }

  render() {
    return (
      <div className='search'>
        <div className='search-title'>Explore Now</div>
        <form className='search-text' id='trails-find' onSubmit={this.handleSubmit}>
          <input type="text" placeholder='trail location' value={this.state.value} onChange={this.handleChange} />
          <input type='submit' value='Find'/>
        </form>
      </div>
    );
  }
}

class Trails_filter extends React.Component {
  render() {
    return (
      <div className='filter'>This is a filter.</div>
    );
  }
}

class Trails extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      trails: [],
      filter: {
        weather: 1,
        condition: 1,
      },
      default_para: {
        lat: 39.9787,
        lon: -105.2755,
        maxDistance: 30,
        maxResults: 50,
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

  // set state
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  // filter those trails by several parameters.
  filterTrails() {
    if (this.state.filter.weather === 1)
      this.filterByWeather();
    if (this.state.filter.condition === 1)
      this.filterByCondition();
  }

  filterByWeather() {
  }

  filterByCondition() {
    let time = new Date();
    // filter condition in all trails
    for (let i = 0; i < this.state.trails.length; i++) {
      let t = this.state.trails[i];
      // available param: 0: danger 1: safe 2: don't know
      t.available = 1;

      // the condition may be keep some times. so just 1 year.
      let tdate = new Date(t.conditionDate);
      tdate.setFullYear(tdate.getFullYear()-1);
      // by date.
      if (tdate < time)
        t.available = 2;
      else if (t.conditionStatus === ("Unknown" || "Minor Issues"))
        // by condition.
        t.available = 0;
    }
  }

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
    // console.log(url);

    let x;
    try {
      let res = await fetch(url);
      res = await res.json();
      x = res;
    } catch(e) {
      console.log("Oops, error", e);
    }
    // this.setState({trails: x.trails});
    this.setStateAsync({trails: x.trails});
    return 1;
  }

  // change pages.
  previousPage() {
    if (this.state.num > 1)
      this.setState({num: this.state.num-1,});
    else
      alert('This is the first page.');
  }

  nextPage() {
    if(this.state.num < this.state.trails.length/5)
      this.setStateAsync({num: this.state.num+1});
      // this.setState({num: this.state.num+1,});
    else
      alert('This is the last page.');
  }

  async componentDidMount() {
    const loca = await this.geocoding('portland');
    let x = await this.getTrails(loca);
    this.filterTrails();
  }

  // when search trails, call this function
  async searchTrails(address) {
    // console.log(address);
    const loca = await this.geocoding(address);
    let x = await this.getTrails(loca);
    this.filterTrails();
  }

  render() {
    // current page number.
    const num = this.state.num;
    console.log(this.state.num);
    console.log(this.state.trails);
    // current display trails.
    let trails = [];
    let center = {lat: this.state.default_para.lat, lng: this.state.default_para.lon};
    if (this.state.trails.length !== 0) {
      console.log('get info');
      trails = this.state.trails.slice((num-1)*5, num*5);
      center = {lat: trails[0].latitude, lng: trails[0].longitude};
    }

    // console.log(center);
    console.log('begin render');
    console.log(num);
    return (
      <div className="trails">
        <Trails_search searchTrails={this.searchTrails} />
        <Trails_filter />
        <Trails_map num={num} trails={trails} id='map' options={{center, zoom: 10, mapTypeId: 'terrain'}} />
        <Trails_list num={num} trails={trails} />
        <Trails_page num={num} previousPage={this.previousPage} nextPage={this.nextPage} />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Welcome title={(<Trails_title />)} />
      <Trails />
      <Footer />
    </div>
  );
}

export default App;