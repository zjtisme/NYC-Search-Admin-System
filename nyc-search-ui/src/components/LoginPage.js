import React, { Component } from 'react';

class LoginPage extends Component {

  doLogin = () => {
    const userNameRef = this.refs.username;
    const passwordRef = this.refs.password;

    this.props.handleLogin(userNameRef.value, passwordRef.value);
  }

  render() {
    return (
      <div id="login-page">
        <h1 className="page-title">Login Page</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">

                <label className="input-form"> Username:
                    <input id="login-username" type="text" name="username" ref="username" placeholder="input username..."/>
                </label>

                <label className="input-form"> Password:
                      <input id="login-password" type="password" name="password" ref="password" placeholder="input password..."/>
                </label>

                <button id="login-confirm-button" className="success button expanded" onClick={this.doLogin}>Log In</button>

                <p id="login-error" className="error-message">{this.props.loginErrorMSG}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default LoginPage;
