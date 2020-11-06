---
nav:
    title: 组件库
    path: /components

group:
    title: 通用
    path: /components/common
    order: 1
---

维护人：[刘洪燕](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=ppdfmuc)

# ButtonGroup

多个按钮组实现部分包裹下拉，主要场景是用于表格的按钮组

## 代码演示

```jsx
import React, { useState } from 'react';
import { ButtonGroup } from '@tiger/jigsaw';
import { Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const OperateButton = () => {
    const [size, setSize] = useState('middle');
    const [count, setCount] = useState(8);
    const [hidden, setHidden] = useState(false);
    const [loading, setLoading] = useState(true);

    const btns = [
        {
            children: '展示全部',
            onClick: () => {
                setCount(12);
            }
        },
        {
            children: '恢复默认',
            onClick: () => {
                setSize('middle');
                setCount(8);
                setHidden(false);
            }
        },
        {
            children: 'Primary Button',
            type: 'primary',
            onClick: () => {
                console.log('Primary Button');
            }
        },
        {
            children: 'Default Button',
            onClick: () => {
                console.log('Default Button');
            }
        },
        {
            children: 'Dashed Button',
            type: 'dashed',
            onClick: () => {
                console.log('Dashed Button');
            }
        },
        {
            children: 'Link Button',
            type: 'link',
            onClick: () => {
                console.log('Link Button');
            }
        },
        {
            type: 'primary',
            shape: 'circle',
            icon: <SearchOutlined />,
            onClick: () => {
                console.log('Circle Button');
            }
        },
        {
            children: 'Loading Button',
            loading: true,
            onClick: () => {
                console.log('Loading Button');
            }
        },
        {
            children: '隐藏',
            hidden: hidden,
            onClick: () => {
                setHidden(true);
                console.log('隐藏');
            }
        },
        {
            children: '二次确认',
            confirmText: '确认删除？',
            onClick: () => {
                console.log('二次确认');
            }
        },
        {
            children: '小号置灰',
            type: 'primary',
            size: 'small',
            disabled: true,
            onClick: () => {
                console.log('小号置灰');
            }
        }
    ];

    const dropDownBtnProps = {
        type: 'primary',
        size: 'large'
    };

    return (
        <div>
            <ButtonGroup count={count} btns={btns} moreText="更多操作" dropDownBtnProps={dropDownBtnProps} />
        </div>
    );
};

export default OperateButton;
```

## API

### ButtonGroup

| 参数             | 必填 | 说明                       | 类型                                                       | 默认值      |
| ---------------- | ---- | -------------------------- | ---------------------------------------------------------- | ----------- |
| btns             | Yes  | 按钮组配置                 | Array &lt;BtnItem&gt;                                      | -           |
| count            | No   | 展示个数，其余包裹在下拉中 | number                                                     | 3           |
| moreText         | No   | 下拉按钮文案               | string                                                     | more        |
| dropDownBtnProps | No   | 下拉按钮配置               | [详情可参考](https://ant.design/components/button-cn/#API) | link middle |

### BtnItem

| 参数        | 必填 | 说明                                 | 类型             | 默认值 |
| ----------- | ---- | ------------------------------------ | ---------------- | ------ |
| children    | Yes  | 按钮内容                             | React.ReactNode  | -      |
| onClick     | No   | 按钮触发事件                         | (e: any) => void | -      |
| hidden      | No   | 按钮是否隐藏                         | boolean          | false  |
| disabled    | No   | 按钮是否置灰                         | boolean          | false  |
| confirmText | No   | 二次确认的文案，若没有则不走二次确认 | string           | -      |

[详情可参考](https://ant.design/components/button-cn/#API)
