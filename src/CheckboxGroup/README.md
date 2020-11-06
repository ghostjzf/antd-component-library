---
nav:
    title: 组件库
    path: /components

group:
    title: 数据录入
    path: /components/data-input
    order: 3
---

维护人：[刘震](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=easonzen)

# CheckboxGroup

复选框（含有全选功能）

## 代码演示

```jsx
/**
 * title: 基本用法
 * desc: CheckboxGroup基本用法
 */
import React from 'react';
import { CheckboxGroup } from '@tiger/jigsaw';

const options = ['Apple', 'Pear', 'Orange'];

const BasicExample = () => {
    return <CheckboxGroup value={options} options={options} />;
};

export default BasicExample;
```

```jsx
/**
 * title: 表单
 * desc: 在表单中使用CheckboxGroup
 */
import React, { Fragment } from 'react';
import { CheckboxGroup } from '@tiger/jigsaw';
import { Form } from 'antd';

const options = [
    { label: '政府职员', value: 'goverment' },
    { label: '私营企业', value: 'enterprise' },
    { label: '外企', value: 'foreign', disabled: true }
];

const FormExample = () => {
    const [form] = Form.useForm();

    return (
        <Fragment>
            <Form form={form}>
                <Form.Item name="career" label="职业">
                    <CheckboxGroup options={options} />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => {
                        return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
                    }}
                </Form.Item>
            </Form>
        </Fragment>
    );
};

export default FormExample;
```

## API

### CheckboxGroup

| 参数         | 必填 | 说明                                                     | 类型                       | 默认值 |
| ------------ | ---- | -------------------------------------------------------- | -------------------------- | ------ |
| defaultValue | No   | 默认选中的选项                                           | string[]                   | []     |
| disabled     | No   | 整组失效                                                 | boolean                    | false  |
| name         | No   | CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 | string                     | -      |
| options      | Yes  | 指定可选项                                               | string[], CheckboxOption[] | []     |
| value        | No   | 指定选中的选项                                           | string[]                   | -      |
| onChange     | No   | 变化时回调函数                                           | function(checkedList)      | -      |

### CheckboxOption

| 参数     | 必填 | 说明              | 类型    | 默认值 |
| -------- | ---- | ----------------- | ------- | ------ |
| label    | Yes  | checkbox 显示名称 | string  | -      |
| value    | Yes  | checkbox 值       | string  | -      |
| disabled | No   | 失效状态          | boolean | false  |
