# Git 团队协作完全指南

> 通过"义务维修队网站"项目，学习完整的 Git 团队协作流程

---

## 📚 目录

1. [项目背景](#项目背景)
2. [Git 基础概念](#git-基础概念)
3. [Fork 工作流详解](#fork-工作流详解)
4. [实际操作记录](#实际操作记录)
5. [团队协作流程](#团队协作流程)
6. [常见问题与解决方案](#常见问题与解决方案)
7. [最佳实践](#最佳实践)

---

## 📖 项目背景

### 项目信息

- **项目名称**: 义务维修队网站
- **原仓库**: https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io
- **技术栈**: Vue 3 + Vite + Pinia + Vue Router
- **团队**: 计算机与计算科学学院义务维修队

### 项目目标

将原有的 Hugo 静态网站迁移到 Vue 3 技术栈，实现：

- 在线预约功能
- 工单管理系统
- 服务展示页面
- 完整的文档体系

---

## 🔑 Git 基础概念

### 1. 核心概念

#### Repository（仓库）

- **本地仓库**: 你电脑上的项目文件夹
- **远程仓库**: GitHub 上的项目仓库

#### Branch（分支）

- **main/master**: 主分支，存放稳定代码
- **feature/xxx**: 功能分支，开发新功能
- **fix/xxx**: 修复分支，修复 bug

#### Commit（提交）

- 代码的一次快照
- 包含修改内容和说明信息

#### Remote（远程）

- **origin**: 你的 fork 仓库
- **upstream**: 原始仓库

### 2. 工作流程图

```
原仓库 (upstream)
    ↓ Fork
你的仓库 (origin)
    ↓ Clone
本地仓库
    ↓ 开发、提交
本地仓库
    ↓ Push
你的仓库 (origin)
    ↓ Pull Request
原仓库 (upstream)
```

---

## 🔄 Fork 工作流详解

### 什么是 Fork 工作流？

Fork 工作流是开源项目最常用的协作方式：

1. **Fork**: 复制别人的仓库到你的账号
2. **Clone**: 下载到本地开发
3. **Develop**: 在本地进行开发
4. **Push**: 推送到你的 fork
5. **Pull Request**: 请求合并到原仓库

### Fork vs Clone

| 操作      | 说明                 | 命令              |
| --------- | -------------------- | ----------------- |
| **Fork**  | 在 GitHub 上复制仓库 | 点击 "Fork" 按钮  |
| **Clone** | 下载到本地           | `git clone <url>` |

---

## 📝 实际操作记录

### 阶段一：项目初始化

#### 1.1 Fork 原仓库

**操作**:

- 访问: https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io
- 点击右上角 "Fork" 按钮
- 等待复制完成

**结果**: 仓库被复制到我的账号

```
https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io
```

#### 1.2 Clone 到本地

```bash
git clone https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io.git
cd Friendly-Fix-It-Crew.github.io
```

#### 1.3 配置远程仓库

```bash
# 查看当前远程仓库
git remote -v

# 添加上游仓库（原仓库）
git remote add upstream https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io.git

# 再次查看，确认配置
git remote -v
```

**输出示例**:

```
origin    https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io.git (fetch)
origin    https://github.com/Hyron-long/Friendly-Fix-It-Crew.github.io.git (push)
upstream  https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io.git (fetch)
upstream  https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io.git (push)
```

---

### 阶段二：项目开发

#### 2.1 查看原仓库状态

```bash
# 获取上游仓库最新信息
git fetch upstream

# 查看上游仓库的提交历史
git log --oneline upstream/main -5
```

**发现**: 原仓库使用 Hugo 技术栈

#### 2.2 创建 Vue 3 项目

```bash
# 使用 Vite 创建 Vue 3 项目
npm create vite@latest . -- --template vue

# 安装依赖
npm install

# 安装路由和状态管理
npm install vue-router pinia
```

#### 2.3 开发项目功能

**主要工作**:

1. 创建项目结构
2. 开发组件（Header, Footer, ServiceCard, OrderForm）
3. 创建页面（Home, Services, Booking, Orders, About）
4. 配置路由
5. 实现状态管理
6. 添加样式

#### 2.4 提交代码

```bash
# 查看修改状态
git status

# 添加所有文件
git add .

# 提交并写说明
git commit -m "feat: 使用 Vue 3 重构项目，实现在线预约功能"

# 推送到我的 fork
git push origin main
```

---

### 阶段三：部署配置

#### 3.1 配置 Vite

```javascript
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  base: "/", // 用户站点使用根路径
});
```

**为什么 base 是 '/'？**

- 仓库名: `Friendly-Fix-It-Crew.github.io`
- 这是用户/组织站点，GitHub Pages 从根路径服务
- 如果是项目站点（如 `user/repo`），则 base 应为 `/repo/`

#### 3.2 配置部署脚本

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

#### 3.3 安装并部署

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 部署到 GitHub Pages
npm run deploy
```

**原理**:

1. `npm run build` - 构建生产版本到 dist 目录
2. `npx gh-pages -d dist` - 将 dist 内容推送到 gh-pages 分支
3. GitHub Pages 自动从 gh-pages 分支部署网站

#### 3.4 配置 .gitignore

```
node_modules
dist
.vite/
*.local
.DS_Store
```

**作用**: 避免提交不必要的文件

---

### 阶段四：文档完善

#### 4.1 创建 README.md

包含：

- 项目简介
- 技术栈
- 快速开始
- 项目结构
- 功能说明
- 贡献指南

#### 4.2 创建 CONTRIBUTING.md

包含：

- 开发环境准备
- 工作流程
- 代码规范
- Commit 规范
- 提交 PR 步骤
- 常见问题

#### 4.3 创建 QUICK_START.md

包含：

- 5 分钟快速上手
- 简单明了的步骤

#### 4.4 创建 PR 模板

```markdown
# .github/PULL_REQUEST_TEMPLATE.md

## 改动类型

- [ ] 新功能
- [ ] Bug 修复
      ...
```

**作用**: 规范团队成员的 PR 格式

---

### 阶段五：准备 Pull Request

#### 5.1 创建迁移分支

```bash
# 基于上游仓库创建新分支
git checkout -b feature/migrate-to-vue3 upstream/main
```

**为什么这么做？**

- 基于原仓库的 main 分支
- 确保 PR 可以正确对比差异
- 保持干净的历史记录

#### 5.2 替换项目文件

```bash
# 删除 Hugo 文件
rm -rf ./*
rm -rf .github .editorconfig go.mod netlify.toml theme.toml

# 从 main 分支复制 Vue 3 文件
git checkout main -- .
git checkout main -- .github
```

**这一步做了什么？**

- 保留上游仓库的分支关系
- 替换所有文件为 Vue 3 版本
- 准备一个干净的迁移提交

#### 5.3 提交迁移

```bash
# 添加所有更改
git add -A

# 提交，详细说明迁移内容
git commit -m "feat: 将项目从 Hugo 迁移到 Vue 3 + Vite

主要改动：
- 移除 Hugo 静态网站生成器
- 使用 Vue 3 + Vite 重构整个项目
- 添加现代化的 UI 组件和响应式设计
- 实现在线预约和工单管理功能
- 完善项目文档和贡献指南

新功能：
- 服务展示页面
- 在线预约表单
- 工单管理系统
- 关于我们页面
- 完整的文档体系

技术栈：
- Vue 3 (Composition API)
- Vite 构建工具
- Vue Router 4 路由管理
- Pinia 状态管理"
```

#### 5.4 推送到 Fork

```bash
git push origin feature/migrate-to-vue3
```

#### 5.5 创建 Pull Request

1. 访问原仓库: https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io
2. 点击 "Compare & pull request"
3. 或手动创建:
   ```
   https://github.com/Friendly-Fix-It-Crew/Friendly-Fix-It-Crew.github.io/compare/main...Hyron-long:feature/migrate-to-vue3
   ```
4. 填写 PR 标题和描述
5. 点击 "Create pull request"

---

## 🤝 团队协作流程

### 团队开发标准流程

#### 步骤 1: Fork 仓库

```
GitHub → 访问项目 → 点击 "Fork"
```

#### 步骤 2: Clone 到本地

```bash
git clone https://github.com/你的用户名/项目名.git
cd 项目名
```

#### 步骤 3: 添加 Upstream

```bash
git remote add upstream https://github.com/原组织/项目名.git
git fetch upstream
```

#### 步骤 4: 创建功能分支

```bash
# 确保在最新的主分支
git checkout main
git pull upstream main

# 创建新功能分支
git checkout -b feature/你的功能名
# 例如: git checkout -b feature/add-contact-form
```

#### 步骤 5: 开发和测试

```bash
# 启动开发服务器
npm run dev

# 修改代码...

# 测试功能
# 访问 http://localhost:5173
```

#### 步骤 6: 提交代码

```bash
# 查看修改
git status

# 添加文件
git add .

# 提交（遵循规范）
git commit -m "feat: 添加联系表单功能"

# 推送到你的 fork
git push origin feature/你的功能名
```

#### 步骤 7: 创建 Pull Request

1. 访问你的 fork 仓库
2. 点击 "Compare & pull request"
3. 填写 PR 描述
4. 选择合并到 `main` 分支
5. 提交 PR

#### 步骤 8: Code Review

- 等待团队成员审核
- 根据反馈修改代码
- 继续 push，PR 自动更新

#### 步骤 9: 合并

- 审核通过后合并
- 删除功能分支

---

### 同步上游更新

当原仓库有更新时：

```bash
# 1. 获取上游最新代码
git fetch upstream

# 2. 切换到主分支
git checkout main

# 3. 合并上游更新
git merge upstream/main

# 4. 推送到你的 fork
git push origin main

# 5. 更新功能分支（如果有）
git checkout feature/your-feature
git merge main
```

---

### 解决冲突

#### 什么是冲突？

当多人修改了同一文件的同一部分时发生。

#### 解决步骤

```bash
# 1. 获取最新代码
git fetch upstream

# 2. 尝试合并
git merge upstream/main

# 3. Git 会标记冲突文件
# 打开文件，找到冲突标记：
<<<<<<< HEAD
你的代码
=======
别人的代码
>>>>>>> upstream/main

# 4. 手动编辑，保留需要的代码
# 5. 标记冲突已解决
git add 文件名

# 6. 完成合并
git commit

# 7. 推送
git push origin 分支名
```

---

## ❓ 常见问题与解决方案

### Q1: 如何撤销一次 commit？

```bash
# 撤销最后一次 commit，保留更改
git reset --soft HEAD~1

# 撤销最后一次 commit，丢弃更改（危险！）
git reset --hard HEAD~1
```

### Q2: 如何撤销已 push 的 commit？

```bash
# 方法1: 使用 revert（推荐，安全）
git revert HEAD
git push origin 分支名

# 方法2: 强制推送（危险，会覆盖历史）
git reset --hard HEAD~1
git push origin 分支名 --force
```

### Q3: 如何修改上一次的 commit 信息？

```bash
git commit --amend -m "新的提交信息"
```

### Q4: 如何查看提交历史？

```bash
# 简洁查看
git log --oneline

# 图形化查看
git log --oneline --graph --all

# 查看最近 5 条
git log --oneline -5
```

### Q5: 如何查看某个文件的修改历史？

```bash
git log --follow -- 文件名
git blame 文件名
```

### Q6: 暂存更改（Stash）

```bash
# 暂存当前更改
git stash

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop

# 应用暂存但不删除
git stash apply
```

**使用场景**: 切换分支时，当前工作未完成但不想提交

### Q7: 如何删除远程分支？

```bash
# 删除远程分支
git push origin --delete 分支名

# 删除本地分支
git branch -d 分支名
```

### Q8: Cherry-pick（挑选提交）

```bash
# 将某个提交应用到当前分支
git cherry-pick 提交哈希值
```

**使用场景**: 只想合并某个特定提交，而不是整个分支

---

## 📋 Git 命令速查表

### 基础命令

| 命令                  | 说明             |
| --------------------- | ---------------- |
| `git init`            | 初始化仓库       |
| `git clone <url>`     | 克隆仓库         |
| `git status`          | 查看状态         |
| `git add <file>`      | 添加文件到暂存区 |
| `git add .`           | 添加所有文件     |
| `git commit -m "msg"` | 提交更改         |
| `git push`            | 推送到远程       |
| `git pull`            | 拉取并合并       |
| `git fetch`           | 获取远程更新     |

### 分支操作

| 命令                 | 说明       |
| -------------------- | ---------- |
| `git branch`         | 查看分支   |
| `git branch 名`      | 创建分支   |
| `git checkout 名`    | 切换分支   |
| `git checkout -b 名` | 创建并切换 |
| `git merge 名`       | 合并分支   |
| `git branch -d 名`   | 删除分支   |

### 远程操作

| 命令                     | 说明               |
| ------------------------ | ------------------ |
| `git remote -v`          | 查看远程仓库       |
| `git remote add 名 url`  | 添加远程仓库       |
| `git push origin 分支`   | 推送到 origin      |
| `git push upstream 分支` | 推送到 upstream    |
| `git pull origin 分支`   | 从 origin 拉取     |
| `git fetch upstream`     | 获取 upstream 更新 |

### 查看历史

| 命令                | 说明           |
| ------------------- | -------------- |
| `git log`           | 查看提交历史   |
| `git log --oneline` | 简洁显示       |
| `git log --graph`   | 图形化显示     |
| `git log -5`        | 最近 5 条      |
| `git log -- 文件`   | 文件的历史     |
| `git blame 文件`    | 每行最后修改者 |

### 撤销操作

| 命令                   | 说明             |
| ---------------------- | ---------------- |
| `git reset HEAD~1`     | 撤销最后一次提交 |
| `git reset --hard`     | 彻底撤销         |
| `git revert HEAD`      | 创建反向提交     |
| `git checkout -- 文件` | 撤销文件修改     |
| `git stash`            | 暂存更改         |

---

## 🎯 最佳实践

### 1. Commit 规范

使用语义化的 commit 消息：

```
<type>(scope): subject

body

footer
```

**Type 类型**:

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

**示例**:

```bash
feat: 添加用户登录功能
fix: 修复工单删除后列表不刷新
docs: 更新 README 安装说明
refactor: 优化订单存储逻辑
```

### 2. 分支命名规范

```
feature/功能名     # 新功能
fix/问题描述       # Bug 修复
docs/文档更新      # 文档
refactor/重构内容  # 重构
hotfix/紧急修复    # 紧急修复
```

**示例**:

- `feature/add-contact-form`
- `fix/order-delete-bug`
- `docs/update-readme`

### 3. PR 规范

- ✅ 一个 PR 只做一件事
- ✅ 标题清晰明确
- ✅ 描述详细说明改动
- ✅ 附上截图（UI 改动）
- ✅ 提供测试步骤
- ✅ 关联相关 Issue

### 4. 代码审查

**作为作者**:

- 自己先 review 一遍代码
- 确保没有 console.log
- 确保注释清晰
- 确保遵循代码规范

**作为审查者**:

- 仔细阅读代码
- 提出建设性意见
- 说明原因
- 保持友好态度

### 5. 同步习惯

```bash
# 开始工作前
git fetch upstream
git checkout main
git pull upstream main

# 定期同步（建议每天）
git fetch upstream
git merge upstream/main
git push origin main
```

### 6. 提交频率

- 完成一个小功能就提交
- 不要积累太多更改
- 每次提交都应该有意义
- 提交前运行测试

**错误示例**:

```bash
# ❌ 不好的做法
# 开发一周，提交一次，改了 100 个文件
git commit -m "update"
```

**正确示例**:

```bash
# ✅ 好的做法
git commit -m "feat: 添加表单验证"
git commit -m "feat: 添加提交按钮"
git commit -m "fix: 修复样式问题"
```

### 7. .gitignore 配置

必须忽略的文件：

```
node_modules/
dist/
.vite/
*.local
.env
.DS_Store
*.log
```

### 8. 备份习惯

- 经常 push 到远程
- 重要的分支打 tag
- 定期备份到其他地方

```bash
# 打标签
git tag v1.0.0
git push origin --tags
```

---

## 📊 本次项目总结

### 完成的工作清单

#### 1. 项目开发 ✅

- [x] Vue 3 + Vite 项目初始化
- [x] 5 个页面开发（Home, Services, Booking, Orders, About）
- [x] 4 个可复用组件（Header, Footer, ServiceCard, OrderForm）
- [x] 路由配置（Vue Router 4）
- [x] 状态管理（Pinia）
- [x] 响应式设计
- [x] GitHub Pages 部署

#### 2. 文档完善 ✅

- [x] README.md - 完整项目说明
- [x] CONTRIBUTING.md - 贡献指南
- [x] QUICK_START.md - 快速开始
- [x] PULL_REQUEST_TEMPLATE.md - PR 模板
- [x] GIT_COLLABORATION.md - 本文档

#### 3. Git 配置 ✅

- [x] Fork 原仓库
- [x] 配置 upstream
- [x] 创建功能分支
- [x] 提交代码
- [x] 创建 Pull Request

#### 4. 部署配置 ✅

- [x] 配置 Vite base 路径
- [x] 配置部署脚本
- [x] 安装 gh-pages
- [x] 部署到 GitHub Pages
- [x] 配置 .gitignore

### 学到的技能

1. **Git 操作**
   - Fork 工作流
   - 远程仓库管理
   - 分支管理
   - 冲突解决
   - Pull Request

2. **Vue 3 开发**
   - Composition API
   - `<script setup>` 语法
   - 组件开发
   - 路由配置
   - 状态管理

3. **项目部署**
   - GitHub Pages 配置
   - Vite 构建配置
   - 自动化部署

4. **团队协作**
   - 文档编写
   - 代码规范
   - PR 流程
   - Code Review

---

## 🚀 下一步学习建议

### 1. 深入学习 Git

- 阅读《Pro Git》: https://git-scm.com/book/zh/v2
- 练习 GitHub Flow 工作流
- 学习 Git Rebase 的高级用法

### 2. 深入学习 Vue 3

- 官方文档: https://cn.vuejs.org/
- 学习 Composition API 高级模式
- 学习 Vue 3 性能优化

### 3. 学习团队协作

- 参与开源项目
- 练习 Code Review
- 学习敏捷开发流程

### 4. 学习 DevOps

- GitHub Actions 自动化
- CI/CD 流程
- Docker 容器化

---

## 📞 获取帮助

### 资源链接

- **Git 官方文档**: https://git-scm.com/doc
- **GitHub 文档**: https://docs.github.com/zh
- **Vue 3 文档**: https://cn.vuejs.org/
- **Vite 文档**: https://cn.vite.dev/

### 常用命令查询

```bash
# 查看 Git 帮助
git help
git help <command>

# 查看分支
git branch -v

# 查看远程仓库
git remote -v

# 查看提交历史
git log --oneline --graph --all -10
```

---

## 🎉 结语

通过这个项目，你学会了：

✅ 如何使用 Git 进行团队协作  
✅ 如何 Fork 和贡献开源项目  
✅ 如何创建规范的 Pull Request  
✅ 如何编写项目文档  
✅ 如何部署到 GitHub Pages  
✅ 如何使用 Vue 3 开发现代 Web 应用

**记住**: Git 是一个工具，最重要的是理解协作的理念：

- 清晰的提交信息
- 良好的沟通
- 规范的流程
- 互相尊重

继续加油！💪

---

**文档版本**: v1.0  
**最后更新**: 2026-04-11  
**维护者**: Hyron-long
