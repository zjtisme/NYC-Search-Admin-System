import React, { Component } from 'react';

class SignupPage extends Component {

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

    this.props.handleSignup(username, pass1, pass2, firstname, lastname, gender, email, phonenumber, birthday);
  }

  render() {
    return (
      <div id="signup-page">
        <h1 className="page-title">Signup Page</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="callout callout-auth">
          <label className="input-form">Username:
            <input id="signup-username" type="text" ref="username" placeholder="input username..."/>
          </label>
          <label className="input-form">Password:
            <input id="signup-password1" type="password" ref="pass1" placeholder="input password..."/>
          </label>
          <label className="input-form">Password Again:
            <input id="signup-password2" type="password" ref="pass2" placeholder="input password again..."/>
          </label>
          <label className="input-form">FirstName:
            <input id="signup-firstname" type="text" ref="firstname" placeholder="your firstname..."/>
          </label>
          <label className="input-form">LastName:
            <input id="signup-lastname" type="text" ref="lastname" placeholder="your lastname..."/>
          </label>
          <label className="input-form">Gender:
              <select id="signup-gender">
                <option value="" ref="genderNull" id="signup-gender-null">---------</option>
                <option value="Male" ref="genderMale" id="signup-gender-male">Male</option>
                <option value="Female" ref="genderFemale" id="signup-gender-female">Female</option>
              </select>
          </label>
          <label className="input-form">Email:
            <input id="signup-email" type="email" ref="email" placeholder="your email..."/>
          </label>
          <label className="input-form">PhoneNumber:
            <input id="signup-phonenumber" type="tel" ref="phonenumber" placeholder="your phone number..."/>
          </label>
          <label className="input-form">Birthday:
            <input id="signup-birthday" type="date" ref="birthday" placeholder="your birthday..."/>
          </label>
          <button id="signup-confirm-button" className="success button expanded" onClick={this.doSignup}>Submit</button>
          <p className="error-message">{this.props.signupErrorMSG}</p>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default SignupPage;
