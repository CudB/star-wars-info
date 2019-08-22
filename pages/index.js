import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Link } from '../routes';
import PropTypes from 'prop-types';

import axios from 'axios';

class Index extends React.Component {
  static async getInitialProps() {
    let films = [];

    // Get list of Star Wars films.
    // Return `films` as array on success or null if error caught.
    try {
      const response = await axios.get('https://swapi.co/api/films');
      films = await response.data;
    } catch (err) {
      return { films: null };
    }
    return { films: films.results };
  }

  // Create some html for each film listing.
  renderFilms(films) {
    return films.map((film) => {
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

  // Render the list of films or an display an error if the GET request fails.
  render() {
    const { films } = this.props;
    if (films !== null) {
      return (
        <BaseLayout className="cover">
          <BasePage>
            <h1>Film List</h1>
            <ul>
              {this.renderFilms(films)}
            </ul>
          </BasePage>
        </BaseLayout>
      )
    } else {
      return (
        <BaseLayout className="cover">
          <BasePage>
            <h1>Woops</h1>
            <p>Our ship crashed on it&apos;s way back with the film list. :(</p>
          </BasePage>
        </BaseLayout>
      )
    }
  }
}

Index.propTypes = {
  films: PropTypes.array,
};

export default Index;
