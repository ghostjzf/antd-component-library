---
nav:
    title: 组件库
    path: /components

group:
    title: 数据展示
    path: /components/data-view
---

维护人：[刘影](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=ppdfmuc)

# PhotoView

实现图片预览功能（可旋转下载保存）的组件

## 代码演示

```jsx
import React, { useState } from 'react';
import { PhotoView } from '@tiger/jigsaw';
import { Row, Col, Button } from 'antd';

const Test = () => {
    return (
        <Row gutter={12}>
            <Col span={12}>
                <PhotoView
                    src="https://static.tigerbbs.com/0a80e8cb0478954c0b8763b6ea591fd0"
                    name="在新页面预览"
                    mode="blank">
                    <Button type="link">点击在新页面打开</Button>
                </PhotoView>
            </Col>
            <Col span={12}>
                <PhotoView
                    src="https://static.tigerbbs.com/0a80e8cb0478954c0b8763b6ea591fd0"
                    name="我是图片"
                    downloadable={true}>
                    <Button type="primary">点击弹框预览</Button>
                </PhotoView>
            </Col>
        </Row>
    );
};

export default Test;
```

## API

### PhotoView

| 参数         | 必填 | 说明                      | 类型             | 默认值  |
| ------------ | ---- | ------------------------- | ---------------- | ------- |
| src          | Yes  | 图片地址                  | string           | -       |
| name         | No   | 图片名称                  | string           | -       |
| mode         | No   | 预览类型（弹框 / 新页面） | `modal`,`blank`; | `modal` |
| downloadable | No   | 是否可下载                | boolean          | false   |
