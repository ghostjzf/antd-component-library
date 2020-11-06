---
nav:
    title: 组件库
    path: /components

group:
    title: 数据展示
    path: /components/data-view
---

维护人：[蒋智烽](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=gzv6jdx)

# EasyTable

更加强大易用的表格组件，支持表单的筛选

## 代码演示

<code src="./demos/index.tsx" />

## API

### EasyTable

| 参数           | 必填 | 说明                         | 类型                                                   | 默认值 |
| -------------- | ---- | ---------------------------- | ------------------------------------------------------ | ------ |
| loader         | No   | 获取数据                     | (params:any) => Promise<{data: any[], total?: number}> | -      |
| loadImmediatly | No   | 默认是否发起请求             | boolean                                                | false  |
| formProps      | No   | 表单参数，不传则只会显示表格 | object                                                 | -      |
| tableProps     | No   | 表格参数                     | object                                                 | -      |
| extraRender    | No   | 表单和表格之间插入内容       | Function(): React.ReactNode                            | -      |

> loader 可以返回一个 Promise<{data: any[], total?: number}> 或者直接返回指定数据结构({data: any[], total?: number})的数据

### formProps

| 参数         | 必填 | 说明                                     | 类型                        | 默认值 |
| ------------ | ---- | ---------------------------------------- | --------------------------- | ------ |
| onSubmit     | No   | 查询点击回调, 在单独使用 EasyForm 时使用 | Function(values)            | -      |
| onReset      | No   | 重置点击回调                             | Function                    | -      |
| beforeSubmit | No   | 查询之前触发的钩子，可以处理一下请求参数 | Function(params)            | -      |
| options      | No   | 表单项配置                               | any[]                       | -      |
| searchText   | No   | 查询按钮文字                             | string                      | 查询   |
| resetText    | No   | 重置按钮文字                             | string                      | 重置   |
| searchRender | No   | 自定义搜索按钮区                         | Function(): React.ReactNode | -      |

### tableProps

| 参数             | 必填 | 说明                               | 类型                    | 默认值 |
| ---------------- | ---- | ---------------------------------- | ----------------------- | ------ |
| title            | No   | 标题                               | string, React.ReactNode | -      |
| columns          | No   | 具体错误(一般是后端返回的具体错误) | Function(params)        | -      |
| \$rowSelection   | No   | 批量操作                           | boolean, object         | -      |
| \$showPagination | No   | 是否需要启用内置分页的配置         | boolean                 | -      |
| toolBarRender    | No   | 自定义按钮区                       | boolean                 | false  |
| toolBarOptions   | No   | 表格默认的配置                     | Object                  | -      |
| error            | No   | 错误信息                           | string                  | -      |

\$rowSelection

```

1.   当设置 true 时将启用 rowSelection, 自动收集选中数据。
2.   接受一个对象
    "onChange"就是当你多选发生改变之后的回调。
    "disabled"接受一个函数，当你需要设置是否禁用规则时需要用到。`record`就是每一条的数据。
```

columns

```
columns 接收一个函数

函数接收一个参数, 例如: const columns = ({pageSize, current, total, reload}) => {...}

reload: 刷新
```

toolBarRender

```
toolBarRender函数接收一个参数， 例如:
({reload, rowSelectData}) => {
    const {selectedRows, selectedRowKeys} = rowSelectData;
    ...
    ...
    ...
}

reload: 刷新
rowSelectData: 批量选择数据
```

### options(表单配置项)

| 参数 | 必填 | 说明     | 类型                                       | 默认值 |
| ---- | ---- | -------- | ------------------------------------------ | ------ |
| span | No   | 栅格     | number                                     | -      |
| hide | No   | 是否隐藏 | boolean, (prevValue, curValue) => boolean; | -      |

> 1.在指定 hide 时需要同时指定 shouldUpdate(重新渲染的条件).
>
> 2.其余参数均继承 antd 的[`Form.Item`](https://ant.design/components/form-cn/#Form.Item)
>
> 3.当 span 的值小于自适应的栅格时会以内部计算为准, 只有 span 大于或者等于内部计算的栅格大小才会生效

### toolBarOptions

| 参数           | 必填 | 说明                                                 | 类型    | 默认值 |
| -------------- | ---- | ---------------------------------------------------- | ------- | ------ |
| showReload     | No   | 显示刷新, 如果默认表单筛选条件为必填的情况不能开启它 | boolean | false  |
| showDensity    | No   | 显示表格密度                                         | boolean | true   |
| showFullScreen | No   | 显示全屏                                             | boolean | true   |
| showSetting    | No   | 显示列设置                                           | boolean | true   |
