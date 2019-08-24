import React from 'react';
import { Spinner } from 'reactstrap';

class SpinningLoaderLayout extends React.Component {
  render() {
    return (
      <div className="center-container">
        <Spinner className="center" style={{ width: '4rem', height: '4rem' }} color="light" />
      </div>
    )
  }
}

export default SpinningLoaderLayout;