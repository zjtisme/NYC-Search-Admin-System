import React, { Component } from 'react';
import axios from 'axios';

import UserList from './UserList';
import AddUserPage from './AddUserPage';
import AdminSearchbar from './AdminSearchbar';

class AdminPage extends Component {

  state = {
    usersList: [],
    buttonText: "Show Adduser Panel",
    showAddUser: false,
    createUserError: '',
    searchText: ''
  }

  async componentDidMount() {
    try {
      const response = await axios.get(process.env.REACT_APP_HOST + "/users");
      const respList = response.data;

      this.setState({...this.state, usersList: respList});
    } catch (error) {
      console.log("Error fetching users data!");
      console.log(error);
    }
  }

  toggleAddUser = () => {
    if(this.state.showAddUser) {
      this.setState({...this.state, buttonText: "Show Adduser Panel", showAddUser: false});
    } else {
      this.setState({...this.state, buttonText: "Hide Adduser Panel", showAddUser: true});
    }
  }

  handleCreateUser = async (username, password, firstname, lastname, gender, email, phonenumber, birthday) => {
    if(username.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0|| gender.length === 0 || email.length === 0 || phonenumber.length === 0 || birthday.length === 0){
        this.setState({...this.state, createUserError: 'All fields are required!'});
        return;
    }

    try {
      const newUser = {
        'userName': username,
        'password': password,
        'firstName': firstname,
        'lastName': lastname,
        'gender': gender,
        'email': email,
        'phoneNumber': phonenumber,
        'birthday': birthday
      };

      const response = await axios.post(process.env.REACT_APP_HOST+'/users/', newUser);
      if(response.status === 200) {
        const data = response.data;
        const newUserList = [...this.state.usersList, data];
        this.setState({...this.state, usersList: newUserList, createUserError: '', buttonText: "Show Adduser Panel",
        showAddUser: false});
      } else {
        this.setState({...this.state, createUserError: 'Error occurs, the status code is: ' + response.status});
      }
    } catch (err) {
      console.log('error creating user!');
      console.log(err);
    }
  }

  handleDelete = async (id, index) => {
    if(window.confirm('Are you sure?')) {
      try {
        await axios.delete(process.env.REACT_APP_HOST+`/users/${id}`);
        const newList = this.state.usersList;
        newList.splice(index, 1);
        this.setState({...this.state, usersList: newList});
      } catch (err) {
        console.log("Error deleting user!");
        console.log(err);
      }
    }
  }

  handleUpdate = async (updatedUser, index) => {
    try {
      const response = await axios.patch(process.env.REACT_APP_HOST+`/users/${updatedUser.id}`, updatedUser);
      const data = response.data;

      const newList = this.state.usersList;
      newList[index] = data;
      this.setState({...this.state, usersList: newList});
    } catch (err) {
      console.log("Error updating user info!");
      console.log(err);
    }
  }

  handleSearch = (text) => {
    this.setState({...this.state, searchText: text});
  }

  render() {
    const renderAddUser = () => {
      if(this.state.showAddUser) {
        return <AddUserPage handleCreateUser={this.handleCreateUser}/>
      }
    };
    return (
      <div id="admin-page">
          <div style={{"textAlign": "center", "margin": "2rem 0"}}>
              <button id="adduser-button" className="button" onClick={this.toggleAddUser}>{this.state.buttonText}</button>
          </div>
          {renderAddUser()}
          <AdminSearchbar handleSearch={this.handleSearch}/>
          <UserList usersList={this.state.usersList} searchText={this.state.searchText} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
      </div>
    );
  }
}

export default AdminPage;
