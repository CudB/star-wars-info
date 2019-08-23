import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class Planet extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps({ query }) {
    let data = await getDataFromSWAPI('planets', query.id);
    return { data };
  }

  // Render data if valid or error otherwise.
  render() {
    const { data } = this.props;
    if (data !== null) {
      return (
        <BaseLayout>
          <BasePage>
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
          </BasePage>
        </BaseLayout>
      )
    } else {
      return <HttpErrorLayout />;
    }
  }
}

Planet.propTypes = {
  data: PropTypes.object,
};

export default withRouter(Planet);
