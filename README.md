# 义务维修队网站

计算机与计算科学学院义务维修队官方网站

## 📋 项目简介

这是一个基于 Vue 3 + Vite 构建的义务维修队在线预约系统，为同学们提供便捷的电脑维修服务预约和管理功能。

### ✨ 主要特性

- 🎯 **在线预约** - 填写表单即可提交维修申请
- 📱 **响应式设计** - 完美适配手机、平板和电脑
- 💾 **工单管理** - 查看和管理所有提交的维修工单
- 🎨 **现代化界面** - 简洁美观的用户体验
- 🔒 **本地存储** - 数据保存在浏览器本地，保护隐私

## 🛠️ 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **构建工具**: [Vite](https://vite.dev/)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **样式方案**: CSS Variables + Scoped CSS

## 🚀 快速开始

### 前置要求

确保你的计算机已安装：

- Node.js 16+ ([下载地址](https://nodejs.org/))
- npm 或 yarn

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io.git
cd Friendly-Fix-It-Crew.github.io
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
npm run dev
```

访问 http://localhost:5173 即可预览网站

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

## 📁 项目结构

```
Friendly-Fix-It-Crew/
├── public/                 # 静态资源
│   ├── favicon.svg        # 网站图标
│   └── icons.svg          # SVG 图标
├── src/
│   ├── assets/            # 项目资源
│   │   ├── icons/         # 图标文件
│   │   ├── images/        # 图片文件
│   │   └── hero.png       # 首页横幅
│   ├── components/        # 可复用组件
│   │   ├── Header.vue     # 导航栏
│   │   ├── Footer.vue     # 页脚
│   │   ├── ServiceCard.vue    # 服务卡片
│   │   └── OrderForm.vue      # 预约表单
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── stores/            # Pinia 状态管理
│   │   └── orders.js      # 工单状态
│   ├── styles/            # 全局样式
│   │   └── variables.css  # CSS 变量
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── Services.vue   # 服务列表
│   │   ├── Booking.vue    # 在线预约
│   │   ├── Orders.vue     # 工单管理
│   │   └── About.vue      # 关于我们
│   ├── App.vue            # 根组件
│   ├── main.js            # 入口文件
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── vite.config.js         # Vite 配置
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 📖 功能说明

### 1. 首页 (Home)

- 展示义务维修队介绍
- 服务时间和地点信息
- 服务项目预览
- 快速预约入口

### 2. 服务列表 (Services)

- 详细展示所有提供的维修服务
- 包括清灰换硅脂、系统重装、软件安装等 9 项服务

### 3. 在线预约 (Booking)

- 填写维修申请表单
- 选择需要的服务项目
- 提交后自动生成工单

### 4. 工单管理 (Orders)

- 查看所有已提交的工单
- 查看工单详情和状态
- 支持删除工单

### 5. 关于我们 (About)

- 团队介绍
- 联系方式

## 🤝 贡献指南

我们欢迎团队成员共同参与项目开发！

### 开发流程

#### 1. Fork 仓库

访问 https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io
点击右上角的 "Fork" 按钮

#### 2. Clone 你的 Fork

```bash
git clone https://github.com/你的用户名/Friendly-Fix-It-Crew.github.io.git
cd Friendly-Fix-It-Crew.github.io
```

#### 3. 添加上游远程仓库（用于同步更新）

```bash
git remote add upstream https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io.git
```

#### 4. 创建功能分支

```bash
git checkout -b feature/your-feature-name
# 例如：git checkout -b feature/add-contact-form
```

#### 5. 开发和测试

```bash
npm run dev
```

在浏览器中实时预览修改效果

#### 6. 提交更改

```bash
git add .
git commit -m "feat: 添加联系表单功能"
git push origin feature/your-feature-name
```

#### 7. 创建 Pull Request

- 访问你的 fork 仓库
- 点击 "Compare & pull request"
- 填写 PR 标题和描述
- 提交等待审核

### 同步上游更新

当主仓库有更新时：

```bash
# 获取上游最新代码
git fetch upstream

# 切换到 main 分支
git checkout main

# 合并上游更新
git merge upstream/main

# 推送到你的 fork
git push origin main
```

### Commit 规范

使用语义化的 commit 消息：

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建过程或辅助工具变动
```

示例：

```bash
git commit -m "feat: 添加预约表单验证功能"
git commit -m "fix: 修复工单删除后列表不刷新的问题"
git commit -m "docs: 更新README中的安装说明"
```

## 📅 服务信息

- **服务时间**: 每周日 15:00-18:00
- **服务地点**: 教三101
- **服务费用**: 完全免费 ❤️

## 🔧 提供的服务

| 服务                 | 说明                              |
| -------------------- | --------------------------------- |
| 🧹 清灰、换硅脂      | 清理电脑内部灰尘，更换CPU散热硅脂 |
| 💾 C盘/硬盘/内存清理 | 清理系统垃圾，释放存储空间        |
| 🚫 流氓软件清理      | 卸载恶意软件，优化系统环境        |
| 📢 广告弹窗清理      | 清除广告插件，净化浏览体验        |
| 💿 重装系统          | 系统重装与基础配置                |
| 📝 安装和激活Office  | Office软件安装与激活              |
| 🖨️ 安装打印机驱动    | 打印机驱动程序安装配置            |
| 🔧 添加或更换配件    | 硬件配件加装或更换服务            |
| ✨ 其他未提及的服务  | 其他电脑相关维修服务              |

## 🌐 部署说明

本项目已配置自动化部署到 GitHub Pages：

1. 代码推送到 `main` 分支
2. 运行 `npm run deploy` 自动构建并部署
3. 访问 https://hyron-long.github.io/ 查看网站

## 📝 注意事项

### 开发前

- 确保已安装 Node.js 16+
- 建议安装 VS Code 及 Vue 扩展
- 阅读 Vue 3 和 Vite 官方文档

### 提交 PR 前

- ✅ 代码可以正常运行 (`npm run dev`)
- ✅ 构建没有错误 (`npm run build`)
- ✅ 测试过主要功能
- ✅ 遵循项目的代码风格

### 常见问题

**Q: 端口被占用怎么办？**  
A: Vite 会自动尝试下一个可用端口，或在 `vite.config.js` 中指定端口

**Q: 如何清除本地存储的工单数据？**  
A: 在浏览器开发者工具的 Application → Local Storage 中清除

**Q: 样式修改不生效？**  
A: 检查是否使用了 scoped，确保选择器正确

## 📞 联系方式

如有问题或建议，请联系：

- 计算机与计算科学学院义务维修队
- 或通过 GitHub Issues 反馈

## 📄 许可证

本项目仅供学习和内部使用。

---

**Happy Coding! 🎉**
