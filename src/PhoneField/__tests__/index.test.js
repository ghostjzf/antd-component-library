import './matchMedia.mock';

import React from 'react';
import { Form } from 'react-antd-formutil';
import { mount } from 'enzyme';

import PhoneField from '../index';

describe('<PhoneField />', () => {
    it('allows us to set params', () => {
        const wrapper = mount(
            <Form>
                <PhoneField
                    telCodeName="tel_code"
                    phoneName="phone"
                    defaultTelCodeValue="86"
                    defaultPhoneValue="18600191338"
                    language="en_US"
                    required="请输入"
                    telCodePlaceholder="区号"
                    phonePlaceholder="手机号"
                />
            </Form>
        );
        expect(wrapper.children().props().language).toEqual('en_US');
        expect(wrapper.children().props().required).toEqual('请输入');
        expect(wrapper.children().props().telCodeName).toEqual('tel_code');
        expect(wrapper.children().props().phoneName).toEqual('phone');
        expect(wrapper.children().props().defaultTelCodeValue).toEqual('86');
        expect(wrapper.children().props().defaultPhoneValue).toEqual('18600191338');
        expect(wrapper.children().props().telCodePlaceholder).toEqual('区号');
        expect(wrapper.children().props().phonePlaceholder).toEqual('手机号');
        expect(wrapper.find('.jigsaw-phone-field-telcode-value').text()).toEqual('+86');
        expect(wrapper.find('.jigsaw-phone-field-input input').prop('value')).toEqual('18600191338');
    });
});
