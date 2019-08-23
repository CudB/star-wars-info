import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';

class LinkedSubDetailLayout extends React.Component {
  // Ensure data is valid and if so, create a list element containing a URL to the detail page of each array element.
  renderSubDetail(data, endpoint) {
    if (data && data[0] !== null) {
      return data.map((url) => {
        // Get ID of each sub-detail by extracting the number from it's URL.
        const id = url.match(/[0-9]+/g);
        return (
          <li key={id}>
            <Link route={`/${endpoint}/${id}`}>
              <a> ID {id} </a>
            </Link>
          </li>
        )
      })
    }
    return null;
  }

  // Render the data as a list. If there is no data, render `n/a`.
  render() {
    const { alias, endpoint, data } = this.props;
    if (data.length == 0 || data[0] === null) {
      return (
        <div className="sub-detail">
          <h4>{alias}</h4>
          <p>n/a</p>
        </div>
      )
    }
    return (
      <div className="sub-detail">
        <h4>{alias}</h4>
        <ul>
          {this.renderSubDetail(data, endpoint)}
        </ul>
      </div>
    )
  }
}

LinkedSubDetailLayout.propTypes = {
  alias: PropTypes.string,
  endpoint: PropTypes.string,
  data: PropTypes.array
};

export default LinkedSubDetailLayout;