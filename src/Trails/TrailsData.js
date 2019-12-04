import React from 'react';

export default class TrailsData extends React.Component {
  constructor(props) {
    super(props);

    this.addtofav = this.addtofav.bind(this);
    // this.initialGoogleClient = this.initialGoogleClient.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('want to update', this.props.trail);
    return this.props.key !== nextProps.key;
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
  
  //   let appendRes = await window.gapi.client.sheet.spreadsheets.values.append({
  //     "spreadsheetId": "process.env.REACT_APP_SPREAD_SHEET_ID",
  //     "range": "A2",
  //     "includeValuesInResponse": true,
  //     "insertDataOption": "INSERT_ROWS",
  //     "valueInputOption": "RAW",
  //     "resource": data,
  //   });
  //   console.log(appendRes.toString());
  }

  render() {
    return (
      <div className='database'>
        <button type='button' value='Add' onClick={this.addtofav}>Add</button>
      </div>
    )
  }
}