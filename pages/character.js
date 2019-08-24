import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import DetailPage from '../components/DetailPage';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import SpinningLoaderLayout from '../components/layouts/SpinningLoaderLayout';

class Character extends DetailPage {
  // Render data if valid or error otherwise.
  render() {
    const { data, error } = this.state;
    let element = null
    if (data === null && error === null) {
      element = <SpinningLoaderLayout />;
    } else if (error === null) {
      element = (
        <div className="sub-details">
          <SubDetailLayout alias="Character Name" data={data.name} />
          <SubDetailLayout alias="Height" data={String(data.height)} />
          <SubDetailLayout alias="Mass" data={String(data.mass)} />
          <SubDetailLayout alias="Hair Color" data={data.hair_color} />
          <SubDetailLayout alias="Skin Color" data={data.skin_color} />
          <SubDetailLayout alias="Eye Color" data={data.eye_color} />
          <SubDetailLayout alias="Birth Year" data={data.birth_year} />
          <SubDetailLayout alias="Gender" data={data.gender} />
          <LinkedSubDetailLayout alias="Homeworld" endpoint="planet" data={[data.homeworld]} />
          <LinkedSubDetailLayout alias="Films" endpoint="film" data={data.films} />
          <LinkedSubDetailLayout alias="Species" endpoint="species" data={data.species} />
          <LinkedSubDetailLayout alias="Vehicles" endpoint="vehicle" data={data.vehicles} />
          <LinkedSubDetailLayout alias="Starships" endpoint="starship" data={data.starships} />
        </div>
      )
    } else if (error !== null) {
      return <HttpErrorLayout error={error} />;
    }
    return (
      <BaseLayout>
        <BasePage>
          {element}
        </BasePage>
      </BaseLayout>
    )
  }
}

Character.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
};

export default withRouter(Character);
