import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { Link } from '../routes';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

// import axios from 'axios';

class Index extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps() {
    const data = await getDataFromSWAPI('films');
    return { data: data.results }
  }

  // Create HTML element for each array element.
  renderFilms(data) {
    return data.map((film) => {
      // Get the films ID by extracting the number from it's URL.
      const id = film.url.match(/[0-9]+/g)
      return (
        <li key={id}>
          <Link route={`/film/${id}`}>
            <a style={{ 'fontSize': '20px' }}> {film.title} </a>
          </Link>
        </li>
      )
    })
  }

  // Render data if valid or error otherwise.
  render() {
    const { data } = this.props;
    if (data !== null) {
      return (
        <BaseLayout className="cover">
          <BasePage>
            <h1>Film List</h1>
            <ul>
              {this.renderFilms(data)}
            </ul>
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
