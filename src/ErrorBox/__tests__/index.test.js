import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import ErrorBox from '../index';

describe('<ErrorBox />', () => {
    it('allows us to set title', () => {
        const wrapper = mount(<ErrorBox title="test" />);
        expect(wrapper.props().title).toEqual('test');
        wrapper.setProps({ title: 'testagain' });
        expect(wrapper.props().title).toEqual('testagain');
    });

    it('allows us to set error', () => {
        const wrapper = mount(<ErrorBox error={new Error('an error')} />);
        expect(wrapper.props().error.message).toEqual('an error');
    });

    it('simulates click events', () => {
        const mockCallBack = sinon.spy();
        const wrapper = shallow(<ErrorBox onClick={mockCallBack} />);
        wrapper.find('.error-btn').simulate('click');
        expect(mockCallBack).toHaveProperty('callCount', 1);
    });
});
