---
nav:
    title: 组件库
    path: /components

group:
    title: 其他
    path: /components/others
---

维护人：[刘影](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=ppdfmuc)

# previewImg

实现多图左右切换预览

## 代码演示

```jsx
import React, { useEffect } from 'react';
import { utils } from '@tiger/jigsaw';
import { Row, Col, Button } from 'antd';

const { previewImg } = utils;

const Test = () => {
    const getData = () => {
        setTimeout(() => {
            const img = new Image();
            img.src = 'https://static.tigerbbs.com/8b629be1dc3c721f704045e68e38d2c9';
            img.classList.add('preview-img');
            img.setAttribute('style', 'width: 300px; height: 150px');
            document.getElementById('last').appendChild(img);
        }, 2000);
    };

    useEffect(() => {
        previewImg('.preview-img', '.preview-delegation');

        getData();
    }, []);

    return (
        <div className="preview-delegation">
            <Row gutter={12}>
                <Col span={12}>
                    <img
                        src="https://static.tigerbbs.com/b215368f7664f23b2014a8bd3ba77dd3"
                        className="preview-img"
                        alt="我是闻人"
                        style={{ width: 300, height: 150 }}
                    />
                </Col>
                <Col span={12}>
                    <img
                        src="https://static.tigerbbs.com/a0e6f28a84d1f84aa454cc7eb9b41a06"
                        className="preview-img"
                        alt="我是神尊"
                        style={{ width: 300, height: 150 }}
                    />
                </Col>
            </Row>
            <Row gutter={12} style={{ marginTop: 15 }}>
                <Col span={12}>
                    <img
                        src="https://static.tigerbbs.com/ed6e787ab1deab7767bbc87d71864611"
                        className="preview-img"
                        alt="我是火行"
                        style={{ width: 300, height: 150 }}
                    />
                </Col>
                <Col span={12} id="last"></Col>
            </Row>
        </div>
    );
};

export default Test;
```

## API

### previewImg

| 参数               | 必填 | 说明                 | 类型   | 默认值 |
| ------------------ | ---- | -------------------- | ------ | ------ |
| selector           | Yes  | 图片 classname       | string | -      |
| --------           | ---- | --------------       | ------ | ------ |
| delegationSelector | Yes  | 图片父容器 classname | string | -      |
