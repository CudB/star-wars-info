import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class Film extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps({ query }) {
    let data = await getDataFromSWAPI('films', query.id);
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
              <h1> {data.title} </h1>
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
          </BasePage>
        </BaseLayout>
      )
    } else {
      return <HttpErrorLayout />;
    }
  }
}

Film.propTypes = {
  data: PropTypes.object,
};

export default withRouter(Film);
