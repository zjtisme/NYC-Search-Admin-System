import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Searchbar from '../components/Searchbar';

describe('Searchbar', () => {
  it('should render search-bar and search-confirm-button', () => {
    const wrapper = shallow(<Searchbar />);

    expect(wrapper.find('#search-bar')).toExist();
    expect(wrapper.find('#search-confirm-button')).toExist();
  });

  it('should call handleSearch when pressed the search-confirm-button', () => {
    const handleSearch_spy = jest.fn();
    const wrapper = mount(<Searchbar handleSearch={handleSearch_spy}/>);

    wrapper.find('#search-bar').instance().value = "text";
    wrapper.find('#search-confirm-button').simulate('click');
    expect(handleSearch_spy).toHaveBeenCalled();
  });
});
