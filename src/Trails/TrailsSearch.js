import React from 'react';

export default class TrailsSearch extends React.Component {
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
    if (this.state.value !== '') {
      this.props.searchTrails(this.state.value);
      this.setState({value: ''});
    } else {
      alert('Please Input Correct Address.');
    }
  }

  render() {
    return (
      <div className='search'>
        <div className='search-title'>Explore Now</div>
        <form className='search-text' id='trails-find' onSubmit={this.handleSubmit}>
          <input className='search-value' type="text" placeholder='trail location' value={this.state.value} onChange={this.handleChange} />
          <input className='search-btn' type='submit' value='Find'/>
        </form>
      </div>
    );
  }
}