import React from 'react';
import PropTypes from 'prop-types';

class SubDetailLayout extends React.Component {
  // Render a sub-detail element.
  render() {
    const { alias, data } = this.props;
    let text = 'n/a';
    if (data !== null) text = data;
    return (
      <div className="sub-detail">
        <h4>{alias}</h4>
        <p>{text}</p>
      </div>
    )
  }
}

SubDetailLayout.propTypes = {
  alias: PropTypes.string,
  data: PropTypes.string
};

export default SubDetailLayout;