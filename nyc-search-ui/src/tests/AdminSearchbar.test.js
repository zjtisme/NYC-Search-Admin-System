import React from 'react';
import { mount, shallow, render } from 'enzyme';

import AdminSearchbar from '../components/AdminSearchbar';

describe('AdminSearchbar', () => {
  it('should render admin-search-bar properly', () => {
    const wrapper = shallow(<AdminSearchbar/>);

    expect(wrapper.find('#admin-search-bar')).toExist();
  });

  it('should call handleSearch when typed something in search bar', () => {
    let handleSearch_spy = jest.fn();
    const wrapper = mount(<AdminSearchbar handleSearch={handleSearch_spy}/>);
    wrapper.find("#admin-search-bar").simulate('change');
    expect(handleSearch_spy).toHaveBeenCalled();
  });
});
