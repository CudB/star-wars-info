import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';
import SpinningLoaderLayout from './SpinningLoaderLayout';
import { Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';

class LinkedSubDetailLayout extends React.Component {
  // Ensure data is valid and if so, create a list element containing a URL to the detail page of each array element.
  renderSubDetail(data, endpoint) {
    if (data && data[0] !== null) {
      // Get ID of each sub-detail by extracting the number from it's URL.
      return data.map((item) => {
        let id = null;
        let text = null;
        let description = null;
        // Check to see if url is nested inside of another variable.
        // Also determine the text to display.
        if (item.url) {
          id = item.url.match(/[0-9]+/g);
          text = item.title;
          description = item.opening_crawl;
        } else {
          id = item.match(/[0-9]+/g)
          text = `ID ${id}`;
        }
        return (
          <li key={id}>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', marginTop: '15px', padding: '0 5px' }}>
              <CardBody>
                <CardTitle>
                  <Link route={`/${endpoint}/${id}`}>
                    <a> {text} </a>
                  </Link>
                </CardTitle>
                <CardText> {description}</CardText>
              </CardBody>
            </Card>
          </li>
        )
      })
    }
    return null;
  }

  // Render available data as a list.
  render() {
    let { alias, endpoint, data } = this.props;
    let element = null;

    if (!data) {
      // Placeholder while data is loading.
      element = <SpinningLoaderLayout />
    } else {
      if (data.length == 0 || data[0] === null) {
        // Empty array or bad data.
        return null;
      }
      else {
        element = (
          <ul>
            {this.renderSubDetail(data, endpoint)}
          </ul >
        )
      }
    }
    return (
      <Row>
        <Col>
          <h4>{alias}</h4>
          {element}
        </Col>
      </Row>
    )
  }
}

LinkedSubDetailLayout.propTypes = {
  alias: PropTypes.string,
  endpoint: PropTypes.string,
  data: PropTypes.array
};

export default LinkedSubDetailLayout;