## 项目介绍

本项目基于 dumi 进行开发。

dumi 是一个开源工具，用于开发以及展示 UI 组件库。

dumi 官方文档：https://d.umijs.org/

## 准备工作

本项目会发布 package 到 Tiger NPM, 所以在使用之前需要保证你已经注册了 Tiger NPM 账号。如果还没有请按照以下步骤注册：

```bash
$ tnpm adduser // 根据提示输入name, password, email。
$ tnpm login --registry=http://r.npm.tigerfintech.com // 登陆TigerNPM
```

详情可参考此链接：[如何注册 tnpm 账号](https://wiki.tigerbrokers.net/pages/viewpage.action?pageId=44040736)

## 安装

有了 Tiger NPM 账号之后，接下来就是安装运行所需环境了

```bash
$ tnpm i
```

## 初始化组件

```bash
├─src
|  ├─index.ts # 添加组件export
|  ├─YourComponent
|  |   ├─README.md # 编写文档
|  |   ├─index.tsx # 编写组件
|  |   ├─style.less # 组件样式使用less格式
|  |   ├─__tests__
|  |   |     └index.test.js # jest + enzyme + sinon 编写测试用例
```

在 src 下创建`YouComponent`文件夹内容，命名规范及内容如图。

在`src/index.ts`添加组价导出，例：`export { YourComponent as default } from './YourComponent'`

## 开发

```bash
# 开始本地开发你的组件
$ npm start
```

现在本地的开发环境已经准备好了，可以开始进行开发了

## 编写/执行测试用例

测试使用 jest + enzyme + sinon 框架，具体使用方式参见下方链接：

jest: https://jestjs.io/docs/zh-Hans/getting-started

enzyme: https://enzymejs.github.io/enzyme/

sinon: https://sinonjs.org/releases/v9.0.2/

```bash
$ npm run test # 执行测试
或
$ npm run test:coverage # 执行测试并生成测试报告
```

## 提交代码

```bash
$ git add .
$ git-cz
$ git push
```

此时你的组件已经开发完成，提交 MR 即可

## 打包发布组件

```bash
$ npm run release # 构建组件、发布以及生成changelog(目前添加了branch限制，只能在master分支执行。)
```

此时你的组件已经成功发布到 Tiger NPM 上了，可以下载并使用此 npm 包了

## 打包发布组件库主页

```bash
$ npm run deploy # 构建项目文档，上传CDN
```

组件库已经发布到 cdn 上了，地址：http://s.tigerfintech.com/desktop/cdn/jigsaw/

## Issues

https://git.tigerbrokers.net/fed/npm/jigsaw/issues

## Wiki

https://wiki.tigerbrokers.net/pages/viewpage.action?pageId=60938552
