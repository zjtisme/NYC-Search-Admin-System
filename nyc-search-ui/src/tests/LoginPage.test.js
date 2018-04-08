import React from 'react';
import { mount, shallow, render } from 'enzyme';

import LoginPage from '../components/LoginPage';


describe('LoginPage', () => {
  it('should render log in page', () => {
    const wrapper = shallow(<LoginPage />);

    expect(wrapper.find('#login-page')).toExist();
  });

  it('should call handleLogin function when pressed login-confrim-button', () => {
    let handleLogin_spy = jest.fn();
    const wrapper = mount(<LoginPage handleLogin={handleLogin_spy}/>);
    wrapper.find("#login-confirm-button").simulate('click');
    expect(handleLogin_spy).toHaveBeenCalled();
  });
});
