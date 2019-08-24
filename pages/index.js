import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';
import filterDataByString from '../utils/filterHelper';

import { Col, Row, Input } from 'reactstrap';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  // GET request to swapi.co for data.
  static async getInitialProps() {
    const data = await getDataFromSWAPI('films');
    return { data: data.results };
  }

  // Update state
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0) });
  }

  // Render data if valid or error otherwise.
  render() {
    const { data } = this.props;

    if (data !== null) {
      // Filter data by by looking for search field text in title and description of data.
      let filteredData = filterDataByString(data, this.state.search);

      return (
        <BaseLayout>
          <BasePage>
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                <h4>Search Filter</h4>
                <Input placeholder="Filter by title or description! eg. Death Star" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
              </Col>
            </Row>
            <LinkedSubDetailLayout className="film-list" alias="Film List" endpoint="film" data={filteredData} />
          </BasePage>
        </BaseLayout >
      )
    } else {
      return <HttpErrorLayout />
    }
  }
}

Index.propTypes = {
  data: PropTypes.array,
};

export default Index;
