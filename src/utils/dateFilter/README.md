---
nav:
    title: 组件库
    path: /components

group:
    title: 其他
    path: /components/others
---

维护人：[彭翠](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=a332eji)

# dateFilter

日期格式转换

## 代码演示

```jsx
import React from 'react';
import { utils } from '@tiger/jigsaw';
import { Descriptions } from 'antd';

const { dateFilter } = utils;

const formatDate = () => {
    const columns = [
        {
            title: '美国时区',
            dataIndex: 'createdAt',
            render: text => dateFilter(text, 'YYYY-MM-DD HH:mm:ss zz', 'us')
        },
        {
            title: '本地时区',
            dataIndex: 'updatedAt',
            render: text => dateFilter(text)
        }
    ];

    const detail = {
        createdAt: 1593671148000,
        updatedAt: 1993671148000
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

export default formatDate;
```

## API

### dateFilter

| 参数           | 必填 | 说明           | 类型   | 默认值                   |
| -------------- | ---- | -------------- | ------ | ------------------------ |
| date           | Yes  | 时间戳         | number | -                        |
| format         | No   | format 格式    | string | 'YYYY-MM-DD HH:mm:ss zz' |
| customTimeZone | No   | 自定义展示时区 | string | -                        |
