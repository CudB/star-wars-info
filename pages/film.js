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
import { Col, Row } from 'reactstrap';

class Film extends DetailPage {
  // Render data if valid or error otherwise.
  render() {
    const { data, error } = this.state;
    let element = null
    if (data === null && error === null) {
      element = <SpinningLoaderLayout />;
    } else if (error === null) {
      element = (
        <div className="sub-details">
          <Row>
            <Col>
              <h1> {data.title} </h1>
            </Col>
          </Row>
          <SubDetailLayout alias="Episode ID" data={String(data.episode_id)} />
          <SubDetailLayout alias="Opening Crawl" data={data.opening_crawl} />
          <SubDetailLayout alias="Director" data={data.director} />
          <SubDetailLayout alias="Producer" data={data.producer} />
          <SubDetailLayout alias="Release Date" data={data.release_date} />
          <LinkedSubDetailLayout alias="Characters" endpoint="character" data={data.characters} />
          <LinkedSubDetailLayout alias="Planets" endpoint="planet" data={data.planets} />
          <LinkedSubDetailLayout alias="Starships" endpoint="starship" data={data.starships} />
          <LinkedSubDetailLayout alias="Vehicles" endpoint="vehicle" data={data.vehicles} />
          <LinkedSubDetailLayout alias="Species" endpoint="species" data={data.species} />
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

Film.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
};

export default withRouter(Film);
