import React from 'react';
import { mount, shallow, render } from 'enzyme';

import User from '../components/User';

describe('User', ()=> {
  it('should render elements properly', () => {
    const wrapper = shallow(<User />);

    expect(wrapper.find('[data-users-display]')).toExist();
  });
});
