import './matchMedia.mock';

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Input, Typography, Button } from 'antd';

import DetailList from '../index';

const { Title } = Typography;

const items = [
    {
        label: '姓名',
        dataIndex: 'name'
    },
    {
        label: '性别',
        dataIndex: 'sex'
    },
    {
        label: '年龄',
        dataIndex: 'age'
    },
    {
        label: '学校',
        dataIndex: 'school',
        emptyText: 'No Data'
    },
    {
        label: '专业',
        dataIndex: 'career',
        render: text => {
            return `${text}(统招)`;
        }
    },
    {
        label: '地址',
        dataIndex: 'address'
    },
    {
        label: '邮编',
        render: () => {
            return <Input className="test-detail-list-input" placeholder="请输入" />;
        }
    }
];

const dataSource = {
    name: '老虎FED',
    sex: '不详',
    age: 7,
    address: '冠捷大厦18层',
    career: '软件工程'
};

describe('<DetailList />', () => {
    it('check render right or not', () => {
        const wrapper = mount(<DetailList className="test-detail-list-render" items={items} dataSource={dataSource} />);
        expect(wrapper.hasClass('test-detail-list-render')).toEqual(true);
        expect(wrapper.find('.test-detail-list-render .ant-descriptions-item')).toHaveLength(7);
        expect(
            wrapper
                .find('.test-detail-list-render .ant-descriptions-item .ant-descriptions-item-label')
                .first()
                .props().children
        ).toEqual('姓名');
        expect(
            wrapper
                .find('.test-detail-list-render .ant-descriptions-item .ant-descriptions-item-content')
                .first()
                .props().children
        ).toEqual('老虎FED');
        expect(
            wrapper
                .find('.test-detail-list-render .ant-descriptions-item .ant-descriptions-item-label')
                .last()
                .props().children
        ).toEqual('邮编');
        expect(
            wrapper
                .find('.test-detail-list-render .ant-descriptions-item .ant-descriptions-item-content')
                .last()
                .children()
                .hasClass('test-detail-list-input')
        ).toEqual(true);
        wrapper.unmount();
    });

    it('check set props', () => {
        const wrapper = mount(<DetailList className="test-detail-list-props" items={items} dataSource={dataSource} />);
        expect(wrapper.find('.test-add-extra').length === 0).toEqual(true);
        wrapper.setProps({ extra: <Title className="test-add-extra">添加extra</Title> });
        expect(wrapper.find('.test-add-extra').length >= 0).toEqual(true);
        expect(wrapper.find('.test-add-cancel-button').length === 0).toEqual(true);
        wrapper.setProps({ extraBtns: <Button className="test-add-cancel-button">Cancel</Button> });
        expect(wrapper.find('.test-add-cancel-button').length >= 0).toEqual(true);
        expect(wrapper.props().okText).toEqual('Ok');
        wrapper.setProps({ okText: 'Test Change Ok Text' });
        expect(wrapper.props().okText).toEqual('Test Change Ok Text');
        expect(wrapper.props().cancelText).toEqual('Cancel');
        wrapper.setProps({ cancelText: 'Test Change Cancel Text' });
        expect(wrapper.props().cancelText).toEqual('Test Change Cancel Text');
        expect(wrapper.props().btnPosition).toEqual('right');
        wrapper.setProps({ btnPosition: 'middle' });
        expect(wrapper.props().btnPosition).toEqual('middle');
    });

    it('simulates onOk events', () => {
        const mockCallBack = sinon.spy();
        const wrapper = mount(
            <DetailList
                className="test-detail-list-simulates"
                items={items}
                dataSource={dataSource}
                onOk={mockCallBack}
            />
        );
        expect(
            wrapper
                .find('.test-detail-list-simulates .ant-btn-primary')
                .first()
                .children()
                .containsMatchingElement([<span>Ok</span>])
        ).toEqual(true);
        wrapper
            .find('.test-detail-list-simulates .ant-btn-primary')
            .first()
            .simulate('click');
        expect(mockCallBack).toHaveProperty('callCount', 1);
    });
});
