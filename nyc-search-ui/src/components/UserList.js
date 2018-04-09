import React, { Component } from 'react';

import User from './User';

class UserList extends Component {

  render() {
    const userList = this.props.usersList.map((user, index) => {
      return <User {...user} key={user.id} index={index} handleDelete={this.props.handleDelete}
        handleUpdate={this.props.handleUpdate}/>;
    });
    return (
      <table className="table-scroll">
        <thead>
          <tr>
            <th>Id</th>
            <th>userName</th>
            <th>password</th>
            <th>firstName</th>
            <th>lastName</th>
            <th style={{"width": "150px"}}>gender</th>
            <th style={{"width": "250px"}}>email</th>
            <th>phoneNumber</th>
            <th>birthday</th>
            <th style={{"width": "150px"}}>Modify Op</th>
            <th>Delete Op</th>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    );
  }
}

export default UserList;
