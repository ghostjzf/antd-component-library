---
nav:
    title: 组件库
    path: /components

group:
    title: 其他
    path: /components/others
    order: 99
---

维护人：[刘震](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=easonzen)

# ConfigProvider

为组件提供统一的全局化配置

## 代码演示

```jsx
import React, { Fragment, useContext } from 'react';
import { ConfigProvider } from '@tiger/jigsaw';
import { ConfigContext } from './index';

const Content = () => {
    const { locale, prefix, getToken, region } = useContext(ConfigContext);

    return (
        <Fragment>
            <h4>language: {locale}</h4>
            <h4>prefix: {prefix}</h4>
            <h4>accessToken: {getToken()}</h4>
            <h4>region: {region}</h4>
        </Fragment>
    );
};

const Page = () => {
    return <Content />;
};

const getToken = () => {
    return 'Basic ' + 'XXXXX';
};

const Config = () => {
    const locale = 'en_US';

    return (
        <ConfigProvider locale={locale} getToken={getToken}>
            <Page />
        </ConfigProvider>
    );
};

export default Config;
```

## API

### ConfigProvider

| 参数     | 必填 | 说明       | 类型                      | 默认值   |
| -------- | ---- | ---------- | ------------------------- | -------- |
| prefix   | No   | 前缀       | string                    | `jigsaw` |
| locale   | No   | 语言       | `zh_CN`, `zh_TW`, `en_US` | `zh_CN`  |
| getToken | No   | 获取 token | () => string              | -        |
| region   | No   | 地区       | `CN`, `US`                | `CN`     |
