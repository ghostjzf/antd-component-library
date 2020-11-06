import React from 'react';
import { mount } from 'enzyme';
// import sinon from 'sinon';

import PhotoView from '../index';

describe('<PhotoView />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(
            <PhotoView
                src="https://static.tigerbbs.com/0a80e8cb0478954c0b8763b6ea591fd0"
                name="我是非Blob类型图片地址"
                openPreview={true}
                previewModalConfig={{ width: 700 }}
            />
        );

        expect(wrapper.props().openPreview).toEqual(true);
        wrapper.setProps({ openPreview: false });
        expect(wrapper.props().openPreview).toEqual(false);
    });

    it('test click event', () => {
        const wrapper = mount(
            <PhotoView
                src="https://static.tigerbbs.com/0a80e8cb0478954c0b8763b6ea591fd0"
                name="我是非Blob类型图片地址"
                openPreview={true}
                previewModalConfig={{ width: 700 }}
            />
        );
        expect(wrapper.find('.com-photo-view-desc')).toHaveLength(1);
        expect(wrapper.find('img')).toHaveLength(1);
    });
});
