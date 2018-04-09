import React, { Component } from 'react';

class AdminSearchbar extends Component {

  doSearch = (e) => {
    let text = e.target.value;
    text = text.toLowerCase().trim();

    this.props.handleSearch(text);
  }

  render() {
    return (
      <div>
        <input id="admin-search-bar" style={{"width": "50%", "margin": "1rem auto"}} type="search" id="admin-search-bar" ref="searchText" placeholder="Search user by userName..."
          onChange={this.doSearch}/>
      </div>
    );
  }
}

export default AdminSearchbar;
