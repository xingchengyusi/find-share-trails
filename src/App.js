import React from 'react';
import './App.css';
import Welcome from "./Welcome";
import Footer from './Footer';

class Trails_find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // now input only is location
  handleChange(e) {
    // this.setState({
      // location: e.target.value,
    // })
  }

  // when submit, call the function in Trails class.
  handleSubmit(e) {
    this.props.getTrails(e.target.value);
  }

  render() {
    return (
      <form className='trails-find' id='trails-find' onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange()} />
        <input type='submit' value='Find'/>
      </form>
    );
  }
}

class Trails_list extends React.Component {
  render() {
    this.trailsList = this.props.trails.map((trail) =>
      <div className='trails-list-item'>
        <div className='trails-list-item-title'>{trail.name}</div>
        <div className='trails-list-item-length'>{trail.length}miles</div>
        <div className='trails-list-item-ascent'>{trail.ascent}m</div>
        <div className='trails-list-item-state'>{trail.conditionStatus}</div>
      </div>
    );

    return (
      <div className='trails-list'>{this.trailsList}</div>
    );
  }
}

class Trails_map extends React.Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options);
    const markers = [];
    for (let i = 0; i < this.props.trails.length; i++) {
      let mark = new window.google.maps.Marker({
        position: {
          lat: this.props.trails[i].latitude,
          lng: this.props.trails[i].longitude
        },
        map: map,
        title: this.props.trails[i].name,
      });
      markers.push(mark);
    }
  }

  componentDidMount() {
    if (!window.google){
      let googlescript = document.createElement('script');
      googlescript.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBaVO8RPMYTBf5f-Lx9_fiKj_woRmpjrT4';
      googlescript.type = 'text/javascript';
      let x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(googlescript, x);

      googlescript.addEventListener('load', e => {
        this.onScriptLoad();
      })
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return (
      <div className='trails-map' id={this.props.id} />
    );
  }
}

class Trails extends  React.Component {
  filterTrails() {
    let filter = {
      weather: 1,
      condition: 1,
    };

    if (filter.weather === 1)
      this.filterByWeather();
    if (filter.condition === 1)
      this.filterByCondition();
  }

  filterByWeather() {
  }

  filterByCondition() {
    let time = new Date();
    // filter condition in all trails
    for (let i = 0; i < this.trails.length; i++) {
      let t = this.trails[i];
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

  static getTrails() {
    const exTrails = {
      "trails": [
        {
          "id": 7000130,
          "name": "Bear Peak Out and Back",
          "type": "Featured Hike",
          "summary": "A must-do hike for Boulder locals and visitors alike!",
          "difficulty": "blueBlack",
          "stars": 4.6,
          "starVotes": 109,
          "location": "Boulder, Colorado",
          "url": "https:\/\/www.hikingproject.com\/trail\/7000130\/bear-peak-out-and-back",
          "imgSqSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_sqsmall_1554312030.jpg",
          "imgSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_small_1554312030.jpg",
          "imgSmallMed": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_smallMed_1554312030.jpg",
          "imgMedium": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_medium_1554312030.jpg",
          "length": 5.7,
          "ascent": 2541,
          "descent": -2540,
          "high": 8342,
          "low": 6103,
          "longitude": -105.2755,
          "latitude": 39.9787,
          "conditionStatus": "Unknown",
          "conditionDetails": null,
          "conditionDate": "1970-01-01 00:00:00"
        },
        {
          "id": 7001019,
          "name": "Betasso Preserve",
          "type": "Featured Hike",
          "summary": "This hike is easily accessible from Boulder and offers amazing singletrack with beautiful views.",
          "difficulty": "blue",
          "stars": 4.1,
          "starVotes": 60,
          "location": "Boulder, Colorado",
          "url": "https:\/\/www.hikingproject.com\/trail\/7001019\/betasso-preserve",
          "imgSqSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7029200_sqsmall_1554920151.jpg",
          "imgSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7029200_small_1554920151.jpg",
          "imgSmallMed": "https:\/\/cdn-files.apstatic.com\/hike\/7029200_smallMed_1554920151.jpg",
          "imgMedium": "https:\/\/cdn-files.apstatic.com\/hike\/7029200_medium_1554920151.jpg",
          "length": 6.7,
          "ascent": 776,
          "descent": -778,
          "high": 6575,
          "low": 6178,
          "longitude": -105.3446,
          "latitude": 40.0164,
          "conditionStatus": "All Clear",
          "conditionDetails": "Mostly Dry, Some Mud - 90%+ clear and dry with few muddy patches",
          "conditionDate": "2019-11-16 13:57:20"
        },
        {
          "id": 7017569,
          "name": "Marshall Mesa to Spring Brook Loop",
          "type": "Featured Hike",
          "summary": "Some of the best trails that Boulder has to offer with a variety of options that never get old.",
          "difficulty": "blue",
          "stars": 4.3,
          "starVotes": 26,
          "location": "Superior, Colorado",
          "url": "https:\/\/www.hikingproject.com\/trail\/7017569\/marshall-mesa-to-spring-brook-loop",
          "imgSqSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7002458_sqsmall_1554226116.jpg",
          "imgSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7002458_small_1554226116.jpg",
          "imgSmallMed": "https:\/\/cdn-files.apstatic.com\/hike\/7002458_smallMed_1554226116.jpg",
          "imgMedium": "https:\/\/cdn-files.apstatic.com\/hike\/7002458_medium_1554226116.jpg",
          "length": 11.1,
          "ascent": 893,
          "descent": -893,
          "high": 6236,
          "low": 5567,
          "longitude": -105.2313,
          "latitude": 39.9527,
          "conditionStatus": "All Clear",
          "conditionDetails": "Muddy, Snowy - Super fun but challenging in these conditions.",
          "conditionDate": "2019-11-04 23:41:09"
        },
        {
          "id": 7005887,
          "name": "Sugarloaf Mountain",
          "type": "Featured Hike",
          "summary": "The best bang-for-your-buck view trail in Boulder County.",
          "difficulty": "greenBlue",
          "stars": 4.4,
          "starVotes": 19,
          "location": "Boulder, Colorado",
          "url": "https:\/\/www.hikingproject.com\/trail\/7005887\/sugarloaf-mountain",
          "imgSqSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7031490_sqsmall_1554931128.jpg",
          "imgSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7031490_small_1554931128.jpg",
          "imgSmallMed": "https:\/\/cdn-files.apstatic.com\/hike\/7031490_smallMed_1554931128.jpg",
          "imgMedium": "https:\/\/cdn-files.apstatic.com\/hike\/7031490_medium_1554931128.jpg",
          "length": 1.4,
          "ascent": 432,
          "descent": -432,
          "high": 8892,
          "low": 8460,
          "longitude": -105.4251,
          "latitude": 40.0255,
          "conditionStatus": "Minor Issues",
          "conditionDetails": "Dry",
          "conditionDate": "2019-09-11 21:25:47"
        }
      ],
      "success": 1
    };

    if (exTrails.success === 0)
      alert('Get Trails from Hiking Project failed.');

    return exTrails.trails;
  }

  render() {
    this.trails = Trails.getTrails();
    this.filterTrails();

    return (
      <div className="trails">
        <div className='trails-title'>Hot Trails</div>
        <Trails_list trails={this.trails} />
        <Trails_map trails={this.trails} id='trails-map' options={{center: { lat: 45.5051, lng: -122.6750 }, zoom: 13, mapTypeId: 'terrain'}} />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Welcome title={(<Trails_find getTrails={Trails.getTrails} />)} />
      <Trails />
      <Footer />
    </div>
  );
}

export default App;