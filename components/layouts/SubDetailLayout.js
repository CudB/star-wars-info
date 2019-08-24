import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';

class SubDetailLayout extends React.Component {
  // Render a sub-detail element.
  render() {
    const { alias, data } = this.props;
    let text = 'n/a';
    if (data !== null) text = data;
    return (
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', marginTop: '15px', padding: '0 5px' }}>
            <CardBody>
              <CardTitle>{alias}</CardTitle>
              <CardText>{text}</CardText>
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