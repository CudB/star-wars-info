import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

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
        const matchedTitleIndex = film.title.toLowerCase().indexOf(this.state.search.toLowerCase());
        const matchedDescriptionIndex = film.opening_crawl.toLowerCase().indexOf(this.state.search.toLowerCase());
        return matchedTitleIndex !== -1 || matchedDescriptionIndex !== -1;
      });

      return (
        <BaseLayout>
          <BasePage>
            <h4>Search Filter</h4>
            <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
            <LinkedSubDetailLayout className="film-list" alias="Film List" endpoint="film" data={filteredData} />
          </BasePage>
        </BaseLayout>
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
