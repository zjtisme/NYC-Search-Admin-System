import React, { Component } from 'react';

import User from './User';

class UserList extends Component {

  handleSearch = (userList) => {
    if(this.props.searchText.length === 0){
      return userList;
    }

    const filteredList = userList.filter(user => {
      return user.userName.toLowerCase().trim().indexOf(this.props.searchText) !== -1;
    });

    return filteredList;
  }

  render() {
    const userList = this.handleSearch(this.props.usersList).map((user) => {
      const index = this.props.usersList.indexOf(user);
      return <User {...user} key={user.id} index={index} handleDelete={this.props.handleDelete}
        handleUpdate={this.props.handleUpdate}/>;
    });

    const renderList = () => {
       if(userList.length === 0) {
         return <tr><td className="no-result-notice" colSpan="11">No users found now!</td></tr>
       } else {
         return userList;
       }
    };

    return (
      <table className="table-scroll hover container__footer">
        <thead>
          <tr>
            <th style={{"textAlign": "center"}}>Id</th>
            <th style={{"textAlign": "center"}}>userName</th>
            <th style={{"textAlign": "center"}}>password</th>
            <th style={{"textAlign": "center"}}>firstName</th>
            <th style={{"textAlign": "center"}}>lastName</th>
            <th style={{"width": "150px", "textAlign": "center"}}>gender</th>
            <th style={{"width": "250px", "textAlign": "center"}}>email</th>
            <th style={{"textAlign": "center"}}>phoneNumber</th>
            <th style={{"textAlign": "center"}}>birthday</th>
            <th style={{"width": "150px", "textAlign": "center"}}>Modify Op</th>
            <th style={{"textAlign": "center"}}>Delete Op</th>
          </tr>
        </thead>
        <tbody id="user-list">
          {renderList()}
        </tbody>
      </table>
    );
  }
}

export default UserList;
