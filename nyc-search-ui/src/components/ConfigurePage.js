import React, { Component } from 'react';

class ConfigurePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updatedUser: {
        'userName': this.props.userName,
        'pass1': this.props.password,
        'pass2': this.props.password,
        'firstName': this.props.firstName,
        'lastName': this.props.lastName,
        'gender': this.props.gender,
        'email': this.props.email,
        'phoneNumber': this.props.phoneNumber,
        'birthday': this.props.birthday
      },
      identification: this.props.identification
    }
  }

  componentDidMount() {
    if(this.state.identification === 'admin') {
      this.refs.firstnamelabel.hidden = "hidden";
      this.refs.lastnamelabel.hidden = "hidden";
      this.refs.genderlabel.hidden = "hidden";
      this.refs.emaillabel.hidden = "hidden";
      this.refs.phonenumberlabel.hidden = "hidden";
      this.refs.birthdaylabel.hidden = "hidden";
    } else {
      this.refs.firstnamelabel.hidden = "";
      this.refs.lastnamelabel.hidden = "";
      this.refs.genderlabel.hidden = "";
      this.refs.emaillabel.hidden = "";
      this.refs.phonenumberlabel.hidden = "";
      this.refs.birthdaylabel.hidden = "";
    }
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const curUser = this.state.updatedUser;
    curUser[fieldName] = fieldValue;

    this.setState({...this.state, updatedUser: curUser});
  }

  doModify = () => {
    const username = this.state.updatedUser.userName;
    const pass1 = this.state.updatedUser.pass1;
    const pass2 = this.state.updatedUser.pass2;
    const firstname = this.state.updatedUser.firstName;
    const lastname = this.state.updatedUser.lastName;
    const gender = this.state.updatedUser.gender;
    const email = this.state.updatedUser.email;
    const phonenumber = this.state.updatedUser.phoneNumber;
    const birthday = this.state.updatedUser.birthday;

    this.props.handleUpdate(username, pass1, pass2, firstname, lastname, gender, email, phonenumber, birthday, this.state.identification);
  }

  render() {
    return (
      <div id="configure-page">
        <h1 className="page-title">Your Profile</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="callout callout-auth">
          <label className="input-form" ref="usernamelabel">Username:
            <input id="configure-username" type="text" ref="username" name="userName" value={this.state.updatedUser.userName} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="pass1label">Password:
            <input id="configure-password1" type="password" ref="pass1" name="pass1" value={this.state.updatedUser.pass1} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="pass2label">Password Again:
            <input id="configure-password2" type="password" ref="pass2" name="pass2" value={this.state.updatedUser.pass2} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="firstnamelabel">FirstName:
            <input id="configure-firstname" type="text" ref="firstname" name="firstName" value={this.state.updatedUser.firstName} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="lastnamelabel">LastName:
            <input id="configure-lastname" type="text" ref="lastname" name="lastName" value={this.state.updatedUser.lastName} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="genderlabel">Gender:
              <select id="configure-gender" name="gender" value={this.state.updatedUser.gender} onChange={this.handleChange}>
                <option value="" ref="genderNull" id="configure-gender-null">---------</option>
                <option value="Male" ref="genderMale" id="configure-gender-male">Male</option>
                <option value="Female" ref="genderFemale" id="configure-gender-female">Female</option>
              </select>
          </label>
          <label className="input-form" ref="emaillabel">Email:
            <input id="configure-email" type="email" ref="email" name="email" value={this.state.updatedUser.email} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="phonenumberlabel">PhoneNumber:
            <input id="configure-phonenumber" type="tel" ref="phonenumber" name="phoneNumber" value={this.state.updatedUser.phoneNumber} onChange={this.handleChange}/>
          </label>
          <label className="input-form" ref="birthdaylabel">Birthday:
            <input id="configure-birthday" type="date" ref="birthday" name="birthday" value={this.state.updatedUser.birthday} onChange={this.handleChange}/>
          </label>
          <button id="configure-confirm-button" className="success button expanded" onClick={this.doModify}>Submit</button>
          <p className="error-message">{this.props.configureErrorMSG}</p>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default ConfigurePage;
