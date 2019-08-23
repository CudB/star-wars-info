import React from 'react';
import PropTypes from 'prop-types';

class SubDetailLayout extends React.Component {
  // Render a sub-detail element.
  render() {
    const { alias, data } = this.props;
    if (data && data !== null) {
      return (
        <div className="sub-detail">
          <h4>{alias}</h4>
          <p> {data} </p>
        </div>
      )
    }
    return (
      <div className="sub-detail">
        <h4>{alias}</h4>
        <p>n/a</p>
      </div>
    )
  }
}

SubDetailLayout.propTypes = {
  alias: PropTypes.string,
  data: PropTypes.string
};

export default SubDetailLayout;