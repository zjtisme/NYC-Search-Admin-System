import React, { Component } from 'react';

class Topbar extends Component {


  render() {
    const renderBasedOnLogin = () => {
      if(this.props.login) {
        if(this.props.identification === 'user') {
            return (
              <div className="top-bar">
                  <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text logo" id="private-welcome-text" onClick={()=>{this.props.renderContent("HomePage")}}>Welcome {this.props.userName}!</li>
                    </ul>
                  </div>
                  <div className="top-bar-right">
                    <ul className="menu">
                      <li><button id="configure-button" className="hollow button success" onClick={()=>{this.props.renderContent("ConfigurePage")}}>Settings</button></li>
                      <li><button id="logout-button" className="hollow button secondary" onClick={()=>{this.props.handleLogout()}}>Logout</button></li>
                    </ul>
                  </div>
              </div>
            );
          } else {
            return (
              <div className="top-bar">
                  <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text logo" id="private-welcome-text" onClick={()=>{this.props.renderContent("AdminPage")}}>Welcome Admin {this.props.userName}!</li>
                    </ul>
                  </div>
                  <div className="top-bar-right">
                    <ul className="menu">
                      <li><button id="configure-button" className="hollow button success" onClick={()=>{this.props.renderContent("ConfigurePage")}}>Settings</button></li>
                      <li><button id="logout-button" className="hollow button secondary" onClick={()=>{this.props.handleLogout()}}>Logout</button></li>
                    </ul>
                  </div>
              </div>
            );
          }
      } else {
        return (
          <div className="top-bar">
              <div className="top-bar-left">
                <ul className="menu">
                    <li className="menu-text logo" id="public-welcome-text" onClick={()=>{this.props.renderContent("HomePage")}}>Welcome to NYC Search Portal</li>
                </ul>
              </div>
              <div className="top-bar-right">
                <ul className="menu">
                  <li><button id="login-button"  className="hollow button success" onClick={()=>{this.props.renderContent("LoginPage")}}>Login</button></li>
                  <li><button id="signup-button" className="hollow button warning" onClick={()=>{this.props.renderContent("SignupPage")}}>Signup</button></li>
                </ul>
              </div>
          </div>
        );
      }
    }

    return (
      <div>
        {renderBasedOnLogin()}
      </div>
    );
  }
}

export default Topbar;
