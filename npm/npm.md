#### npm
pm全称为Node Package Manager，是一个基于Node.js的包管理器   
在程序开发中我们常常需要依赖别人提供的框架，写 JS 也不例外。这些可以重复的框架代码被称作包（package）或者模块（module），一个包可以是一个文件夹里放着几个文件，同时有一个叫做 package.json 的文件。
* npm依附于node.js，下载安装node.js就安装了npm。
* `npm install npm@lastest -g`  
install 安装  npm@lastest就是<packageName>@<version>的格式。 -g代表全局安装。


#### package.json文件
管理本地安装的npm包可以用package.json文件。
1. 作为一个描述文件，描述了你的项目依赖哪些包
2. 允许我们使用 “语义化版本规则”指明你项目依赖包的版本
3. 让你的构建更好地与其他开发者分享，便于重复使用（方便团队合作）

* npm init 可以在当前项目创建一个package.json文件。  
输入 npm init 后会弹出一堆问题，我们可以输入对应内容，也可以使用默认值。一般name和version是必填的其他可以跳过。   
如果嫌回答这一大堆问题麻烦，可以直接输入 npm init --yes 跳过回答问题步骤，直接生成默认值的 package.json 文件
#### package.json的内容  
* name 全部小写，没有空格，可以使用下划线或者横线
* version  x.x.x的格式，满足“语义化版本规则”。
* description：描述信息，有助于搜索
* main: 入口文件，一般都是 index.js
* scripts：支持的脚本，默认是一个空的 test
* keywords：关键字，有助于在人们使用 npm search 搜索时发现你的项目（如果 package.json 中没有 description 信息，npm 使用项目中的 README.md 的第一行作为描述信息。这个描述信息有助于别人搜索你的项目，因此建议好好写 description 信息。）
* author：作者信息
* license：默认是 MIT
* bugs：当前项目的一些错误信息，如果有的话
* 可以设置默认信息`npm set init.author.name "syb"`
##### package.json指定的依赖包
1. dependencies：在生产环境中需要的依赖
2. devDependenccies：在开发、测试环境中需要的依赖 

#### 语义化版本规则（Semantic versioning）
"vue-loader": "^10.0.2"中vue-loader是依赖的包名称，10.0.2是这个包的版本。那版本前面的 ^ 或者版本直接是一个 * 是什么意思呢？
我们在声明对某个包的依赖时需要指明是否允许 update 到新版本，什么情况下允许更新。
* 版本号规范
补丁版本：解决了 Bug 或者一些较小的更改，增加最后一位数字，比如 1.0.1
小版本：增加了新特性，同时不会影响之前的版本，增加中间一位数字，比如 1.1.0
大版本：大改版，无法兼容之前的，增加第一位数字，比如 2.0.0
* 版本规则
如果只打算接受补丁版本的更新（也就是最后一位的改变），就可以这么写：   
1.0或1.0.x或~1.0.4   
如果接受小版本的更新（第二位的改变），就可以这么写：   
1或1.x或^1.0.4   
如果可以接受大版本的更新（自然接受小版本和补丁版本的改变），就可以这么写：   
*或x   
#### 安装package
本地安装（当前项目路径）和全局安装   
一般来说，全局安装只适用于工具模块，比如eslint和gulp。“本地安装”指的是将一个模块下载到当前项目的node_modules子目录，然后只有在项目目录之中，才能调用这个模块。
npm install 默认会安装 package.json 中 dependencies 和 devDependencies 里的所有模块。   
如果想只安装 dependencies 中的内容，可以使用 npm install --production 
npm install 默认安装最新版本，如果想要安装指定版本，可以在库名称后加 @版本号 
一旦安装了某个模块，就可以在代码中用require命令加载这个模块
#### 安装参数--save和--save -dev
添加依赖时我们可以手动修改 package.json 文件，添加或者修改 dependencies devDependencies 中的内容即可。

另一种更酷的方式是用命令行，在使用 npm install 时增加 --save 或者 --save -dev 后缀：

* npm install <packhttp://javascript.ruanyifeng.com/nodejs/npm.html#toc12age_name> --save 表示将这个包名及对应的版本添加到 package.json的 dependencies，可以简化为参数-S
* npm install <package_name> --save-dev 表示将这个包名及对应的版本添加到 package.json的 devDependencies，可以简化为参数-D
#### 更新本地package
有时候我们想知道依赖的包是否有新版本，可以使用 npm outdated 查看，如果发现有的包有新版本，就可以使用 npm update<package-name> 更新项目中的指定模块，npm update -global<package-name>更新全局模块，或者直接 npm update 更新所有。使用-S或--save参数，可以在安装的时候更新package.json里面模块的版本号。但有时会发现依然不是最新版本。  
* npm的更新过程
1 先到远程仓库查询最新版本  
2 然后对比本地版本，如果本地版本不存在，或者远程版本较新  
3 查看 package.json 中对应的语义版本规则  
4 如果当前新版本符合语义规则，就更新，否则不更新  
只有当前模块版本低于远程，package.json 中的版本语义规则满足情况，才能更新成功。

* 卸载本地package
卸载一个本地 package 很简单，npm uninstall <package-name> 即可

#### 全局安装遇到权限问题
在全局安装时可能会遇到 EACCES 权限问题，解决办法办法有如下 3 种：

1.`sudo npm install -g jshint`，使用 sudo 简单粗暴，但是治标不治本

2.修改 npm 全局默认目录的权限

先获取 npm 全局目录：`npm config get prefix`，一般都是 /usr/local； 
然后修改这个目录权限为当前用户：

 `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

3.使用其他包管理器帮你解决这个问题

实在懒得弄可以直接卸载 node，然后使用 Homebrew 重装 node:

brew install node

Homebrew 会帮我们处理好权限的问题。 

#### npm run  
npm不仅可以用于模块管理，还可以用于执行脚本。  

npm run(npm run scripts)可以直接运行 package.json 中 scripts 指定的脚本  

npm run 会创建一个Shell，执行指定的命令，并临时将node_modules/.bin加入PATH 变量，所以scripts字段里面调用命令时不用加上路径，这就避免了全局安装NPM模块，本地模块可以直接运行。 

package.json 中的 scripts 执行的脚本是本地项目内 node_modules -> .bin 内的脚本  

直接运行 npm run 会列出当前项目的 package.json 中 scripts 属性下的所有脚本命令。

如果希望一个操作的输出，是另一个操作的输入，可以借用Linux系统的管道命令，将两个操作连在一起。`"build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js"`
但是，更方便的写法是引用其他npm run命令。`"build": "npm run build-js && npm run build-css"`
上面的写法是先运行npm run build-js，然后再运行npm run build-css，两个命令中间用&&连接。如果希望两个命令同时平行执行，它们中间可以用&连接。

##### npm的scripts脚本命令
scripts字段的脚本命令，有一些最佳实践，可以方便开发`npm install npm-run-all --save-dev`

start脚本命令，用于启动应用程序。 `"start": "npm-run-all --parallel dev serve"` 

dev脚本命令，规定开发阶段所要做的处理，比如构建网页资源。`"dev": "npm-run-all dev:*"` 用于继发执行所有dev的子命令。

`"predev:sass": "node-sass --source-map src/css/hoodie.css.map --output-style nested src/sass/base.scss src/css/hoodie.css"`将sass文件编译为css文件，并生成source map 文件

`"dev:sass": "node-sass --source-map src/css/hoodie.css.map --watch --output-style nested src/sass/base.scss src/css/hoodie.css"`命令监视sass文件的变动，只要有变动，就自动将其编译为css文件

`"dev:autoprefix": "postcss --use autoprefixer --autoprefixer.browsers \"> 5%\" --output src/css/hoodie.css src/css/hoodie.css"`上面命令为css文件加上浏览器前缀，限制条件是只考虑市场份额大于5%的浏览器。

`"serve": "live-server dist/ --port=9090"`上面命令启动服务，用的是live-server模块，将服务启动在9090端口，展示dist子目录。

live-server模块有三个功能。
* 启动一个HTTP服务器，展示指定目录的index.html文件，通过该文件加载各种网络资源，这是file://协议做不到的。
* 添加自动刷新功能。只要指定目录之中，文件有任何变化，它就会刷新页面。
* npm run serve命令执行以后，自动打开浏览器。
上面三个功能需要三个模块来完成：http-server、live-reload和opener，现在只要live-server一个模块就够了

"test": "npm-run-all test:*",
"test:lint": "sass-lint --verbose --config .sass-lint.yml src/sass/*"
上面命令规定，执行测试时，运行lint脚本，检查脚本之中的语法错误。

[其他命令](http://javascript.ruanyifeng.com/nodejs/npm.html#toc12)
##### http-server 超轻量级web服务器
Http-server是基于nodejs的http服务器，它最大好处就是：
可以使任意一个目录成为服务器的目录，完全抛开后台的沉重工程，直接运行想要的js代码。
默认端口 http://localhost:8080 or http://127.0.0.1:8080 
一些参数
1. -p 端口号 (默认 8080)
2. -a IP 地址 (默认 0.0.0.0)
3. -d 显示目录列表 (默认 'True')
4. --cors 启用 CORS via the Access-Control-Allow-Origin header
5. -o 在开始服务后打开浏览器
6. -S or --ssl 启用 https

#### 其他npm命令
* npm info命令可以查看每个模块的具体信息。
* npm search命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式。
* npm list命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。加上global参数，会列出全局安装的模块。npm list命令也可以列出单个模块。
