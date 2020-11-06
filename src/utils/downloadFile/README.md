---
nav:
    title: 组件库
    path: /components

group:
    title: 其他
    path: /components/others
---

维护人：[邵婉如](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=lge2com)

# downloadFile

主要用于文件的下载

### 代码演示

```jsx
import React from 'react';
import { utils } from '@tiger/jigsaw';
import { Button } from 'antd';
import axios from 'axios';

const { downloadFile } = utils;

const token = 'Basic ST-61929-tSm8tevB9-B1xdwMPI0j2JAMA9QBJ_SJHL_VM000014';
const url = 'https://esop-obs-test.tigerfintech.com/templates/ACCURATE_TAX';

export default () => {
    axios.interceptors.request.use(config => {
        config.params = Object.assign(
            {
                _s: Date.now()
            },
            config.params
        );

        // 请求添加token头
        config.headers.Authorization = token;

        return config;
    });

    axios.interceptors.response.use(response => {
        return response?.data;
    });

    const handleDownload = () => {
        downloadFile(axios, {
            url,
            fileName: 'demo.xlsx'
        });
    };

    return <Button onClick={handleDownload}>下载</Button>;
};
```

## API

### downloadFile

| 参数     | 是否必填 | 说明             | 类型        | 默认值 |
| -------- | -------- | ---------------- | ----------- | ------ |
| http     | yes      | axios            | AxiosStatic | -      |
| url      | yes      | 接口地址         | string      | -      |
| fileName | yes      | 文件名（带后缀） | string      | -      |

注：之前使用 accessToken 来进行身份校验。新版直接传入 http 参数，主要为了解决在 Global axios 中设置参数无效的问题。

其他参数可参考[AxiosRequestConfig]https://github.com/axios/axios
