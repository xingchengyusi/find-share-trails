import React from 'react';

export default class TrailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.previousPage = this.props.previousPage.bind(this);
    this.nextPage = this.props.nextPage.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.num !== nextProps.num;
  }

  previousPage() {
    this.props.previousPage();
  }

  nextPage() {
    this.props.nextPage();
  }

  render() {
    // console.log('in trails page');
    // console.log(this.props.num);
    return (
      <div id='page' className='page'>
        <button className='page-change page-pre' onClick={this.previousPage}>Previous</button>
        <div className='page-num'>{this.props.num}</div>
        <button className='page-change page-next' onClick={this.nextPage}>Next</button>
      </div>
    );
  }
}