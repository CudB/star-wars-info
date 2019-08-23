import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class Vehicle extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps({ query }) {
    let data = await getDataFromSWAPI('vehicles', query.id);
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
              <SubDetailLayout alias="Vehicle Name" data={data.name} />
              <SubDetailLayout alias="Model" data={data.model} />
              <SubDetailLayout alias="Vehicle Class" data={data.vehicle_class} />
              <SubDetailLayout alias="Manufacturer" data={data.manufacturer} />
              <SubDetailLayout alias="Cost in Credits" data={String(data.cost_in_credits)} />
              <SubDetailLayout alias="Length" data={String(data.length)} />
              <SubDetailLayout alias="Max Atmosphering Speed" data={String(data.max_atmosphering_speed)} />
              <SubDetailLayout alias="Crew" data={String(data.crew)} />
              <SubDetailLayout alias="Passengers" data={String(data.passengers)} />
              <SubDetailLayout alias="Cargo Capacity" data={String(data.cargo_capacity)} />
              <SubDetailLayout alias="Consumables" data={data.consumables} />
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

Vehicle.propTypes = {
  data: PropTypes.object,
};

export default withRouter(Vehicle);
