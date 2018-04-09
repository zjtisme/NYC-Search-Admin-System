import React, { Component } from 'react';

class SignupPage extends Component {

  state = {
    identification: this.props.identification
  }

  doSignup = () => {
    const username = this.refs.username.value;
    const pass1 = this.refs.pass1.value;
    const pass2 = this.refs.pass2.value;
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

    this.props.handleSignup(username, pass1, pass2, firstname, lastname, gender, email, phonenumber, birthday, this.state.identification);
  }

  changeIdentification = (e) => {
    const buttonName = e.target.name;

    if(buttonName === 'user-button') {
      this.setState({identification: 'user'});
      this.refs.firstnamelabel.hidden = '';
      this.refs.lastnamelabel.hidden = '';
      this.refs.genderlabel.hidden = '';
      this.refs.emaillabel.hidden = '';
      this.refs.phonenumberlabel.hidden = '';
      this.refs.birthdaylabel.hidden = '';
    } else {
      this.setState({identification: 'admin'});
      this.refs.firstnamelabel.hidden = 'hidden';
      this.refs.lastnamelabel.hidden = 'hidden';
      this.refs.genderlabel.hidden = 'hidden';
      this.refs.emaillabel.hidden = 'hidden';
      this.refs.phonenumberlabel.hidden = 'hidden';
      this.refs.birthdaylabel.hidden = 'hidden';
    }
    this.refs.username.value = '';
    this.refs.pass1.value = '';
    this.refs.pass2.value = '';
    this.refs.firstname.value = '';
    this.refs.lastname.value = '';
    this.refs.gender.value = '';
    this.refs.email.value = '';
    this.refs.phonenumber.value = '';
    this.refs.birthday.value = '';
  }

  render() {
    const renderSignupButton = () => {
      if(this.state.identification === 'user') {
        return <button id="signup-confirm-button" className="button expanded" onClick={this.doSignup}>User Signup</button>
      } else {
        return <button id="admin-signup-confirm-button" className="warning button expanded" onClick={this.doSignup}>Admin Signup</button>
      }
    };

    return (
      <div id="signup-page">
        <h1 className="page-title">Signup Page</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="callout callout-auth">
                <div className="expanded button-group">
                  <button className="button" name="user-button" onClick={this.changeIdentification}>User</button>
                  <button id="admin-signup-change-button" className="button warning" name="admin-button" onClick={this.changeIdentification}>Admin</button>
                </div>
          <label className="input-form" ref="usernamelabel">Username:
            <input id="signup-username" type="text" ref="username" placeholder="input username..."/>
          </label>
          <label className="input-form" ref="password1label">Password:
            <input id="signup-password1" type="password" ref="pass1" placeholder="input password..."/>
          </label>
          <label className="input-form" ref="password2label">Password Again:
            <input id="signup-password2" type="password" ref="pass2" placeholder="input password again..."/>
          </label>
          <label className="input-form" ref="firstnamelabel">FirstName:
            <input id="signup-firstname" type="text" ref="firstname" placeholder="your firstname..."/>
          </label>
          <label className="input-form" ref="lastnamelabel">LastName:
            <input id="signup-lastname" type="text" ref="lastname" placeholder="your lastname..."/>
          </label>
          <label className="input-form" ref="genderlabel">Gender:
              <select id="signup-gender" ref="gender">
                <option value="" ref="genderNull" id="signup-gender-null">---------</option>
                <option value="Male" ref="genderMale" id="signup-gender-male">Male</option>
                <option value="Female" ref="genderFemale" id="signup-gender-female">Female</option>
              </select>
          </label>
          <label className="input-form" ref="emaillabel">Email:
            <input id="signup-email" type="email" ref="email" placeholder="your email..."/>
          </label>
          <label className="input-form" ref="phonenumberlabel">PhoneNumber:
            <input id="signup-phonenumber" type="tel" ref="phonenumber" placeholder="your phone number..."/>
          </label>
          <label className="input-form" ref="birthdaylabel">Birthday:
            <input id="signup-birthday" type="date" ref="birthday" placeholder="your birthday..."/>
          </label>
          {renderSignupButton()}
          <p className="error-message">{this.props.signupErrorMSG}</p>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default SignupPage;
