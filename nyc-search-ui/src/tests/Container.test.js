import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Container from '../components/Container';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';

describe('Container', () => {
  it('should render LoginPage if signal is LoginPage', () => {
    const wrapper = shallow(<Container contentToBeRendered={"LoginPage"}/>);

    wrapper.instance().renderComponents();
    expect(wrapper.find(LoginPage)).toExist();
  });

  it('should render SignupPage if signal is SignupPage', () => {
    const wrapper = shallow(<Container contentToBeRendered={"SignupPage"}/>);

    wrapper.instance().renderComponents();
    expect(wrapper.find(SignupPage)).toExist();
  });
});
