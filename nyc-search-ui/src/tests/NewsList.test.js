import React from 'react';
import { mount, shallow, render } from 'enzyme';

import NewsList from '../components/NewsList';
import News from '../components/News';

describe('NewsList', () => {
  it('should render news list properly', () => {
    const wrapper = shallow(<NewsList newsList={[{title: 'news1', author: 'person1'},{title: 'news2', author: 'person2'}]}/>);

    expect(wrapper.find('#news-list')).toExist();
  });

  it('should render no search result when newsList is empty', () => {
    const wrapper = mount(<NewsList newsList={[]}/>);

    expect(wrapper.find("p").instance().innerHTML).toEqual('No search results!');
  });

  it('should render two News elements when newsList has size of 2', () => {
    const wrapper = mount(<NewsList newsList={[{title: 'news1', author: 'person1'},{title: 'news2', author: 'person2'}]}/>);

    expect(wrapper.find(News)).toExist();
    expect(wrapper.find(News).length).toBe(2);
  });
});
