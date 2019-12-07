import React from 'react';

export default class TrailsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: Object,
      markers: [],
      num: 0,
    };

    // when the component mount, load map and markers in the first page
    this.onScriptLoad = this.onScriptLoad.bind(this);
    // clear all markers
    this.markerClear = this.markerClear.bind(this);
    // load new markers in the current page
    this.markerLoad = this.markerLoad.bind(this);
    // recenter the map when the list is update
    this.recenter = this.recenter.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // initial case
    if (nextProps.num === 0)
      return false;
    else if (this.props.num === 0)
      return true;
    // update case
    else if (this.props.num !== nextProps.num)
      return true;
    else if (this.props.trails[0].id !== nextProps.trails[0].id)
      return true;
    else
      return false;
  }

  onScriptLoad() {
    this.setState({map: new window.google.maps.Map(document.getElementById(this.props.id), this.props.options)});
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
      });
      markers.push(mark);
    }

    this.setState({markers: markers,});
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
    // console.log('in trails map');
    console.log(this.name);
    this.markerClear();
    this.markerLoad();
    this.setState({num: this.props.num,});
    this.recenter();
  }

  render() {
    return (
      <div className='map' id={this.props.id} />
    );
  }
}