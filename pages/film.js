import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import { Link } from '../routes';
import PropTypes from 'prop-types';

import axios from 'axios';

class Film extends React.Component {

  static async getInitialProps({ query }) {
    const id = query.id;
    let film = {};

    try {
      const response = await axios.get(`https://swapi.co/api/films/${id}`);
      film = await response.data;
    } catch (err) {
      // TODO: Error handling
      console.log(err);
    }
    return { film };
  }

  renderSubDetail(type, data) {
    return data.map((url) => {
      // Get ID of each sub-detail by extracting the number from it's URL.
      const id = url.match(/[0-9]+/g);
      return (
        <li key={id}>
          <Link route={`/${type}/${id}`}>
            <a> ID {id} </a>
          </Link>
        </li>
      )
    })
  }

  render() {
    const { film } = this.props;
    return (
      <BaseLayout>
        <BasePage>
          <div className="sub-details">
            <h1> {film.title} </h1>
            <SubDetailLayout type="episode_id" data={String(film.episode_id)} />
            <SubDetailLayout type="opening_crawl" data={film.opening_crawl} />
            <SubDetailLayout type="director" data={film.director} />
            <SubDetailLayout type="producer" data={film.producer} />
            <SubDetailLayout type="release_date" data={film.release_date} />
            <LinkedSubDetailLayout type="character" data={film.characters} />
            <LinkedSubDetailLayout type="planets" data={film.planets} />
            <LinkedSubDetailLayout type="starships" data={film.starships} />
            <LinkedSubDetailLayout type="vehicles" data={film.vehicles} />
            <LinkedSubDetailLayout type="species" data={film.species} />
          </div>
        </BasePage>
      </BaseLayout>
    )
  }
}

Film.propTypes = {
  film: PropTypes.object,
};

export default withRouter(Film);
