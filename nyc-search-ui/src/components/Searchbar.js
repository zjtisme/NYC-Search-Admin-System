import React, { Component } from 'react';

class Searchbar extends Component {

  doSearch = () => {
    const text = this.refs.searchText.value.trim();
    if(text.length === 0) {
      return;
    }
    const number = this.props.login ? this.refs.searchNumber.value: '50';
    const order = this.props.login? this.refs.orderBy.value: 'end_date';
    this.props.handleSearch(text, number, order);
  }

  doClear = () => {
    this.props.handleSearchClear();
    this.refs.searchText.value= '';
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.doSearch();
    }
  }

  render() {
    const renderChoices = () => {
      if(this.props.login) {
        return (
          <div>
            <label className="user-choices"> Will show:
              <select ref="searchNumber">
                <option value="50">50 news</option>
                <option value="100">100 news</option>
                <option value="150">150 news</option>
              </select>
            </label>
            <label className="user-choices"> Ordered by:
              <select ref="orderBy">
                <option value="start_date">start date</option>
                <option value="end_date">end date</option>
              </select>
            </label>
          </div>
        );
      }
    };

    const renderNotice = this.props.login ? "search news based on your choice...": "search 50 latest news by keywords...";
    return (
      <div className="container__header">
        <input type="search" id="search-bar" ref="searchText" placeholder={renderNotice} onKeyDown={this.handleKeyPress}/>
        <div className="expanded button-group">
          <button id="search-confirm-button" className="button expanded" onClick={this.doSearch}>search</button>
          <button id="search-clear-button" className="button expanded alert" onClick={this.doClear}>clear</button>
        </div>
        {renderChoices()}
      </div>
    );
  }
}

export default Searchbar;
