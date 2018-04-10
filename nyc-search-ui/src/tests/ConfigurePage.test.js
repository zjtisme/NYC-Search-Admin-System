import React from 'react';
import { mount, shallow, render } from 'enzyme';

import ConfigurePage from '../components/ConfigurePage';

describe('ConfigurePage', () => {
  it('should render configure page', () => {
    const wrapper = mount(<ConfigurePage identification={'user'}/>);

    expect(wrapper.find('#configure-page')).toExist();
  });

  it('should render firstname input', () => {
    const wrapper = mount(<ConfigurePage identification={'user'}/>);

    expect(wrapper.find('#configure-firstname')).toExist();
  });

  it('should respond to change event and change the state when firstname field got changed', () => {
    const wrapper = mount(<ConfigurePage firstName={"Tony"} identification={'user'}/>);

    wrapper.find('#configure-firstname').simulate('change', {target: {
      name: 'firstName', value: 'updated firstname'
    }});

    expect(wrapper.instance().state.updatedUser.firstName).toEqual('updated firstname');
  });

  test('should call handleUpdate function when confirm button has been pressed', () => {
    let handleUpdate_spy = jest.fn();
    const wrapper = mount(<ConfigurePage handleUpdate={handleUpdate_spy} identification={'user'}/>);
    wrapper.find('#configure-confirm-button').simulate('click');
    expect(handleUpdate_spy).toHaveBeenCalled();
  });
});
