import React from 'react';
import { mount, shallow, render } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import AdminPage from '../components/AdminPage';

describe('AdminPage', () => {
  it('should render admin-page properly', () => {
    const wrapper = shallow(<AdminPage/>);

    expect(wrapper.find('#admin-page')).toExist();
  });

  it('should receive users data properly', () => {
    var mock = new MockAdapter(axios);
    const resp = {data: [{id:1, userName: 'tony', password: '123'}, {id:2, userName: 'zhang', password: '456'}]};
    mock.onGet(process.env.REACT_APP_HOST + "/users").reply(200, resp.data);
    const wrapper = mount(<AdminPage/>);
    wrapper.instance().componentDidMount().then(data => {
      expect(wrapper.instance().state.usersList.length).toEqual(2);
      expect(wrapper.instance().state.usersList[0].userName).toEqual('tony');
    });
  });
});
