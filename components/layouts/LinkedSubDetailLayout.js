import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';

class LinkedSubDetailLayout extends React.Component {
  // Ensure data is valid and if so, create a list element containing a URL to the detail page of each array element.
  renderSubDetail(data, endpoint) {
    if (data && data[0] !== null) {
      // Get ID of each sub-detail by extracting the number from it's URL.
      return data.map((item) => {
        let id = null;
        let text = null;
        // Check to see if url is nested inside of another variable.
        // Also determine the text to display.
        if (item.url) {
          id = item.url.match(/[0-9]+/g);
          text = item.title;
        } else {
          id = item.match(/[0-9]+/g)
          text = `ID ${id}`;
        }
        return (
          <li key={id}>
            <Link route={`/${endpoint}/${id}`}>
              <a> {text} </a>
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
    let element = null;
    if (data.length == 0 || data[0] === null) {
      element = <p>n/a</p>;
    }
    else {
      element = (
        <ul>
          {this.renderSubDetail(data, endpoint)}
        </ul>
      )
    }
    return (
      <div className="sub-detail">
        <h4>{alias}</h4>
        {element}
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