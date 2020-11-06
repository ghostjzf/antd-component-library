---
nav:
    title: 组件库
    path: /components

group:
    title: 数据展示
    path: /components/data-view
    order: 4
---

维护人：[刘震](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=easonzen)

# DetailList

用于展示详情的组件

## 代码演示

```jsx
import React from 'react';
import { DetailList } from '@tiger/jigsaw';
import { message, Button, Input } from 'antd';

const items = [
    {
        label: '姓名',
        dataIndex: 'name'
    },
    {
        label: '性别',
        dataIndex: 'sex'
    },
    {
        label: '年龄',
        dataIndex: 'age'
    },
    {
        label: '学校',
        dataIndex: 'school',
        emptyText: 'No Data'
    },
    {
        label: '专业',
        dataIndex: 'career',
        render: text => {
            return `${text}(统招)`;
        }
    },
    {
        label: '地址',
        dataIndex: 'address'
    },
    {
        label: '邮编',
        render: () => {
            return <Input placeholder="请输入" />;
        }
    }
];

const dataSource = {
    name: '老虎FED',
    sex: '不详',
    age: 7,
    address: '冠捷大厦18层',
    career: '软件工程'
};

const handleOk = async () => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        });

        message.success('操作成功');
    } catch (error) {
        message.error('操作失败');
    }
};

const Detail = () => {
    return (
        <DetailList
            items={items}
            dataSource={dataSource}
            onOk={handleOk}
            btnPosition="middle"
            extraButtons={
                <Button
                    type="primary"
                    danger
                    onClick={() => {
                        message.success('重置成功');
                    }}>
                    Reset
                </Button>
            }
        />
    );
};

export default Detail;
```

```jsx
import React from 'react';
import { DetailList } from '@tiger/jigsaw';
import { message, Button, Input } from 'antd';
import 'antd/lib/modal/style/index.css';
import '@tiger/antd-modal/modal.css';
import Modal from '@tiger/antd-modal';

const items = [
    {
        label: '姓名',
        dataIndex: 'name'
    },
    {
        label: '性别',
        dataIndex: 'sex'
    },
    {
        label: '年龄',
        dataIndex: 'age'
    },
    {
        label: '学校',
        dataIndex: 'school',
        emptyText: 'No Data'
    },
    {
        label: '专业',
        dataIndex: 'career',
        render: text => {
            if (!text) {
                return '--';
            }

            return `${text}(统招)`;
        }
    },
    {
        label: '地址',
        dataIndex: 'address'
    },
    {
        label: '邮编',
        render: () => {
            return <Input placeholder="请输入" />;
        }
    }
];

const dataSource = {
    name: '老虎FED',
    sex: '不详',
    age: 7,
    address: '冠捷大厦18层',
    career: '软件工程'
};

const handleOk = async closeModal => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        });

        closeModal();

        message.success('操作成功');
    } catch (error) {
        message.error('操作失败');
    }
};

const openModal = () => {
    Modal.open({
        component: <DetailList items={items} dataSource={dataSource} onOk={handleOk} />,
        title: '详情',
        width: 1000,
        closable: true
    }).result.catch(() => {
        return;
    });
};

const DetailInModal = () => {
    return (
        <>
            <Button type="primary" onClick={openModal}>
                打开Modal
            </Button>
        </>
    );
};

export default DetailInModal;
```

## API

### DetailList

| 参数        | 必填 | 说明                                         | 类型                       | 默认值   |
| ----------- | ---- | -------------------------------------------- | -------------------------- | -------- |
| items       | Yes  | 表格每一列的配置，详情见下表                 | DetailItem[]               | -        |
| dataSource  | Yes  | 数据                                         | Object                     | -        |
| extra       | No   | 列表以外的内容，会展示在列表和底部操作区之间 | React.ReactNode            | -        |
| extraBtns   | No   | 自定义按钮，可配置除 ok 按钮以外的按钮       | React.ReactNode            | -        |
| okText      | No   | ok 按钮文案                                  | string                     | `Ok`     |
| cancelText  | No   | 取消按钮文案                                 | string                     | `Cancel` |
| onOk        | No   | 点击 ok 按钮回调                             | Function(close?, dismiss?) | -        |
| btnPosition | No   | 按钮组展示位置                               | `left`,`middle`,`right`    | `right`  |
| descProps   | No   | Descriptions 组件属性设置                    | Object                     | -        |
| className   | No   | class 设置                                   | string                     | -        |
| style       | No   | style 样式设置                               | React.CSSProperties        | -        |

如果被 Modal 组件包裹会提供以下方法：

| 参数    | 必填 | 说明                                      | 类型     | 默认值 |
| ------- | ---- | ----------------------------------------- | -------- | ------ |
| close   | No   | 如果被 Modal 组件包裹有此方法，关闭 Modal | Function | -      |
| dismiss | No   | 如果被 Modal 组件包裹有此方法，关闭 Modal | Function | -      |

其他参数可参考 [Antd Descriptions 参数配置](https://ant.design/components/descriptions-cn/#Descriptions)

### DetailItem

| 参数      | 必填 | 说明                                                 | 类型                            | 默认值 |
| --------- | ---- | ---------------------------------------------------- | ------------------------------- | ------ |
| label     | Yes  | 标题                                                 | string                          | -      |
| span      | No   | 包含列的数量                                         | number                          | 1      |
| dataIndex | No   | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string                          | -      |
| render    | No   | 支持自定义渲染内容                                   | (text?: any) => React.ReactNode | -      |
| emptyText | No   | 当为空值时所展示的内容                               | string                          | `--`   |

其他参数可参考 [Antd DescriptionItem 参数配置](https://ant.design/components/descriptions-cn/#DescriptionItem)
