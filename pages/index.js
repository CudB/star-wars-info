import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class Index extends React.Component {

  // GET request to swapi.co for data.
  static async getInitialProps() {
    const data = await getDataFromSWAPI('films');
    return { data: data.results }
  }

  // Render data if valid or error otherwise.
  render() {
    const { data } = this.props;
    if (data !== null) {
      return (
        <BaseLayout className="cover">
          <BasePage>
            <LinkedSubDetailLayout alias="Film List" endpoint="film" data={data} />
          </BasePage>
        </BaseLayout>
      )
    } else {
      return <HttpErrorLayout />
    }
  }
}

Index.propTypes = {
  data: PropTypes.array,
};

export default Index;
