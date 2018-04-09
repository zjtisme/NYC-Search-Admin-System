import React, { Component } from 'react';

import HomePage from './HomePage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ConfigurePage from './ConfigurePage';

class Container extends Component {


  renderComponents = () => {
    switch (this.props.contentToBeRendered) {
      case "HomePage":
        return <HomePage login={this.props.login}/>;
      case "AdminPage":
        return <AdminPage />
      case "LoginPage":
        return <LoginPage loginErrorMSG={this.props.loginErrorMSG} handleLogin={this.props.handleLogin} identification={this.props.identification}/>;
      case "SignupPage":
        return <SignupPage signupErrorMSG={this.props.signupErrorMSG} handleSignup={this.props.handleSignup} identification={this.props.identification}/>;
      case "ConfigurePage":
        return <ConfigurePage configureErrorMSG={this.props.configureErrorMSG} userId={this.props.userId}
          userName={this.props.userName} password={this.props.password} firstName={this.props.firstName}
          lastName={this.props.lastName} gender={this.props.gender} email={this.props.email} phoneNumber={this.props.phoneNumber}
          birthday={this.props.birthday} handleUpdate={this.props.handleUpdate}/>;
      default:
        return <HomePage />
    }
  }

  render() {
    return (
      <div>
        {this.renderComponents()}
      </div>
    );
  }
}

export default Container;
