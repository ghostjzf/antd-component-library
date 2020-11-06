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

# PhoneField

可以选择手机区号填写手机号的受控组件

## 代码演示

```jsx
import React from 'react';
import { PhoneField } from '@tiger/jigsaw';
import { withForm } from 'react-antd-formutil';
import { Button, message, Space, Form } from 'antd';

const PhoneFieldForm = props => {
    const { $formutil } = props;
    const { $params, $invalid, $getFirstError, $reset } = $formutil;

    const handleSubmit = () => {
        if ($invalid) {
            message.error($getFirstError());

            return;
        }

        message.success('提交成功');
    };

    const handleReset = () => {
        $reset();
    };

    return (
        <Form>
            <PhoneField
                label="手机号"
                telCodeName="tel_code"
                phoneName="phone"
                required="请输入手机号和区号"
                defaultTelCodeValue="86"
                defaultPhoneValue="18627387654"
                telCodePlaceholder="区号"
                phonePlaceholder="请输入手机号"
                itemProps={{ required: true }}
                language="en_US"
            />
            <Space>
                <Button type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button type="danger" onClick={handleReset}>
                    Reset
                </Button>
            </Space>
            <div style={{ marginTop: 20 }}>{JSON.stringify($params, null, 2)}</div>
        </Form>
    );
};

export default withForm(PhoneFieldForm);
```

## API

### PhoneField

| 参数                | 必填 | 说明                                 | 类型           | 默认值 |
| ------------------- | ---- | ------------------------------------ | -------------- | ------ |
| telCodeName         | Yes  | 地区码表单字段名称                   | string         | -      |
| phoneName           | Yes  | 手机号表单字段名称                   | string         | -      |
| defaultTelCodeValue | No   | 地区码默认值                         | string, number | -      |
| defaultPhoneValue   | No   | 手机号默认值                         | string, number | -      |
| telCodePlaceholder  | No   | 地区码提示语                         | string         | -      |
| phonePlaceholder    | No   | 手机号提示语                         | string         | -      |
| required            | No   | 错误提示信息，若不设置则不会进行校验 | string         | -      |
| language            | No   | 国际化，语言设置                     | string         | -      |

注意：PhoneField 组件外部需要 formutil 组件包裹，为 PhoneField 提供表单校验、表单收集等功能

其他参数配置参考[react-antd-formutil](https://www.npmjs.com/package/react-antd-formutil)
