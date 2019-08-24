import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

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

  // Update search
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0) });
  }

  // Render data if valid or error otherwise.
  render() {
    const { data } = this.props;

    if (data !== null) {
      // Check if searched text is contained within the title or descript (opening crawl).
      let filteredData = data.filter((film) => {
        // Make all text lowercase and remove line breaks for easier comparisons.
        const searchText = this.state.search.toLowerCase();
        const formattedTitle = film.title.toLowerCase();
        const formattedDescription = film.opening_crawl.toLowerCase().replace(/(\r\n|\n|\r)/gm, " ");

        // Return index if text found.
        return formattedTitle.indexOf(searchText) !== -1 || formattedDescription.indexOf(searchText) !== -1;
      });

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
