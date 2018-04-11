import React, { Component } from 'react';
import axios from 'axios';
import SecureLS from 'secure-ls';

import Topbar from './components/Topbar';
import Container from './components/Container';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.ls = new SecureLS();
    const usrInfo = this.ls.get('login');
    if(usrInfo.length === 0) {
      this.state = {
        login: false,
        identification: 'user',
        userId: 0,
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phoneNumber: "",
        birthday: "",
        contentToBeRendered: "HomePage",
        loginErrorMSG: "",
        signupErrorMSG: "",
        configureErrorMSG: ""
      };
    } else {
      this.state = JSON.parse(usrInfo);
    }
  }

  renderContent = (content) => {
    this.setState({...this.state, contentToBeRendered: content});
  }

  handleLogin = async (username, password, identification) => {
    if(username.length === 0 || password.length === 0) {
      this.setState({...this.state, loginErrorMSG: "Username or password cannot be empty!"});
      return;
    }
    try {
      if(identification === 'user') {
        const response = await axios.get(process.env.REACT_APP_HOST+`/users/username/${username}`);
        const candArr = response.data;
        if(candArr.length === 0) {
          this.setState({...this.state, loginErrorMSG: "Cannot find such user, please sign up first!"});
          return;
        }

        const cand = candArr[0];
        const checkPassRes = await axios.get(process.env.REACT_APP_HOST+`/users/checkpassword/${cand.id}/${password}`);
        if(!checkPassRes.data) {
            this.setState({...this.state, loginErrorMSG: 'Error username or password, please try again!'});
          } else {
            this.setState({...this.state, login: true, identification: 'user', userName: cand['userName'], userId: cand['id'],
            password: cand['password'], firstName: cand['firstName'], lastName: cand['lastName'], gender: cand['gender'],
            email: cand['email'], phoneNumber: cand['phoneNumber'], birthday: cand['birthday'], contentToBeRendered: 'HomePage', loginErrorMSG: ""});
            this.ls.set('login', JSON.stringify(this.state));
          }
      } else {
        const response = await axios.get(process.env.REACT_APP_HOST+`/admins/username/${username}`);
        const candArr = response.data;
        if(candArr.length === 0) {
          this.setState({...this.state, loginErrorMSG: "Cannot find such admin, please sign up first!"});
          return;
        }

        const cand = candArr[0];
        const checkPassRes = await axios.get(process.env.REACT_APP_HOST+`/admins/checkpassword/${cand.id}/${password}`);
        if(!checkPassRes.data) {
            this.setState({...this.state, loginErrorMSG: 'Error username or password, please try again!'});
          } else {
            this.setState({...this.state, login: true, identification: 'admin', userName: cand['userName'], userId: cand['id'],
            password: cand['password'], firstName: '', lastName: '', gender: '',
            email: '', phoneNumber: '', birthday: '', contentToBeRendered: 'AdminPage', loginErrorMSG: ""});
            this.ls.set('login', JSON.stringify(this.state));
          }
      }

    } catch (error){
      this.setState({...this.state, loginErrorMSG: 'Cannot connect to server...'});
      console.log('Error Login!')
      console.log(error)
    }
  }

  handleSignup = async (username, pass1, pass2, firstname, lastname, gender, email, phonenumber, birthday, identification) => {
    if(identification==='user' && (username.length === 0 || pass1.length === 0 || pass2.length === 0 || firstname.length === 0 || lastname.length === 0|| gender.length === 0 || email.length === 0 || phonenumber.length === 0 || birthday.length === 0)) {
        this.setState({...this.state, signupErrorMSG: 'All fields are required!'});
        return;
    } else if(identification === 'admin' && (username.length === 0 || pass1.length === 0 || pass2.length === 0)) {
        this.setState({...this.state, signupErrorMSG: 'All fields are required!'});
        return;
    }

    if(pass1 !== pass2) {
      this.setState({...this.state, signupErrorMSG: "Two passwords didn't match!"});
      return;
    }

    try {
      if(identification === 'user') {
          const newUser = {
            'userName': username,
            'password': pass1,
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
            this.setState({...this.state, login: true, identification: 'user', userId: data['id'], userName: data['userName'],
              password: data['password'], firstName: data['firstName'], lastName: data['lastName'],
              gender: data['gender'], email: data['email'], phoneNumber: data['phoneNumber'], birthday: data['birthday'],
              contentToBeRendered: 'HomePage', signupErrorMSG: ''});
            this.ls.set('login', JSON.stringify(this.state));
          } else {
            this.setState({...this.state, signupErrorMSG: 'Error occurs, the status code is: ' + response.status});
          }
        } else {
          const newAdmin = {
            'userName': username,
            'password': pass1
          };

          const response = await axios.post(process.env.REACT_APP_HOST+'/admins/', newAdmin);
          if(response.status === 200) {
            const data = response.data;
            this.setState({...this.state, login: true, identification: 'admin', userId: data['id'], userName: data['userName'],
              password: data['password'], firstName: '', lastName: '',
              gender: '', email: '', phoneNumber: '', birthday: '',
              contentToBeRendered: 'AdminPage', signupErrorMSG: ''});
            this.ls.set('login', JSON.stringify(this.state));
          } else {
            this.setState({...this.state, signupErrorMSG: 'Error occurs, the status code is: ' + response.status});
          }
        }
    } catch (error) {
      this.setState({...this.state, signupErrorMSG: 'Cannot connect to server!'});
      console.log('Error signing up!');
      console.log(error);
    }
  }

  handleLogout = () => {
    const originalState = {
      login: false,
      identification: 'user',
      userId: 0,
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phoneNumber: "",
      birthday: "",
      contentToBeRendered: "HomePage",
      loginErrorMSG: "",
      signupErrorMSG: "",
      configureErrorMSG: ""
    };

    this.setState(originalState);
    this.ls.remove('login');
  }

  handleUpdate = async (username, pass1, pass2, firstname, lastname, gender, email, phonenumber, birthday, identification) => {
    if(identification==='user' && (username.length === 0 || pass1.length === 0 || pass2.length === 0 || firstname.length === 0 || lastname.length === 0|| gender.length === 0 || email.length === 0 || phonenumber.length === 0 || birthday.length === 0)) {
        this.setState({...this.state, configureErrorMSG: 'All fields are required!'});
        return;
      } else if (identification === 'admin' && (username.length === 0 || pass1.length === 0 || pass2.length === 0 )) {
        this.setState({...this.state, configureErrorMSG: 'All fields are required!'});
        return;
      }

    if(pass1 !== pass2) {
      this.setState({...this.state, configureErrorMSG: "Two passwords didn't match!"});
      return;
    }

    try {
      if(identification === 'user') {
        const updatedUser = {
          'userName': username,
          'password': pass1,
          'firstName': firstname,
          'lastName': lastname,
          'gender': gender,
          'email': email,
          'phoneNumber': phonenumber,
          'birthday': birthday
        };

        const response = await axios.patch(process.env.REACT_APP_HOST+`/users/${this.state.userId}`, updatedUser);
        if(response.status === 200) {
          const data = response.data;
          this.setState({...this.state, login: true, identification:'user', userId: data['id'], userName: data['userName'],
            password: data['password'], firstName: data['firstName'], lastName: data['lastName'],
            gender: data['gender'], email: data['email'], phoneNumber: data['phoneNumber'], birthday: data['birthday'],
            contentToBeRendered: 'HomePage', configureErrorMSG: ''});
          this.ls.set('login', JSON.stringify(this.state));
        } else {
          this.setState({...this.state, configureErrorMSG: 'Error occurs, the status code is: ' + response.status});
        }
    } else {
        const updatedAdmin = {
          'userName': username,
          'password': pass1
        };

        const response = await axios.patch(process.env.REACT_APP_HOST+`/admins/${this.state.userId}`, updatedAdmin);
        if(response.status === 200) {
          const data = response.data;
          this.setState({...this.state, login: true, identification:'admin', userId: data['id'], userName: data['userName'],
            password: data['password'], firstName: '', lastName: '',
            gender: '', email: '', phoneNumber: '', birthday: '',
            contentToBeRendered: 'AdminPage', configureErrorMSG: ''});
          this.ls.set('login', JSON.stringify(this.state));
        } else {
          this.setState({...this.state, configureErrorMSG: 'Error occurs, the status code is: ' + response.status});
        }

    }

    } catch (error) {
      this.setState({...this.state, configureErrorMSG: 'Cannot connect to server!'});
      console.log('Error updating account info!');
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Topbar login={this.state.login} userName={this.state.userName} renderContent={this.renderContent}
          handleLogout={this.handleLogout} identification={this.state.identification}/>
        <Container handleLogin={this.handleLogin}  handleSignup={this.handleSignup}
          {...this.state} handleUpdate={this.handleUpdate}/>
      </div>
    );
  }
}

export default App;
