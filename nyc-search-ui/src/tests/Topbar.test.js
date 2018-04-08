import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Topbar from '../components/Topbar';

describe('Topbar', () => {
  it('should render public page when user is not log in', () => {
    const wrapper = shallow(<Topbar login={false} userName={'zjtisme'}/>);

    expect(wrapper.find('#public-welcome-text')).toExist();
    expect(wrapper.find('#private-welcone-text')).not.toExist();
  });

  it('should render private page when user is log in', () => {
    const wrapper = shallow(<Topbar login={true} userName={'zjtisme'}/>);

    expect(wrapper.find('#public-welcome-text')).not.toExist();
    expect(wrapper.find('#private-welcome-text')).toExist();
  });
});
