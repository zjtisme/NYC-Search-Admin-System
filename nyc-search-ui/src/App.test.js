import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import Topbar from './components/Topbar';
import Container from './components/Container';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders Topbar', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(Topbar)).toExist();
});

it('renders Container', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(Container)).toExist();
});

it('should render different content based on actual needs', () => {
  const wrapper = shallow(<App />);
  wrapper.instance().renderContent('LoginPage');
  expect(wrapper.instance().state.contentToBeRendered).toEqual('LoginPage');
});

describe('App axios functions', () => {
  it('should let user log in if input valid username and password', ()=>{
    const wrapper = shallow(<App />);
    var mock = new MockAdapter(axios);
    const resp = {data: [{id: 1, userName: 'zjtisme', password: '1234',
      firstName: 'Tony', lastName: 'Zhang', gender: 'Male', email: 'jintai@gmail.com',
      phoneNumber: '1234567890', birthday: '1990-09-09'}]};
    mock.onGet('/username/zjtisme').reply(200, resp.data);

    wrapper.instance().handleLogin('zjtisme', '1234').then(data => {
      expect(wrapper.instance().state.userId).toEqual(1);
      expect(wrapper.instance().state.gender).toEqual('Male');
    });
  });

  it('should let user sign up', () => {
    const wrapper = shallow(<App />);
    var mock = new MockAdapter(axios);
    const newUser = {'userName': 'zjtisme', 'password': '1234',
      'firstName': 'Tony', 'lastName': 'Zhang', 'gender': 'Male', 'email': 'jintai@gmail.com',
      'phoneNumber': '1234567890', 'birthday': '1990-09-09'};

    const resp = {data: [{id: 1, userName: 'zjtisme', password: '1234',
      firstName: 'Tony', lastName: 'Zhang', gender: 'Male', email: 'jintai@gmail.com',
      phoneNumber: '1234567890', birthday: '1990-09-09'}]};
      mock.onPost('/', newUser).reply(200, resp.data[0]);

      wrapper.instance().handleSignup('zjtisme', '1234', '1234', 'Tony', 'Zhang', 'Male', 'jintai@gmail.com', '1234567890', '1990-09-09').then(data => {
        expect(wrapper.instance().state.userId).toEqual(1);
        expect(wrapper.instance().state.gender).toEqual('Male');
      });
  });
});
