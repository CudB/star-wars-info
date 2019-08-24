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

class Vehicle extends DetailPage {
  // Render data if valid or error otherwise.
  render() {
    const { data, error } = this.state;
    let element = null
    if (data === null && error === null) {
      element = <SpinningLoaderLayout />;
    } else if (error === null) {
      element = (
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

Vehicle.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
};

export default withRouter(Vehicle);
