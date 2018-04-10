import React from 'react';
import { mount, shallow, render } from 'enzyme';

import AddUserPage from '../components/AddUserPage';

describe('AddUserPage', () => {
  it('should render adduser-page properly', () => {
    const wrapper = shallow(<AddUserPage />);

    expect(wrapper.find('#adduser-page')).toExist();
  });

  it('should call handleCreateUser when pressed adduser-confirm-button', () => {
    let handleCreateUser_spy = jest.fn();
    const wrapper = mount(<AddUserPage handleCreateUser={handleCreateUser_spy}/>);
    wrapper.find("#adduser-confirm-button").simulate('click');
    expect(handleCreateUser_spy).toHaveBeenCalled();
  });
});
