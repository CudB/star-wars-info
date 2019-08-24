import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import SpinningLoaderLayout from './SpinningLoaderLayout';

class SubDetailLayout extends React.Component {
  // Render a sub-detail element.
  render() {
    const { alias, data } = this.props;
    let element = null;
    if (!data) {
      // Placeholder while data is loading.
      element = <SpinningLoaderLayout />
    } else {
      // let text = 'n/a';
      if (data !== null) element = <CardText>{data}</CardText>;
    }
    return (
      <Row>
        <Col>
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardBody>
              <CardTitle>{alias}</CardTitle>
              {element}
            </CardBody>
          </Card>
        </Col>
      </Row>
    )

  }
}

SubDetailLayout.propTypes = {
  alias: PropTypes.string,
  data: PropTypes.string
};

export default SubDetailLayout;