---
nav:
    title: 组件库
    path: /components

group:
    title: 反馈
    path: /components/response
    order: 5
---

维护人：[刘震](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=easonzen)

# Loading

用于页面和区块的加载中状态。

## 代码演示

```jsx
import React from 'react';
import { Loading } from '@tiger/jigsaw';

const Basic = () => {
    return <Loading tip="Loading..." />;
};

export default Basic;
```

```jsx
import React, { useState, Fragment } from 'react';
import { Loading } from '@tiger/jigsaw';
import { Button, Alert } from 'antd';

const NestedLoading = () => {
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setLoading(!loading);
    };

    return (
        <Fragment>
            <Loading tip="Loading..." loading={loading}>
                <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                />
            </Loading>
            <Button style={{ marginTop: '10px' }} type="primary" onClick={() => handleToggle()}>
                Toggle Loading
            </Button>
        </Fragment>
    );
};

export default NestedLoading;
```

```jsx
import React, { useState, Fragment } from 'react';
import { Loading } from '@tiger/jigsaw';
import { Button } from 'antd';

const GlobalLoading = () => {
    return (
        <Fragment>
            <Button
                type="primary"
                onClick={() => {
                    Loading.global(true, 'Loading...');

                    setTimeout(() => {
                        Loading.global(false);
                    }, 3000);
                }}>
                Global Loading
            </Button>
        </Fragment>
    );
};

export default GlobalLoading;
```

## API

### Loading

| 参数    | 必填 | 说明                                 | 类型    | 默认值 |
| ------- | ---- | ------------------------------------ | ------- | ------ |
| loading | No   | 是否为加载中状态                     | boolean | true   |
| tip     | No   | 当作为包裹元素时，可以自定义描述文案 | string  | -      |
