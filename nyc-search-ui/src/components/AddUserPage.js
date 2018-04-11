import React, { Component } from 'react';


class AddUserPage extends Component {

  doCreateUser = () => {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const firstname = this.refs.firstname.value;
    const lastname = this.refs.lastname.value;
    let gender = this.refs.genderNull.value;
    if(this.refs.genderMale.selected) {
      gender = this.refs.genderMale.value;
    } else if(this.refs.genderFemale.selected) {
      gender = this.refs.genderFemale.value;
    }
    const email = this.refs.email.value;
    const phonenumber = this.refs.phonenumber.value;
    const birthday = this.refs.birthday.value;

    this.props.handleCreateUser(username, password, firstname, lastname, gender, email, phonenumber, birthday);
    this.clearInputs();
  }

  clearInputs = () => {
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.firstname.value = '';
    this.refs.lastname.value = '';
    this.refs.genderlabel.value = '';
    this.refs.email.value = '';
    this.refs.phonenumber.value = '';
    this.refs.birthday.value = '';
  }

  render() {
    return (
      <div id="adduser-page">
        <h1 className="page-title">Create User</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="callout callout-auth">
          <label className="input-form" ref="usernamelabel">Username:
            <input id="adduser-username" type="text" ref="username" placeholder="user's username..."/>
          </label>
          <label className="input-form" ref="passwordlabel">Password:
            <input id="adduser-password" type="password" ref="password" placeholder="user's password..."/>
          </label>
          <label className="input-form" ref="firstnamelabel">FirstName:
            <input id="adduser-firstname" type="text" ref="firstname" placeholder="user's firstname..."/>
          </label>
          <label className="input-form" ref="lastnamelabel">LastName:
            <input id="adduser-lastname" type="text" ref="lastname" placeholder="user's lastname..."/>
          </label>
          <label className="input-form" ref="genderlabel">Gender:
              <select id="adduser-gender" ref="gender">
                <option value="" ref="genderNull" id="adduser-gender-null">---------</option>
                <option value="Male" ref="genderMale" id="adduser-gender-male">Male</option>
                <option value="Female" ref="genderFemale" id="adduser-gender-female">Female</option>
              </select>
          </label>
          <label className="input-form" ref="emaillabel">Email:
            <input id="adduser-email" type="email" ref="email" placeholder="user's email..."/>
          </label>
          <label className="input-form" ref="phonenumberlabel">PhoneNumber:
            <input id="adduser-phonenumber" type="tel" ref="phonenumber" placeholder="user's phone number..."/>
          </label>
          <label className="input-form" ref="birthdaylabel">Birthday:
            <input id="adduser-birthday" type="date" ref="birthday" placeholder="user's birthday..."/>
          </label>
          <button id="adduser-confirm-button" className="button expanded" onClick={this.doCreateUser}>OK</button>
          <p className="error-message">{this.props.createUserError}</p>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default AddUserPage;
