import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import LinkedSubDetailLayout from '../components/layouts/LinkedSubDetailLayout';
import HttpErrorLayout from '../components/layouts/HttpErrorLayout';
import BasePage from '../components/BasePage';
import PropTypes from 'prop-types';
import getDataFromSWAPI from '../utils/getReqHelper';
import filterDataByString from '../utils/filterHelper';

import { Col, Row, Input } from 'reactstrap';

class Index extends React.Component {
  // GET request to swapi.co for data.
  static async getInitialProps() {
    let props = {};

    // If running on server, perform async call.
    if (typeof window === 'undefined') {
      const data = await getDataFromSWAPI('films');
      if (await data !== null) {
        props.data = await data.results;
      } else {
        props.error = 'Unable to fetch SWAPI data on server';
      }
    }
    return props;
  }

  // Set data on page load.
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: props.data || null,
      error: props.error || null,
    };
  }

  async componentDidMount() {
    // Try to fetch data on client.
    if (this.state.data === null) {
      const data = await getDataFromSWAPI('films');
      if (data !== null) {
        this.setState({
          data: await data.results,
          error: null
        })
      } else {
        this.setState({
          error: "Unable to fetch SWAPI data on server"
        })
      }
    }
  }

  // Update search in state.
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0) });
  }

  // Render data if valid or error otherwise.
  render() {
    const { data, error } = this.props;

    if (data !== null) {
      // Filter data by by looking for search field text in title and description of data.
      let filteredData = filterDataByString(this.state.data, this.state.search);
      return (
        <BaseLayout>
          <BasePage className="film-list" >
            <Row>
              <Col>
                <h4>Search Filter</h4>
                <Input placeholder="Filter by title or description! eg. &quot;Darth Vader&quot;"
                  type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}
                />
              </Col>
            </Row>
            <LinkedSubDetailLayout alias="Film List" endpoint="film" data={filteredData} />
          </BasePage>
        </BaseLayout >
      )
    } else {
      return <HttpErrorLayout error={error} />
    }
  }
}

Index.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
};

export default Index;
