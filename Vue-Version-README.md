#### 前端基础结构实现笔记

##### 前端使用技术栈

> TypeScript + Vue3全家桶 + Axios + Vite + Element Plus + Sass

##### 前端开发环境的搭建

###### 安装: nodejs, npm, yarn

> 注意: windows7上面最高版本Node仅支持到: 12.22.x, vite最低Node要求是: 12.0

###### 创建项目

> yarn create vite  WebBaseStruct 按照提示走完流程  **或者**
>
> yarn create vite WebBaseStruct --template vue-ts

###### 安装项目

> 执行: yarn 此时可能会遇到如下问题:
>
> **The engine "node" is incompatible with this module. Expected version ">=14.0.0". Got "12.22.4".**
>
> 在windows7上面装不上node 14以上版本, 要么换操作系统, 要么执行如下操作来解决问题:
>
> yarn config set ignore-engines true
>
> 重新安装项目, 发现还有问题的话, 删除node_modules包和yarn.lock文件，再执行: yarn 项目安装成功

###### 运行项目

> yarn dev

###### 编译项目

> yarn build
>
> **编译项目时可能会遇到多种问题:**
>
> **1.warning: “@charset“ must be the first rule in the file**
>
> 解决方法: 
>
> 在vite.config.ts中配置:
>
> css: {
>     preprocessorOptions: {
>       scss: {
>         charset: false,
>       },
>     },
>
> **2.多种与启用 vue-tsc --emit命令有关的问题**
>
> node_modules\vscode-jsonrpc\lib\common\linkedMap.js:40 return this._head?.value;
> SyntaxError: Unexpected token '.'
>
> 临时解决方法:
>
> 在packeage.json中, 将build命令由: "vue-tsc --noEmit && vite build" 换成: "vite build"
>
> **3.tsconfig.json配置相关**
>
> node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1208:6 - error TS2748: 
> Cannot access ambient const enums when the '--isolatedModules' flag is provided.
>
> 解决方法: 
>
> 在tsconfig.json中将compilerOptions下设置: "isolatedModules": false, 或保留: "isolatedModules": true, 然后采用上面第个问题处理的方式, 删除: vue-tsc --noEmit
>
> **4.通过 'terserOptions' 来混淆编译后的代码**
>
> terserOptions: {
>       compress: {
>         drop_console: true,
>         drop_debugger: true,
>       },
>     },
>
> 需要指定: minify: 'terser', 不过 vite 官方推荐使用 'esbuild', 其速度会快: 20-40 倍

##### 编写项目前的一些准备工作

###### 安装: Volar 插件

> VSCode 中安装: Volar 插件, 禁用: Vetur插件

###### 设置 @ 别名 与 省略文件后缀

> **tsconfig.json中新增如下配置:**
> {"compilerOptions": {"allowSyntheticDefaultImports": true}}
>
> **vite.config.ts中新增如下配置:**
>
> ```typescript
> import { resolve } from 'path'
> 
> .....省略
> 
> export default defineConfig({
> .....省略
>    resolve: {
>        alias: {
>          '@': resolve(__dirname, 'src'),
>        },
>        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
>   },
> })
> ```
>
> 
>
> 在此过程中可能会遇到: **找不到"path", "__dirname"等问题**, 解决方法: 
>
> yarn add @types/node -D
>
> 此处配置了 “extensions”, 在使用 import 时可省略后缀, 但是 vite 建议引入时不要忽略扩展名

###### 定义前端目录结构 

> 当前项目的项目录结构为: (通过 tree > tree.txt生成)
>
> ```text
> ├─WebBaseStruct
>  │  ├─.vscode
>  │  ├─dist    
>  │  ├─node_modules
>  │  ├─public
>  │  ├─index.html    
>  │  └─src
>  │      ├─api
>  │      ├─assets
>     │      │  ├─fonts
>     │      │  ├─styles
>     │      ├─components
>     │      ├─config
>     │      ├─hooks
>     │      ├─locales
>     │      ├─router
>     │      ├─store
>     │      ├─utils
>     │      └─view
>     │      ├─bmod  // 扩展模块, 支持配置动态安装与卸载
>     │      │  └─oa
>     │      │      ├─api
>     │      │      ├─components
>     │      │      ├─hooks
>     │      │      ├─locales
>     │      │      ├─router
>     │      │      ├─store
>     │      │      └─view
>     │      │      └─entry.ts // 扩展模块入口文件 
>    ```
>    

###### 替换favicon.ico

> 找到Logo.png文件, 在[icon生成网站](https://www.ico51.cn/)生成32x32的ico图标, 下载放到: public目录下

###### 安装一些常用库

> yarn add vue-router@4
> yarn add vuex@next
> yarn add sass -D // [vite 中使用 less/scss/sass/stylus 等 css 预处理器, 直接进行安装, 不用像 webpack 那样安装 loader 和配置](https://vitejs.cn/guide/features.html#css-modules)
>
> yarn add postcss postcss-modules autoprefixer -D
> yarn add normalize.css -S
>
> yarn add lodash -S
> yarn add @types/lodash -S
>
> yarn add axios -S



##### 基础框架的搭建

###### 全局配置, 样式的引入

###### 初始化语言包(国际化)

> 系统支持多语言环境, 主要实现思路是:  在各个模块下新建"locales"文件夹, 在该文件夹下面放置各语言环境对应的语言包文件, 比如: "zh-CN.ts", "en-US.ts", 其具体内容类似下面这种JSON格式数据
>
> ```typescript
> export default {
> "OK": "确定",
> "Cancel": "取消"
> };
> ```
>
> 在系统初始化时, 就需要根据浏览者选择的语言环境(默认使用中文, 因为系统主要还是面对国内用户), 动态加载所有模块的语言包内容, 我们先以基础平台为例, 其它扩展模块的语言包后面会在介绍扩展模块的初始化时, 进行加载。
>
> 首先我们想在系统各处使用语言包时, 以最小使用复杂度来访问语言包中的内容, 想直接通过一个全局方法"lpk"来进行访问, 比如:
>
> ```vue
> <template>
> {{lpk('OK')}} // 比如 zh-CN 环境下为: 确定
> </template>
> 
> <script setup lang="ts">
> console.log(lpk('OK')) // 输出语言包内容, 比如 zh-CN 环境下为: 确定
> </script>
> ```
>
> 在使用语言包之前, 需要将语言包内容先加载到内存中
>
> **加载语言包内容的实现:**
>
> ```typescript
> // 缓存语言包内容
> const tblLpk: Record<string, string> = {} 
> 
> //! 获取本地语言环境
> const getLocalLanguage = () =>
> {
> // TODO: 将返回用户实际选择的语言环境
> return 'zh-CN';
> }
> 
> //! 合并指定的语言包内容
> type FnMergeLpkType = (importLpkFiles: Record<string, any>) => void
> export const mergeLpk: FnMergeLpkType = (importLpkFiles) => {
>  const stLocalLanguage = getLocalLanguage()
>  for (const key in importLpkFiles){
>      // 不是当前语言环境下面的语言包内容, 直接丢弃
>      if (-1 == key.indexOf(stLocalLanguage)){
>          continue;
>      }
> 
>      // 缓存当前语言环境下需要的语言包内容
>      const {default: iLpkFileItem} = importLpkFiles[key]
>      for (const stLpkKey in iLpkFileItem){
>          tblLpk[stLpkKey] = iLpkFileItem[stLpkKey]
>      }
>  }
> }
> 
> // 加载基础平台的语言包
> // https://cn.vitejs.dev/guide/features.html#glob-import
> // import.meta.globEager 不支持以变量方式加载数据, 
> // 因此只有全都加载, 然后再过滤不需要的语言包内容
> mergeLpk(import.meta.globEager('@/locales/*'))
> ```
>
> **接下来我们开始定义全局方法: lpk**
>
> 在模块化管理中, 想定义全局变量, 需要显示把对象绑定到window对象上面， 比如: window.lpk = lpk, 那么首先需要扩展window的全局属性, 我们可以单独定义一个global.ext.d.ts文件来存放对全局变量的扩展声明, 但是考虑到这种情况应该不多, 所以就直接在初始化文件中直接进行扩展声明:
>
> ```typescript
> declare global { // declare global 声明即使未放在.d.ts文件中, 也表示声明的是全局类型
> interface Window { 
>   // FnLpkType后面会有具体的声明
>   // 属性结束标识可以使用'逗号', '分号', 为了与对象字面量区分常用";"
>   lpk: FnLpkType; 
> }
> }
> ```
>
> **lpk方法的具体实现如下:**
>
> ```typescript
> import { isEmpty, isArray } from 'lodash'
> 
> // 缓存语言包内容
> const tblLpk: Record<string, string> = {} 
> 
> //! 读取语言包内容
> export const lpk: FnLpkType = (key, option = {}) => {
>  const mixValue = tblLpk[key];
>  // 如果指定语言条目为数组, 则按照数组方式获取具体的语言内容
>  if (isArray(mixValue)){
>      // 空数组直接返回: 名称
>      if (!mixValue.length){
>          return key;
>      }
> 
>      if (!isEmpty(option)){
>          return mixValue[option.index as number] || key;
>      }
> 
>      return key;
>  } 
> 
>  // 不存在则使用默认值
>  if (isEmpty(mixValue)){
>      return option.default || key;
>  }
> 
>  // 返回读到的非数组语言内容
>  return mixValue;
> }
> 
> window.lpk = lpk // 全局语言包
> ```
>
> 上面的全局**lpk**函数定义好了, 在**TypeScript**环境下, 想在其它模块(.ts)文件中调用**lpk**, 必须 以**window.lpk** 加上**window**前缀来访问, 这不是想要的, 因此还需要在项目根目录下, 新建一个文件: **global.types.d.ts**文件, 来声明全局函数**lpk**,  注意: 因为我们在**tsconfig.json**文件中定义了**include**默认会加载**src**下面所有的.d.ts文件
>
> 在**global.types.d.ts**文件中对 **lpk**的声明如下:
>
> ```typescript
> // 此处, 不想import FnLpkType, 因此用到了any, 因为声明文件一旦加上了 import/export相关语句, 默认就变成了模块文件, 声明的所有内容都仅在当前文件中有效, 外界想使用必须 export 出去, 而global.types.d.ts 文件打算一直以声明类型文件的方式存在
> declare function lpk(key: string, option?: any): string
> ```
>
> 调整后将**FnLpkType**的声明移入**global.types.d.ts**文件中, 比如:
>
> ```typescript
> type FnLpkType = (key: string, option?: {index?: number, default?: GlobalType.KeyType}) => string
> declare var lpk: FnLpkType
> ```
>
> 经过上面的处理, 在任何**.ts**文件中就可能直接通过: **lpk('OK')**的方式访问语言包内容了, 不过在 **vue** 文件的
>
> **< template>{{lpk('OK')}}</ template >**还会报错, 处理的方法很简单, 直接将 **lpk** 以全局属性的方式挂到**createApp**创建出来的实例上即可, 具体实现如下:
>
> ```vue
> const app = createApp(App)
> app.config.globalProperties.lpk = lpk
> ```
>
> 此时虽然在**<template>**中可以使用全局属性: **lpk**来访问语言包中的内容, 但是在TypeScript环境还会报找不到**lpk**的错误, 通过在**vue**官方文档找到解决方法:
>
> [解决app.config.globalProperties上新增全局变量无法被TypeScript识别的方法](https://vuejs.org/api/utility-types.html#componentcustomproperties)
>
> 具体的实现是在 **main.ts**中通过扩展声明增强 **vue** 中的 **ComponentCustomProperties**声明的内容, 实现如下:
>
> ```typescript
> // main.ts
> // https://vuejs.org/api/utility-types.html#componentcustomproperties
> // 为了让<template>中的lpk在typescript环境不会报错, 还需要增加下面声明
> // 注意: 该声明必须放置到module中, 否则就会覆盖全局类型, 而不是增强全局类型
> declare module '@vue/runtime-core' {
>     interface ComponentCustomProperties {
>       lpk: FnLpkType
>     }
> }
> ```
>
> 重启**vscode**问题得到解决
>
> 到此语言包的初始化过程就结束了



###### 初始化扩展模块

> 系统前端支持动态的插拔扩展模块, **bmod**目录下存放了所有的扩展模块子目录, 比如: **bmod/blog** 存放博客模块的内容, **bmod/oa** 存放OA模块的内容等等, 我们会在**config**目录下面会创建系统的配置文件, 在配置文件中会指定启用模块的名称, 比如:
>
> ```typescript
> export default {
>     enableBModNames: ['blog', 'oa'], // 启用的扩展模块名称, 与模块入口路径保持一致
> }
> ```
>
> 同时会在全局存在获取指定配置选项的方法, 与检测指定模块是否被启用的方法, 其定义如下:
>
> ```typescript
> const app = {
>     //! 获取系统配置选项的值
>     getConfig<T>(key: string): T{
>         return (SysCfg as Record<string, any>)[key]
>     },
> 
>     //! 判断是否启用了指定模块
>     checkBModIsEnable(stModuleName: string){
>         const enableBModNames: string[] = app.getConfig<string[]>('enableBModNames')
>         
>         if (enableBModNames.find(item => item == stModuleName)){
>             return true;
>         }
> 
>         return false
>     }
> }
> ```
>
> 在各个扩展模块根目录下, 会存在一个**entry.ts**文件来作为该模块的入口文件, 其大致定义如下:
>
> ```typescript
> // =============================================================================
> // = 模块初始化
> const stModuleName = 'blog'
> export const entryInit = async () => {
>     // -------------------------------------------------------------------------
>     // - 如果未开启当前模块, 终止初始化当前模块内容
>     if (!app.checkBModIsEnable(stModuleName)){
>         return
>     }
> 
>     // -------------------------------------------------------------------------
>     // - 初始化当前模块的语言包
>     mergeLpk(import.meta.globEager('./locales/*'))
> 
>     // -------------------------------------------------------------------------
>     // - 初始化当前模块的配置信息
> 
>     // -------------------------------------------------------------------------
>     // - 初始化当前模块的路由
> 
>     // -------------------------------------------------------------------------
>     // - 初始化当前模块的状态管理信息
> 
>     console.log('blog init')
> }
> ```
>
> **初始化扩展模块的代码片断如下:**
>
> ```typescript
> // 初始化各扩展模块
> // 此处本可以通过配置选项来确定启用哪些扩展模块, 然后只需要对应模块的entry.ts文件来进行初始化
> // 不过: import.meta.globEager不支持指定动态路径, 必须以字符串字面量的方式来加载文件
> // 因此: 只有加载所有模块的entry.ts, 然后在各模块的entryInit方法中判断是否启用了该模块
> const iAllEntry: Record<string, any> = import.meta.globEager('@/bmod/*/entry.ts')
> for (const key in iAllEntry){
>     const iEntryFile = iAllEntry[key]
>     iEntryFile.entryInit && (await iEntryFile.entryInit())
> }
> ```
>
> 到此扩展模块的初始化过程就结束了



###### 初始化路由配置

**遇到的一些问题:** 

> **build后 采用history模式的路由, 刷新页面时, 遇到404问题**
>
> 比如: 从http://localhost点击**about**链接可以正常访问 http://localhost/about路由对应的页面, 但是直接刷新该路由就会报:找不到页面的问题, 如果换成 **hash**模式 http://localhost/#/about就没有问题, 而为了**url**的美观, 同时为了避免在微信等一些场景分享页面时, **hash**链接丢失参数等问题, 所以项目中会坚持使用history模式。
>
> **Vue-Router**官方提到可以通过在**Server**端比如: **nginx**配置文件中设置, 找不到路由强制弹回到站点的**index.html**页面, 这个不是理想的结果, 因为可能需要向用户分享一个页面, 比如就是: http://localhost/about 这个路由对应的页面, 而用户打开后, 被强制弹回到主页, 这就达不到预期效果, 因此该种解决方法无效。
>
> 最终还是需要靠**url**重定向来解决问题,不过当**Server**端发现请求地址无法识别时, 不会强制重定向到**index.html**, 而是: 重定向到具体的访问地址, 相当于把该地址的处理交给前端路由自己来识别, 这样就可以正确的展示访问路由的内容。具体的 nginx配置代码片断如下:
>
> ```nginx
> server {
>         listen       8012;
>         server_name  127.0.0.1;
> 
>         absolute_redirect off;
>         server_name_in_redirect off;
>         root D:/WebBaseStruct/dist/;
>         index index.html index.htm index.php;
> 
>         location / {
>             try_files $uri $uri/ @router;
>             index  index.html index.htm;
>         }
> 
>         location @router {
>             rewrite ^.*$ /index.html last;
>         }
> 
>         #error_page  404              /404.html;
> 
>         # redirect server error pages to the static page /50x.html
>         #
>         error_page   500 502 503 504  /50x.html;
>         location = /50x.html {
>             root   html;
>         }
>     }
> ```



> **Component inside < Transition> renders non-element root node that cannot be animated.** 
>
> 原因: **< template>**下出现了多个一级子元素, 将所有一级元素移入一个父级元素即可

###### 初化状态管理
