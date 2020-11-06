---
nav:
    title: 组件库
    path: /components

group:
    title: 其他
    path: /components/others
---

维护人：[邵婉如](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=lge2com)

# copyMe

复制文本到剪贴板

## 代码演示

```jsx
import React from 'react';
import { utils } from '@tiger/jigsaw';
import { Button, message } from 'antd';

const { copyMe } = utils;

const handleCopyMe = text => {
    if (copyMe(text)) {
        message.success('复制手机号成功');
    }
};

export default () => (
    <Button type="promary" onClick={() => handleCopyMe('182****4675')}>
        复制手机号
    </Button>
);
```

## API

### copyMe

| 参数 | 必填 | 说明                 | 类型   | 默认值 |
| ---- | ---- | -------------------- | ------ | ------ |
| text | Yes  | 要复制到剪贴板的文本 | string | -      |
