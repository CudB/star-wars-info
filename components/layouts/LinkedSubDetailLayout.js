import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';
import prettifyHeading from '../../utils/prettifyHeading';

class LinkedSubDetailLayout extends React.Component {
  renderSubDetail(type, data) {
    return data.map((url) => {
      // Get ID of each sub-detail by extracting the number from it's URL.
      const id = url.match(/[0-9]+/g);
      return (
        <li key={id}>
          <Link route={`/${type}/${id}`}>
            <a> ID {id} </a>
          </Link>
        </li>
      )
    })
  }

  render() {
    const { type, data } = this.props;
    return (
      <div className="sub-detail">
        <h4>{prettifyHeading(type)}</h4>
        <ul>
          {this.renderSubDetail(type, data)}
        </ul>
      </div>
    )
  }
}

LinkedSubDetailLayout.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array
};

export default LinkedSubDetailLayout;