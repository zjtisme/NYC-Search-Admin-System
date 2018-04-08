import React, { Component } from 'react';

class News extends Component {

  render() {
    return (
      <div data-news-display>
        <p>{this.props.index}</p>
        <p>request_id: {this.props.request_id}</p>
        <p>agency_name: {this.props.agency_name}</p>
        <p>section_name: {this.props.section_name}</p>
        <p>category_description: {this.props.category_description}</p>
        <p>short_title: {this.props.short_title}</p>
        <p>end_date: {this.props.end_date}</p>
        <p>start_date: {this.props.start_date}</p>
        <hr/>
      </div>
    );
  }
}

export default News;
