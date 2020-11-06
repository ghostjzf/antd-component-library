---
nav:
    title: 组件库
    path: /components

group:
    title: 反馈
    path: /components/response
---

维护人：[蒋智烽](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=gzv6jdx)

# Drawer

## 代码演示

```jsx
/**
 * title: '声明式调用'
 * desc: '使用Drawer.open进行调用'
 */
import React, { useState } from 'react';
import { Drawer } from '@tiger/jigsaw';
import { Button } from 'antd';
import 'antd/lib/drawer/style/index.css';

function Content({ close }) {
    function showInner() {
        Drawer.open({
            component: <Content />,
            title: 'Content',
            closable: true
        });
    }

    return (
        <div>
            <Button type="primary" onClick={() => close()}>
                关闭
            </Button>
            <Button onClick={showInner}>打开</Button>
        </div>
    );
}

export default () => {
    function add() {
        Drawer.open({
            component: <Content />,
            title: '创建',
            closable: true
        });
    }

    return (
        <Button type="primary" onClick={add}>
            创建
        </Button>
    );
};
```

## API

### Drawer

| 参数      | 必填 | 说明 | 类型                                                           | 默认值 |
| --------- | ---- | ---- | -------------------------------------------------------------- | ------ |
| component | Yes  | 组件 | React.ComponentType, React.ExoticComponent, React.ReactElement | -      |

> -   component 参数支持传入组件定义，或者直接传入该组件调用的 reactNode。无论哪种方式，Drawer.open 都会向其传递 close、dismiss 属性。在 YourComponent 组件内部，你可以方便的通过这两种方法来关闭 modal。
> -   config 配置参数，支持 Drawer 的所有的 props 参数，另外新增扩展了 component 参数
> -   返回一个对象，包含了 close、dismiss 两个关闭方法，以及一个 result 的 promise 对象，可以通过该 promise 来访问 modal 关闭时的回调

> `除了上面这两个属性其他均继承` [antd4 Drawer API](https://ant.design/components/drawer-cn/#API)

```

```
