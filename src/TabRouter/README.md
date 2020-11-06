---
nav:
    title: 组件库
    path: /components

group:
    title: 导航
    path: /components/navigator
    order: 2
---

维护人：[刘震](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=easonzen)

# TabRouter

用于生成导航式路由，支持横向和纵向路由

## API

### TabRouter

| 参数       | 必填 | 说明                       | 类型                             | 默认值       |
| ---------- | ---- | -------------------------- | -------------------------------- | ------------ |
| location   | No   | react-router-dom location  | object                           | -            |
| menus      | Yes  | 路由配置                   | TabRouterItem[]                  | -            |
| mode       | No   | 设置路由方向，横向还是纵向 | `horizontal`,`vertical`,`inline` | `horizontal` |
| hasCollaps | No   | 菜单是否可以收起           | boolean                          | false        |

### TabRouterItem

| 参数          | 必填 | 说明                                                | 类型                   | 默认值 |
| ------------- | ---- | --------------------------------------------------- | ---------------------- | ------ |
| path          | Yes  | 设置路由地址                                        | string                 | -      |
| title         | Yes  | 设置路由名称                                        | React.ReactNode        | -      |
| exact         | Yes  | 是否严格匹配路径，同 react-router 的 Route 组件参数 | boolean                | -      |
| component     | Yes  | 路由要渲染的组件                                    | React.ComponentType    | -      |
| hidden        | No   | 是否在菜单中显示                                    | boolean                | -      |
| hasPermission | No   | 设置是否有权限                                      | boolean, () => boolean | -      |
| icon          | No   | 设在菜单项中展示的 icon                             | React.ReactNode        | -      |
