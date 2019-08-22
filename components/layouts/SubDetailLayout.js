import React from 'react';
import PropTypes from 'prop-types';
import prettifyHeading from '../../utils/prettifyHeading';

class SubDetailLayout extends React.Component {
  render() {
    const { type, data } = this.props;
    return (
      <div className="sub-detail">
        {/* <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4> */}
        <h4>{prettifyHeading(type)}</h4>
        <p> {data} </p>
      </div>
    )
  }
}

SubDetailLayout.propTypes = {
  type: PropTypes.string,
  data: PropTypes.string
};

export default SubDetailLayout;