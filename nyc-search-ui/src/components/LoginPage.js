import React, { Component } from 'react';

class LoginPage extends Component {

  state = {
    identification: this.props.identification
  }

  doLogin = () => {
    const userNameRef = this.refs.username;
    const passwordRef = this.refs.password;

    this.props.handleLogin(userNameRef.value, passwordRef.value, this.state.identification);
  }

  changeIdentification = (e) => {
    const buttonName = e.target.name;

    if(buttonName === 'user-button') {
      this.setState({identification: 'user'});
    } else {
      this.setState({identification: 'admin'});
    }
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    const renderLoginButton = () => {
      if(this.state.identification === 'user') {
        return <button id="login-confirm-button" className="button expanded" onClick={this.doLogin}>User Login</button>;
      } else {
        return <button id="admin-login-confirm-button" className="warning button expanded" onClick={this.doLogin}>Admin Login</button>
      }
    };
    return (
      <div id="login-page">
        <h1 className="page-title">Login Page</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
                <div className="expanded button-group">
                  <button className="button" name="user-button" onClick={this.changeIdentification}>User</button>
                  <button id="admin-login-change-button" className="button warning" name="admin-button" onClick={this.changeIdentification}>Admin</button>
                </div>
                <label className="input-form"> Username:
                    <input id="login-username" type="text" name="username" ref="username" placeholder="input username..."/>
                </label>

                <label className="input-form"> Password:
                      <input id="login-password" type="password" name="password" ref="password" placeholder="input password..."/>
                </label>
                {renderLoginButton()}
                <p id="login-error" className="error-message">{this.props.loginErrorMSG}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
