import React from 'react';
import { mount, shallow, render } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import HomePage from '../components/HomePage';

describe('HomePage', () => {
  it('should render home page', () => {
    const wrapper = shallow(<HomePage />);

    expect(wrapper.find('#home-page')).toExist();
  });

  it('should update state after finishing handle search', () => {
    const wrapper = shallow(<HomePage />);
    var mock = new MockAdapter(axios);
    const resp = {data: [{title: 'news1', author: 'person1'},{title: 'news2', author: 'person2'}]};
    mock.onGet(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$$app_token=GuDqVUt8KjD9xVjZRINRk4Kjh&$q=test&$order=end_date DESC&$limit=50`).reply(200, resp.data);

    wrapper.instance().handleSearch('test').then(data => {
      expect(wrapper.instance().state.newsList.length).toEqual(2);
      expect(wrapper.instance().state.newsList[0].title).toEqual('news1');
    });
  });
});
