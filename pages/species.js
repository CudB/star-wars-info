import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import SubDetailLayout from '../components/layouts/SubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class Species extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps({ query }) {
    let data = await getDataFromSWAPI('species', query.id);
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
              <SubDetailLayout alias="Species Name" data={data.name} />
              <SubDetailLayout alias="Designation" data={data.designation} />
              <SubDetailLayout alias="Average Height" data={String(data.average_height)} />
              <SubDetailLayout alias="Skin Colors" data={data.skin_colors} />
              <SubDetailLayout alias="Hair Colors" data={data.hair_colors} />
              <SubDetailLayout alias="Eye Colors" data={data.eye_colors} />
              <SubDetailLayout alias="Average Lifespan" data={String(data.average_lifespan)} />
              <SubDetailLayout alias="language" data={data.language} />
              <LinkedSubDetailLayout alias="Homeworld" endpoint="planet" data={[data.homeworld]} />
              <LinkedSubDetailLayout alias="People" endpoint="character" data={data.people} />
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

Species.propTypes = {
  data: PropTypes.object,
};

export default withRouter(Species);
