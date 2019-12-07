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
  }

  render() {
    // always receive five items that should be displayed.
    this.trailsList = this.props.trails.map((trail) =>
      <div className='list-item' key={trail.id}>
        <div className='list-item-title'>{trail.name}</div>
        <div className='list-item-length'><i class="fas fa-route"></i>{trail.length}miles</div>
        <div className='list-item-ascent'><i class="fas fa-angle-double-up"></i>{trail.ascent}m</div>
        <div className='list-item-high'>{trail.high}m</div>
        <div className='list-item-state'><i class="fas fa-info"></i>{trail.conditionStatus}</div>
        {/* <TrailsData key={trail.id} trail={trail} /> */}
      </div>
    );

    return (
      <div className='trails-list'>{this.trailsList}</div>
    );
  }
}