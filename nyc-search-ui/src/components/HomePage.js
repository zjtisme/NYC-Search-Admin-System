import React, { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar';
import NewsList from './NewsList';

class HomePage extends Component {

  state = {
    newsList: []
  }

  handleSearch = async (text) => {
    try {
      const response = await axios.get(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$$app_token=GuDqVUt8KjD9xVjZRINRk4Kjh&$q=${text}&$order=end_date DESC&$limit=50`);
      this.setState({...this.state, newsList: response.data});
    } catch (error) {
      console.log('Error retrieving news!')
      console.log(error)
    }
  }

  render() {
    const renderHeader = () => {
      if(this.props.login) {
        return <h1 className="page-title">Personal Account</h1>
      }
    };
    return (
      <div>
        <div id="home-page" className="row">
            <div className="columns small-centered small-10 medium-8 large-8">
              {renderHeader()}
              <Searchbar handleSearch={this.handleSearch}/>
              <NewsList newsList={this.state.newsList}/>
            </div>
          </div>
      </div>
    );
  }
}

export default HomePage;
