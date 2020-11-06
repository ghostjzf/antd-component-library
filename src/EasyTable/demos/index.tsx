import React from 'react';
import { EasyTable } from '@tiger/jigsaw';
import {
    message,
    Form,
    Button,
    Space,
    Descriptions,
    Input,
    Select,
    Switch,
    Checkbox,
    Radio,
    InputNumber,
    DatePicker,
    TimePicker
} from 'antd';

const EasyTableDemo = () => {
    const [form] = Form.useForm();

    const columns = data => {
        

        // console.log(current)

        return [
            {
                title: "#",
                render: (...args) => {
                    const {current, pageSize} = data;
                    return (current - 1) * pageSize + args[2]
                }
            },
            { title: 'Name', dataIndex: 'name' },
            { title: 'Age', dataIndex: 'age' },
            { title: 'Height', dataIndex: 'height' },
            {
                title: 'Action',
                key: 'action',
                render: () => {
                    return (
                        <Space>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    console.log(data);
                                }}>
                                编辑
                            </Button>
                            <Button type="link" size="small">
                                删除
                            </Button>
                        </Space>
                    );
                }
            }
        ];
    };

    function onBatchHandle(data) {
        console.log(data);
        data.reload();
    }

    const options = [
        {
            name: 'text',
            label: 'Text',
            span: 24,
            children: <Input placeholder="请输入文本" />
        },
        {
            name: 'select',
            label: '下拉框',
            children: (
                <Select
                    options={[
                        { label: '小王', value: 'xiaowang' },
                        { label: '小明', value: 'xiaoming' }
                    ]}
                />
            )
        },
        {
            name: 'InputNumber',
            label: 'InputNumber',
            required: true,
            rules: [{ required: true }],
            shouldUpdate: (prevValues, currentValues) => prevValues.select !== currentValues.select,
            hide: ({ getFieldValue }) => getFieldValue('select') === 'xiaoming',
            children: <InputNumber style={{ width: '100%' }} />
        },
        {
            name: 'switch',
            label: '开关',
            initialValue: true,
            children: <Switch />
        },
        {
            name: 'checkbox',
            label: '多选',
            children: (
                <Checkbox.Group
                    options={[
                        { label: '苹果', value: 'apple' },
                        { label: '香蕉', value: 'banana' },
                        { label: '西瓜', value: 'watermelon' }
                    ]}
                />
            )
        },
        {
            name: 'radio',
            label: '单选按钮',
            children: (
                <Radio.Group
                    options={[
                        { label: '是', value: true },
                        { label: '否', value: false }
                    ]}
                />
            )
        },
        {
            name: 'datePicker',
            label: 'DatePicker',
            children: <DatePicker style={{ width: '100%' }} />
        },
        {
            name: 'dateRangePicker',
            label: 'DateRangePicker',
            children: <DatePicker.RangePicker style={{ width: '100%' }} />
        },
        {
            name: 'timePicker',
            label: 'TimePicker',
            children: <TimePicker style={{ width: '100%' }} />
        },
        {
            name: 'timeRangePicker',
            label: 'TimeRangePicker',
            children: <DatePicker.RangePicker picker="time" style={{ width: '100%' }} />
        }
    ];

    const loader = params => {
        console.log(params);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: new Array(100).fill({ name: 'xiaoming', age: 26, height: 180 }),
                    total: 100
                });
            }, 500);
        });
    };

    const extraRender = () => {
        return (
            <Descriptions title="Custom Size">
                <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official">$60.00</Descriptions.Item>
            </Descriptions>
        );
    };

    return (
        <EasyTable
            loader={loader}
            formProps={{
                form,
                initialValues: {
                    select: 'xiaoming',
                    checkbox: ['apple'],
                    radio: true
                },
                options,
                onReset: () => {
                    form.submit();
                }
            }}
            extraRender={extraRender}
            tableProps={{
                title: '标题',
                toolBarRender: data => {
                    return (
                        <>
                            <Button type="primary">创建</Button>
                            <Button onClick={() => onBatchHandle(data)}>批量操作</Button>
                        </>
                    );
                },
                columns,
                $rowSelection: true,
                $showPagination: true,
                pageSize: 10
            }}
        />
    );
};

export default EasyTableDemo;
