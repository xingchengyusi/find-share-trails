import React from 'react';

export default class Member extends React.Component {
  render() {
    return (
      <div className='intro' id='about-member'>
        <div className='intro-title'>Team Member</div>
        <div className='member'>
          <a href='https://github.com/xingchengyusi'>Dajun Gu</a>
        </div>
        <div className='member'>
          <a href='https://github.com/wning0101'>Ching-Wei Lin</a>
        </div>
      </div>
    )
  }
}