import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import axios from 'axios';

class Character extends React.Component {

  static async getInitialProps({ query }) {
    const id = query.id;
    let character = {};

    try {
      const response = await axios.get(`https://swapi.co/api/people/${id}`);
      character = await response.data;
    } catch (err) {
      // TODO: Error handling
      console.log(err);
    }
    return { character };
  }

  render() {
    const { character } = this.props;
    return (
      <BaseLayout>
        <BasePage>
          <div className="sub-details">
            <SubDetailLayout type="name" data={character.name} />
            <SubDetailLayout type="height" data={String(character.height)} />
            <SubDetailLayout type="mass" data={String(character.mass)} />
            <SubDetailLayout type="hair_color" data={character.hair_color} />
            <SubDetailLayout type="skin_color" data={character.skin_color} />
            <SubDetailLayout type="eye_color" data={character.eye_color} />
            <SubDetailLayout type="birth_year" data={character.birth_year} />
            <SubDetailLayout type="gender" data={character.gender} />
            <LinkedSubDetailLayout type="homeworld" data={[character.homeworld]} />
            <LinkedSubDetailLayout type="film" data={character.films} />
            <LinkedSubDetailLayout type="species" data={character.species} />
            <LinkedSubDetailLayout type="vehicles" data={character.vehicles} />
            <LinkedSubDetailLayout type="starships" data={character.starships} />
          </div>
        </BasePage>
      </BaseLayout>
    )
  }
}

Character.propTypes = {
  character: PropTypes.object,
};

export default withRouter(Character);
