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

class Planet extends DetailPage {
  // Render data if valid or error otherwise.
  render() {
    const { data, error } = this.state;
    let element = null
    if (data === null && error === null) {
      element = <SpinningLoaderLayout />;
    } else if (error === null) {
      element = (
        <div className="sub-details">
          <SubDetailLayout alias="Planet Name" data={data.name} />
          <SubDetailLayout alias="Rotation Period" data={String(data.rotation_period)} />
          <SubDetailLayout alias="Orbital Period" data={String(data.orbital_period)} />
          <SubDetailLayout alias="Diameter" data={String(data.diameter)} />
          <SubDetailLayout alias="Climate" data={data.climate} />
          <SubDetailLayout alias="Gravity" data={data.gravity} />
          <SubDetailLayout alias="Terrain" data={data.terrain} />
          <SubDetailLayout alias="Surface Water" data={String(data.surface_water)} />
          <SubDetailLayout alias="Population" data={String(data.population)} />
          <LinkedSubDetailLayout alias="Residents" endpoint="character" data={data.residents} />
          <LinkedSubDetailLayout alias="Films" endpoint="film" data={data.films} />
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

Planet.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
};

export default withRouter(Planet);
