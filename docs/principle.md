---
title: 开发规范
sidemenu: false
nav:
    title: 开发规范
---

### 组件名称命名规范

1. 必须能清楚表达组件的功能
2. 命名尽量不要超过两个单词，最多也应尽量控制在 3 个单词内（含 3 个）
3. 被 formutil 包裹的组件必须命名为 XXXField (e.g. PhoneField)

几种常见命名方式：

-   名词 + 动词 : Popconfirm, TreeSelect
-   动词 + 名词 : BackTop
-   形容词 + 名词 : DragableTable

---

### 参数命名规范

规则：

-   初始值: default + PropName
-   数据类: dataSource
-   选项类: options(e.g., { label: string, value: string }, 必须在组件内定义好每个 option 的字段)
-   渲染类: render + ModuleName
-   展示类: show + PropName
-   功能类: PropName + able
-   状态类: is + PropName
-   默认行为类: auto + Behaviour
-   参数设置类: moduleName + Props
-   触发类: propName + Trigger
-   文案类: xxx + Text

常用参数统一：

| 推荐使用 ✅          | 不推荐使用 ❌ |
| -------------------- | ------------- |
| loading              | spinning      |
| middle               | center        |
| large                | big           |
| labelName, valueName | names         |
| autoSize             | autosize      |
| forceRender          | rerender      |
| btns                 | btnGroup      |
| pageNo               | start         |
| pageSize             | limit         |
| on + Behaviour       | onFinish      |

**注意事项**

1. 如组件需要进行接口请求，对于环境的判断在组件内部完成，无需提供类似 isDev 这样的 prop
2. 需要被特定组件包裹的行为，应单独进行说明，不要添加到文档中。例如，\$formutil 等
3. 以上规则仅适用于组件自定义属性。如组件属性继承自 Antd 组件，当以上规则与 Antd 命名冲突时，以 Antd 为准

---

### 事件命名规范

EventName 的命名：

1. 动词 (e.g., onClick)
2. 名词 + 动词 (e.g., onPanelChange)
3. 表示状态的名词 (e.g., onSuccess)
4. 动词 + 表示状态的名词 (e.g., onDragEnd)

例子：

-   onClick: 表示点击行为
-   onSlide: 表示鼠标滑动行为
-   onDrage: 表示鼠标拖拽行为
-   onFetch: 表示获取数据行为
-   onLoad: 表示加载类行为
-   onOpen: 表示打开弹窗类组件行为
-   onXXXOpen: 表示组件内弹窗部分打开时
-   onClose: 表示关闭弹窗类组件行为
-   onXXXClose: 表示组件内弹窗部分关闭时
-   onChange: 表示组件内部数值的变化
-   onSearch: 表示搜索行为
-   onSelect: 表示选择类组件子选项被选择的行为
-   onRemove: 表示删除类行为
-   onPreview: 表示预览类行为
-   onDownload: 表示下载类行为
-   onXXXChange: 表示组件内某一部分发生变化时
-   onMouseLeave: 鼠标类触发事件，具体参考原生鼠标事件类型
-   onKeyDown: 键盘类触发事件，具体参考原生键盘事件类型
-   onSuccess: 表示操作成功类行为
-   onError: 表示操作失败类行为

事件监听: on + EventName

触发事件前: before + EventName

触发事件后: after + EventName

---

### 文档编写规范

例子：

| 参数      | 是否必填 | 说明 | 类型                                                | 默认值       |
| --------- | -------- | ---- | --------------------------------------------------- | ------------ |
| htmlType  | Yes      | XXX  | string                                              | `button`     |
| type      | No       | XXX  | `horizontal`,`vertical`                             | `horizontal` |
| disabled  | No       | XXX  | boolean                                             | false        |
| minLength | No       | XXX  | number                                              | 0            |
| style     | No       | XXX  | CSSProperties                                       | -            |
| character | No       | XXX  | (maxLength: number, ellipsis: boolean) => ReactNode | -            |
| offset    | No       | XXX  | [number, number]                                    | [0, 0]       |
| value     | No       | XXX  | string, number                                      | `small`      |

规则：

-   参数书写使用驼峰形式，参数命名尽量不要超过两个单词，最多也应尽量控制在 4 个单词内（含 4 个）
-   字符串类型的参数，默认值使用``修饰默认值
-   字符串类型的参数，如果类型固定。在类型列中使用``修饰可选项，参数之间用,分隔
-   数组类型的参数，在类型中使用[number, number]表示
-   布尔类型的参数，默认值使用 true 或 false 表示
-   数字类型的参数，默认值直接使用数字类型表示
-   函数类型的参数，在类型中使用箭头函数表示
-   无默认值的情况下，使用-
