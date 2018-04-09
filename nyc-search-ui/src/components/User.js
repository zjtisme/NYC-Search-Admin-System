import React, { Component } from 'react';

class User extends Component {

  state = {
    updatedUser: {
      "id": this.props.id,
      "userName": this.props.userName,
      "password": this.props.password,
      "firstName": this.props.firstName,
      "lastName": this.props.lastName,
      "gender": this.props.gender,
      "email": this.props.email,
      "phoneNumber": this.props.phoneNumber,
      "birthday": this.props.birthday
    },
    index: this.props.index,
    modify: false
  }

  prepareModify = () => {
    this.refs.username.disabled = '';
    this.refs.password.disabled = '';
    this.refs.firstname.disabled = '';
    this.refs.lastname.disabled = '';
    this.refs.gender.disabled = '';
    this.refs.email.disabled = '';
    this.refs.phonenumber.disabled = '';
    this.refs.birthday.disabled = '';

    this.setState({...this.state, modify: true});
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const curUser = this.state.updatedUser;
    curUser[fieldName] = fieldValue;
    this.setState({...this.state, updatedUser: curUser});
  }

  rollback = () => {
    const originalUser = {
      "id": this.props.id,
      "userName": this.props.userName,
      "password": this.props.password,
      "firstName": this.props.firstName,
      "lastName": this.props.lastName,
      "gender": this.props.gender,
      "email": this.props.email,
      "phoneNumber": this.props.phoneNumber,
      "birthday": this.props.birthday
    };

    this.disableInputs();

    this.setState({...this.state, updatedUser: originalUser, modify: false});
  }

  disableInputs = () => {
    this.refs.username.disabled = 'disabled';
    this.refs.password.disabled = 'disabled';
    this.refs.firstname.disabled = 'disabled';
    this.refs.lastname.disabled = 'disabled';
    this.refs.gender.disabled = 'disabled';
    this.refs.email.disabled = 'disabled';
    this.refs.phonenumber.disabled = 'disabled';
    this.refs.birthday.disabled = 'disabled';
  }

  doUpdateUser = () => {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const firstname = this.refs.firstname.value;
    const lastname = this.refs.lastname.value;
    const gender = this.refs.gender.value;
    const email = this.refs.email.value;
    const phonenumber = this.refs.phonenumber.value;
    const birthday = this.refs.birthday.value;
    if(username.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0|| gender.length === 0 || email.length === 0 || phonenumber.length === 0 || birthday.length === 0){
        return;
    }
    this.props.handleUpdate(this.state.updatedUser, this.props.index);
    this.disableInputs();
    this.setState({...this.state, modify: false});
  }

  render() {
    const renderModifyButtons = () => {
      if(this.state.modify) {
        return (
          <div className="expanded button-group">
            <button id={`user-${this.props.id}-confirmButton`} className="button success" onClick={this.doUpdateUser}>OK</button>
            <button id={`user-${this.props.id}-rollbackButton`} className="button secondary" onClick={this.rollback}>BACK</button>
          </div>
        );
      } else {
        return <button id={`user-${this.props.id}-modifyButton`} className="expanded warning button" onClick={this.prepareModify}>Modify</button>;
      }
    };

    return (
      <tr data-users-display>
        <td>{this.state.updatedUser.id}</td>
        <td><input type="text" id={`user-${this.props.id}-username`} name="userName" ref="username" value={this.state.updatedUser.userName} disabled="disabled" onChange={this.handleChange}/></td>
        <td><input type="text" id={`user-${this.props.id}-password`} name="password" ref="password" value={this.state.updatedUser.password} disabled="disabled" onChange={this.handleChange}/></td>
        <td><input type="text" id={`user-${this.props.id}-firstname`} name="firstName" ref="firstname" value={this.state.updatedUser.firstName} disabled="disabled" onChange={this.handleChange}/></td>
        <td><input type="text" id={`user-${this.props.id}-lastname`} name="lastName" ref="lastname" value={this.state.updatedUser.lastName} disabled="disabled" onChange={this.handleChange}/></td>
        <td><select name="gender" id={`user-${this.props.id}-gender`} value={this.state.updatedUser.gender} onChange={this.handleChange} disabled="disabled" ref="gender">
          <option value="">------</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select></td>
      <td><input type="text" id={`user-${this.props.id}-email`} name="email" ref="email" value={this.state.updatedUser.email} disabled="disabled" onChange={this.handleChange}/></td>
        <td><input type="tel" id={`user-${this.props.id}-phonenumber`} name="phoneNumber" ref="phonenumber" value={this.state.updatedUser.phoneNumber} disabled="disabled" onChange={this.handleChange}/></td>
        <td><input type="date" id={`user-${this.props.id}-birthday`} name="birthday" ref="birthday" value={this.state.updatedUser.birthday} disabled="disabled" onChange={this.handleChange}/></td>
        <td>{renderModifyButtons()}</td>
        <td><button id={`user-${this.props.id}-deleteButton`} className="expanded alert button" onClick={()=>{this.props.handleDelete(this.props.id, this.props.index)}}>Delete</button></td>
      </tr>
    );
  }
}

export default User;
