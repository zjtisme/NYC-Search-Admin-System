import React, { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar';
import NewsList from './NewsList';

class HomePage extends Component {

  state = {
    newsList: []
  }

  handleSearch = async (text, number, order) => {
    try {
      const response = await axios.get(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$$app_token=GuDqVUt8KjD9xVjZRINRk4Kjh&$q=${text}&$order=${order} DESC&$limit=${number}`);
      this.setState({...this.state, newsList: response.data});
    } catch (error) {
      console.log('Error retrieving news!')
      console.log(error)
    }
  }

  handleSearchClear = () => {
    this.setState({...this.state, newsList: []});
  }

  render() {
    const renderHeader = () => {
      if(this.props.login) {
        return <h1 className="page-title">Personal Account</h1>
      }
    };
    return (
      <div className="container">
        <div id="home-page" className="row">
            <div className="columns small-centered small-10 medium-8 large-8">
              {renderHeader()}
              <Searchbar handleSearch={this.handleSearch} login={this.props.login} handleSearchClear={this.handleSearchClear}/>
              <NewsList newsList={this.state.newsList}/>
            </div>
          </div>
      </div>
    );
  }
}

export default HomePage;
