import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class Starship extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps({ query }) {
    let data = await getDataFromSWAPI('starships', query.id);
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
              <SubDetailLayout alias="Starship Name" data={data.name} />
              <SubDetailLayout alias="Model" data={data.model} />
              <SubDetailLayout alias="Cost in Credits" data={String(data.cost_in_credits)} />
              <SubDetailLayout alias="Length" data={String(data.length)} />
              <SubDetailLayout alias="Max Atmosphering Speed" data={String(data.max_atmosphering_speed)} />
              <SubDetailLayout alias="Crew" data={String(data.crew)} />
              <SubDetailLayout alias="Passengers" data={String(data.passengers)} />
              <SubDetailLayout alias="Cargo Capacity" data={String(data.cargo_capacity)} />
              <SubDetailLayout alias="Consumables" data={data.consumables} />
              <SubDetailLayout alias="Hyperdrive Rating" data={String(data.hyperdrive_rating)} />
              <SubDetailLayout alias="MGLT" data={String(data.MGLT)} />
              <SubDetailLayout alias="Starship Class" data={String(data.starship_class)} />
              <LinkedSubDetailLayout alias="Pilots" endpoint="character" data={data.pilots} />
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

Starship.propTypes = {
  data: PropTypes.object,
};

export default withRouter(Starship);
