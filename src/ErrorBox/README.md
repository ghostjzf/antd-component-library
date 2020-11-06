---
nav:
    title: 组件库
    path: /components

group:
    title: 反馈
    path: /components/response
    order: 5
---

维护人：[彭翠](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=a332eji)

# ErrorBox

用于错误处理的组件

## 代码演示

```jsx
import React from 'react';
import { ErrorBox } from '@tiger/jigsaw';
import { message } from 'antd';

const error = '404, Sorry, the page you visited does not exist.';

const getList = () => {
    message.error(error);
};

export default () => <ErrorBox title="数据获取失败" error={error} onClick={() => getList()} />;
```

## API

### ErrorBox

| 参数    | 必填 | 说明                               | 类型         | 默认值 |
| ------- | ---- | ---------------------------------- | ------------ | ------ |
| title   | No   | 错误信息(一般是自己定义的)         | string       | 无     |
| error   | No   | 具体错误(一般是后端返回的具体错误) | Error,string | 无     |
| onClick | No   | 点击 Retry 按钮回调                | Function     | 无     |
