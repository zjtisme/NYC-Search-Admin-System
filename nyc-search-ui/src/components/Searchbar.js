import React, { Component } from 'react';

class Searchbar extends Component {

  doSearch = () => {
    const text = this.refs.searchText.value.trim();
    if(text.length === 0) {
      return;
    }

    this.props.handleSearch(text);
  }

  handleKeyPress = (e) => {
    console.log(e.key);
    if(e.key === 'Enter') {
      this.doSearch();
    }
  }

  render() {
    return (
      <div className="container__header">
        <input type="search" id="search-bar" ref="searchText" placeholder="search 50 latest news by keywords..." onKeyDown={this.handleKeyPress}/>
        <button id="search-confirm-button" className="button expanded" onClick={this.doSearch}>search</button>
      </div>
    );
  }
}

export default Searchbar;
