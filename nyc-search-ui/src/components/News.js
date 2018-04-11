import React, { Component } from 'react';

class News extends Component {

  render() {
    return (
      <div data-news-display className="news-data card">
        <div className="card-section">
          <p><span className="news-title">Request ID:</span> <span className="news-content">{this.props.request_id}</span></p>
          <p><span className="news-title">Agency Name:</span> <span className="news-content">{this.props.agency_name}</span></p>
          <p><span className="news-title">Section Name:</span> <span className="news-content">{this.props.section_name}</span></p>
          <p><span className="news-title">Category Description:</span> <span className="news-content">{this.props.category_description}</span></p>
          <p><span className="news-title">Short Title:</span> <span className="news-content">{this.props.short_title}</span></p>
          <p><span className="news-title">End Date:</span> <span className="news-content">{this.props.end_date}</span></p>
          <p><span className="news-title">Start Date:</span> <span className="news-content">{this.props.start_date}</span></p>
          <p style={{"textAlign":"right"}}> {this.props.index}</p>
        </div>
        <hr/>

      </div>
    );
  }
}

export default News;
