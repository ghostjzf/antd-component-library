---
nav:
    title: 组件库
    path: /components

group:
    title: 数据录入
    path: /components/data-input
---

维护人：[刘洪燕](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=ppdfmuc)

# RichText

富文本编辑组件

## 代码演示

```jsx
import React, { useState } from 'react';
import { RichText } from '@tiger/jigsaw';
import ConfigProvider from '../ConfigProvider';

const RichTextExample = () => {
    const [value, setValue] = useState('<p>这是一段默认的文字</p>');

    const handleChange = newValue => {
        setValue(newValue);

        console.log('newValue', newValue);
    };

    return (
        <ConfigProvider getToken={() => 'XXXX'}>
            <RichText value={value} onChange={handleChange} enableTable={true} enableImage={true} />
        </ConfigProvider>
    );
};

export default RichTextExample;
```

## API

### RichText

| 参数        | 必填 | 说明                                                                                         | 类型               | 默认值 |
| ----------- | ---- | -------------------------------------------------------------------------------------------- | ------------------ | ------ |
| value       | Yes  | 富文本内容                                                                                   | string             | -      |
| onChange    | No   | 富文本内容变化时触发事件                                                                     | function(value)    | -      |
| enableTable | No   | 是否开启表格功能                                                                             | boolean            | false  |
| enableImage | No   | 是否开启图片功能                                                                             | boolean            | false  |
| disabled    | No   | 是否置灰                                                                                     | boolean            | false  |
| plugins     | No   | 自定义配置插件。[详情可参考](https://www.tiny.cloud/docs/plugins/a11ychecker/)               | string ｜ string[] | -      |
| toolbar     | No   | 自定义工具栏。[详情可参考](https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar) | string ｜ string[] | -      |
