import React from 'react';
import { mount, shallow, render } from 'enzyme';

import User from '../components/User';
import UserList from '../components/UserList';

describe('UserList', () => {
  it('should render users table correctly', () => {
    const wrapper = mount(<UserList usersList={[{id:1, userName: 'tony', password: '123'}, {id:2, userName: 'zhang', password: '456'}]}
      searchText={''}/>);

    expect(wrapper.find('#user-list')).toExist();
  });

  it('should render two Users elements when uersList has size of 2', () => {
    const wrapper = mount(<UserList usersList={[{id:1, userName: 'tony', password: '123'}, {id:2, userName: 'zhang', password: '456'}]}
      searchText={''}/>)

    expect(wrapper.find(User)).toExist();
    expect(wrapper.find(User).length).toBe(2);
  });
});
