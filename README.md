# Python AI 学习助手

一个**零安装、纯浏览器**的 Python 零基础学习网站。打开网页就能写 Python、做题、看课程、问 AI 老师。

- 题库：**132 道**（代码题 72 / 选择 32 / 判断 22 / 填空 6）
- 课程：**21 门**，覆盖 6 个学习阶段的全部阶段 1～5 知识点
- 判题：**真实 Python 执行**（Pyodide 0.26.2，浏览器内跑真 Python，输出比对判分）
- AI：AI Python 老师（渐进式提示，不直接给答案），无 Key 时自动回退离线知识库

## 功能

- **132 道 Python 练习**：代码题 / 选择 / 判断 / 填空，自动判分，支持 stdin 输入用例
- **21 门课程**：讲解 → 示例（附真实运行输出）→ 重点 → 常见错误 → 理解检查 → 练习 → 代码实践 → 下一课
- **六阶段学习路线**：从「Python 认识」到「高级挑战」，带掌握度徽标与推荐下一课
- **浏览器内运行 Python**：Pyodide 0.26.2，无需安装任何环境；带死循环看门狗（约 0.3 秒中断）
- **AI 教师**：注入学习档案，按求助层级渐进提示；无 Key 时用本地知识库兜底
- **学习档案**：等级 / 进度 / 正确率 / 薄弱知识点 / 行为事件，全部存在浏览器 localStorage

## 本地运行

需要 Node.js 18+（仅用于起本地静态服务，本站本身无前端构建）。

```bash
node server.js
```

然后访问 **http://localhost:8765**（端口被占用时 `PORT=9000 node server.js`）。

Windows 也可以直接双击 `启动服务器.bat`，停止用 `停止服务器.bat`。

> 站点必须经 HTTP 访问，不能双击 `index.html` 用 `file://` 打开（Pyodide 与本地资源需要 HTTP 环境）。

## AI 教师配置（AGNES_API_KEY）

AI 调用走**服务端代理**：浏览器 → 同源 `POST /api/chat` → `server.js` → Agnes API。
**API Key 只存在服务端环境变量里，不下发浏览器、不进代码、不进仓库。**

```bash
# Windows CMD
set AGNES_API_KEY=你的真实Key && node server.js

# Windows PowerShell
$env:AGNES_API_KEY="你的真实Key"; node server.js

# Windows 持久化（推荐，之后双击 bat 即可）
setx AGNES_API_KEY "你的真实Key"

# Linux / macOS
AGNES_API_KEY=你的真实Key node server.js
```

启动后控制台显示 `API Key：已配置（AGNES_API_KEY）` 即生效。

> **不要提交 Key。** 若误提交，请立即到 Agnes 控制台吊销并重新生成（删文件也没用，git 历史里仍在）。

未配置 Key 时，AI 页会自动回退到离线知识库（`assets/kb.js`）+ 档案问答，不会报错、不会白屏。

## GitHub Pages 说明（重要）

GitHub Pages 只能托管**静态文件**，因此：

| 能力 | GitHub Pages |
|---|---|
| 网站 / 132 题 / 21 门课 / 学习路线 / 学习档案 | ✅ 正常 |
| 浏览器内运行 Python（Pyodide 走 CDN） | ✅ 正常 |
| **AI 教师调用真实大模型** | ❌ 不可用 |
| AI 离线知识库兜底 | ✅ 自动生效 |

原因：AI 依赖 `server.js` 提供的 `/api/chat` 代理，而 Pages **没有 Node 运行时**。
想让 AI 在线上工作，需要把 `server.js` 部署到能跑 Node 的平台（Render / Railway / VPS 等），并配置 `AGNES_API_KEY` 环境变量。详见 **[DEPLOYMENT.md](DEPLOYMENT.md)**。

## 部署到 Node 平台（AI 全功能）

1. 平台连接本仓库，运行时选 **Node**
2. 启动命令：`node server.js`（工作目录 = 仓库根）
3. 环境变量添加：`AGNES_API_KEY = 你的真实Key`
4. 平台注入的 `PORT` 会被自动读取，无需改代码

完整步骤、安全注意事项与故障速查见 **[DEPLOYMENT.md](DEPLOYMENT.md)**。

## 目录结构

```
index.html              页面骨架（5 个视图）
server.js               静态服务 + POST /api/chat AI 代理
assets/
  app.js                应用逻辑（判题 / 档案 / AI / 课程渲染）
  exercises.js          31 道基础代码题
  courses.js            阶段与知识点定义 + 60 道题
  basic-code.js         41 道零基础代码题
  lessons.js            21 门课程数据
  kb.js                 离线知识库（无 Key 兜底）
  styles.css            样式
```

## 说明

- 无框架、无前端构建、无数据库；学习数据存浏览器 localStorage，不上传服务器。
- 开发规则与红线见 [PROJECT_RULES.md](PROJECT_RULES.md)，当前状态见 [PROJECT_STATUS.md](PROJECT_STATUS.md)，迭代历史见 [CHANGELOG.md](CHANGELOG.md)。
