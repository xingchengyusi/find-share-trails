import React from 'react';
import TrailsData from './TrailsData';

export default class TrailsList extends React.Component {
  constructor(props) {
    super(props);

    this.initialGoogleClient = this.initialGoogleClient.bind(this);
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

  async initialGoogleClient() {
    // let a = new Promise((resolve, reject) => {
    //   window.gapi.load('client');
    // });
    // let a = await window.gapi.load('client');
    // console.log('a.json()');
    // console.log(await a.json());
    //
    // let clientInitialPes = await window.gapi.client.init({
    //   apiKey: process.env.REACT_APP_GOOGLE_API,
    //   discoveryDocs: [`${process.env.REACT_APP_DISCOVERY_DOC}`],
    //   clientId: process.env.REACT_APP_CLIENT_ID,
    //   scope: 'https://www.googleapis.com/auth/spreadsheets',
    // });
    // console.log(clientInitialPes.toString());
    //
    // let clientSetToken = await window.gapi.client.setToken({access_token: JWT});
    // console.log(clientSetToken.toString());
    //
    // let loadClientSheet = await window.gapi.client.load('sheet', 'v4');
    // console.log(loadClientSheet.toString());
  }

  async componentDidMount() {
    console.log('trails data mount begin');

    // if (!window.gapi){
    //   let gapiscript = document.createElement('script');
    //   gapiscript.src = `https://apis.google.com/js/api.js`;
    //   gapiscript.type = 'text/javascript';
    //   let x = document.getElementsByTagName('script')[0];
    //   x.parentNode.insertBefore(gapiscript, x);
    //
    //   gapiscript.addEventListener('load', e => {
    //     this.initialGoogleClient()
    //   })
    // } else {
    //   this.initialGoogleClient()
    // }

    console.log('mount end');
  }

  render() {
    // always receive five items that should be displayed.
    this.trailsList = this.props.trails.map((trail) =>
      <div className='list-item' key={trail.id}>
        <div className='list-item-title'>{trail.name}</div>
        <div className='list-item-length'>{trail.length}miles</div>
        <div className='list-item-ascent'>{trail.ascent}m</div>
        <div className='list-item-state'>{trail.conditionStatus}</div>
        <TrailsData key={trail.id} trail={trail} />
      </div>
    );

    return (
      <div className='trails-list'>{this.trailsList}</div>
    );
  }
}