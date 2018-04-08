import React from 'react';
import { mount, shallow, render } from 'enzyme';

import SignupPage from '../components/SignupPage';

describe('SignupPage', () => {
  it('should render signup-page properly', () => {
    const wrapper = shallow(<SignupPage />);

    expect(wrapper.find('#signup-page')).toExist();
  });

  it('should call handleSignup when pressed signup-confirm-button', () => {
    const handleSignup_spy = jest.fn();
    const wrapper = mount(<SignupPage handleSignup={handleSignup_spy}/>);
    wrapper.find('#signup-confirm-button').simulate('click');
    expect(handleSignup_spy).toHaveBeenCalled();
  });
});
