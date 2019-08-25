import React from 'react';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class DetailPage extends React.Component {
  static async getInitialProps({ pathname }) {
    let props = {};

    // Determine endpoint for data fetch from SWAPI.
    props.endpoint = null;
    switch (pathname) {
      case '/film':
        props.endpoint = 'films';
        break;
      case '/character':
        props.endpoint = 'people';
        break;
      case '/planet':
        props.endpoint = 'planets';
        break;
      case '/starship':
        props.endpoint = 'starships';
        break;
      case '/vehicle':
        props.endpoint = 'vehicles';
        break;
      case '/species':
        props.endpoint = 'species';
        break;
      default:
        break;
    }

    return props;
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data || null,
      error: props.error || null,
    };
  }

  async componentDidMount() {
    // Try to fetch data on client.
    if (this.state.data === null) {
      let args = [this.props.endpoint];
      if (this.props.router && this.props.router.query) {
        if (this.props.router.query.id !== null) args.push(this.props.router.query.id);
      }
      const data = await getDataFromSWAPI(...args);


      if (await data !== null) {
        this.setState({
          data: await data,
          error: null
        })
      } else {
        this.setState({
          error: "Unable to fetch SWAPI data on server"
        })
      }
    }
  }
}

DetailPage.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
  router: PropTypes.object,
  query: PropTypes.object,
  id: PropTypes.number,
  endpoint: PropTypes.string,
};

export default DetailPage;
