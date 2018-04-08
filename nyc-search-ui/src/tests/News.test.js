import React from 'react';
import { mount, shallow, render } from 'enzyme';

import News from '../components/News';

describe('News', () => {
  it('should render elements properly', () => {
    const wrapper = shallow(<News />);

    expect(wrapper.find('[data-news-display]')).toExist();
  });
});
