---
nav:
    title: 组件库
    path: /components

group:
    title: 其他
    path: /components/others
---

维护人：[彭翠](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=a332eji)

# orNotFilter

## 代码演示

```jsx
import React from 'react';
import { utils } from '@tiger/jigsaw';
import { Descriptions } from 'antd';

const { orNotFilter } = utils;

const orNotFilterTest = () => {
    const columns = [
        {
            title: 'isBefore',
            dataIndex: 'isBefore',
            render: text => orNotFilter(text)
        },
        {
            title: 'isAfter',
            dataIndex: 'isAfter',
            render: text => orNotFilter(text)
        },
        {
            title: 'isLarge',
            dataIndex: 'isLarge',
            render: text => orNotFilter(text)
        },
        {
            title: 'isSmall',
            dataIndex: 'isSmall',
            render: text => orNotFilter(text)
        }
    ];

    const detail = {
        isBefore: true,
        isAfter: false,
        isLarge: 1,
        isSmall: 0
    };

    return (
        <Descriptions column={2} bordered>
            {columns.map(item => (
                <Descriptions.Item span={1} label={item.title} key={item.dataIndex}>
                    {item.render(detail[item.dataIndex])}
                </Descriptions.Item>
            ))}
        </Descriptions>
    );
};

export default orNotFilterTest;
```

## API

### orNotFilter

| 参数  | 必填 | 说明                 | 类型           | 默认值 |
| ----- | ---- | -------------------- | -------------- | ------ |
| value | Yes  | 需要格式化的目标数据 | boolean,number | -      |
