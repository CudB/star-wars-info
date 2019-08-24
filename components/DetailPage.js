import React from 'react';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';

class DetailPage extends React.Component {
  static async getInitialProps({ query, pathname }) {
    let props = {};
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

    // If running on server, perform Async call.
    if (typeof window === 'undefined') {
      let args = [props.endpoint];
      if (query.id !== null) args.push(query.id);
      const data = await getDataFromSWAPI(...args);

      if (await data !== null) {
        props.data = await data;
      } else {
        props.error = 'Unable to fetch SWAPI data on server';
      }
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
    if (this.state.data === null) {
      let args = [this.props.endpoint];
      if (this.props.router.query.id !== null) args.push(this.props.router.query.id);
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
