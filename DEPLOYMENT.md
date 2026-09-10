# DEPLOYMENT.md — Python AI 学习助手 · 部署与运行说明

> 记录 **AI 代理（第五阶段）** 之后的部署方案。
> 撰写时间：2026-09-10 ｜ 对应版本：132 题 / 21 门课 / server.js 6,380 B / app.js 77,644 B
> 更详细的开发红线见 `PROJECT_RULES.md`，现状数字见 `PROJECT_STATUS.md`，迭代历史见 `CHANGELOG.md`。
> 本文件只新增文档，不修改任何已有代码。

---

## 0. 一句话结论

- **静态部分（网站本体：题库 / 判题 / 课程 / 学习路线 / 档案）**：纯静态文件，任何静态托管都能跑（GitHub Pages、WorkBuddy 站点、OSS 等）。
- **AI 部分（AI 老师的大模型调用）**：走 `POST /api/chat`，**必须有 Node 运行时**。静态托管跑不了，那边 AI 只会回退到离线知识库（kb.js），不报错但也没有真实大模型。

---

## 1. server.js 提供 `/api/chat`

### 1.1 架构

```
浏览器 app.js
   │  POST /api/chat  { messages:[...], model?, temperature? }   ← 同源，无 CORS，不携带 Key
   ▼
server.js（Node）
   │  读 process.env.AGNES_API_KEY
   │  组装 { model, messages, temperature }，加 Authorization: Bearer <KEY>
   ▼
https://apihub.agnes-ai.com/v1/chat/completions
   │  上游状态码 + JSON 原样透传（OpenAI Chat Completions 兼容格式）
   ▼
浏览器 app.js 解析 choices[0].message.content 并渲染
```

### 1.2 接口约定

| 项 | 值 |
|---|---|
| 路径 | `POST /api/chat`（路径后允许 `?query`，会被忽略） |
| 请求体 | `{ messages: [{role, content}, ...], model?: string, temperature?: number }` |
| 默认模型 | `agnes-2.5-flash`（`model` 为空时用默认值；前端「模型设置」里的模型名可作覆盖） |
| 默认 temperature | `0.3`（未传时用） |
| 上游地址 | `https://apihub.agnes-ai.com/v1/chat/completions` |
| 上游超时 | 60 秒（超时返回 502 `proxy_upstream_error`） |
| 请求体上限 | 1 MB（超出直接销毁连接） |
| 响应 | 上游状态码与 JSON **原样透传**，前端解析逻辑无需改动 |

### 1.3 内置错误码（前端已能识别并回退离线知识库）

| 状态码 | 场景 | 返回体 `error.type` |
|---|---|---|
| 400 | 请求体不是合法 JSON | `invalid_request_error` |
| 400 | 缺少 `messages` 数组 | `invalid_request_error` |
| 500 | 服务端未配置 `AGNES_API_KEY` | `proxy_config_error` |
| 502 | 上游连接失败 / 超时 | `proxy_upstream_error` |
| 上游状态码 | 上游返回 401/429/5xx 等时原样透传 | 由上游决定 |

### 1.4 静态服务（原功能完整保留）

- 默认端口 `8765`，支持 `PORT` 环境变量。
- 仅允许 `GET / HEAD`；其他方法返回 405。
- 防路径穿越：`path.normalize` 后必须仍在站点根目录内，否则 403。
- 响应头带 `Cache-Control: no-cache`。
- ⚠️ 站点必须经 **HTTP 访问**（Pyodide 运行时与本地资源加载需要），不能 `file://` 双击打开 index.html。

---

## 2. `AGNES_API_KEY` 使用环境变量保存

**Key 只存在服务端进程的环境变量里，不写死在代码、不入库、不下发浏览器。**
前端 `localStorage['pla.llmCfg']` 的 `base` / `key` 字段已不再参与请求（保留仅为兼容旧数据），只有 `model` 字段生效。

### 2.1 各平台设置方式

```bash
# Windows CMD（当前会话有效）
set AGNES_API_KEY=你的真实Key
node server.js

# Windows PowerShell（当前会话有效）
$env:AGNES_API_KEY="你的真实Key"; node server.js

# Windows 持久化（推荐，新开的窗口也有效，需重开终端）
setx AGNES_API_KEY "你的真实Key"

# Linux / macOS（当前会话）
AGNES_API_KEY=你的真实Key node server.js

# Linux / macOS 持久化：写入 ~/.bashrc 或 ~/.zshrc
export AGNES_API_KEY="你的真实Key"
```

也可用 `.env` 文件（需自行在 server.js 中引入 dotenv 或在启动命令里加载，**当前未实现，不要直接改代码**）：

```bash
# 临时替代方案（不改代码）：
# Linux/macOS:  set -a; source .env; set +a; node server.js
# Windows CMD : for /F "tokens=1,* delims==" %i in (.env) do set %i=%j
```

### 2.2 如何确认生效

启动后控制台会打印：

```
AI 代理    : POST /api/chat -> apihub.agnes-ai.com
API Key    : 已配置（AGNES_API_KEY）      ← 看到这句就是配好了
```

若显示 **「未配置！请设置环境变量 AGNES_API_KEY」**，则 AI 页会调用失败并自动回退到离线知识库（kb.js）。

> 注意：后端环境变量是在**进程启动时**读取的，改完必须**重启服务**才生效。

---

## 3. GitHub Pages 只能部署静态页面，不能运行 Node 代理

### 3.1 能做什么 / 不能做什么

| 能力 | GitHub Pages | WorkBuddy 静态站点 | 本地 / VPS（有 Node） |
|---|---|---|---|
| 网站页面、题库、课程、学习路线 | ✅ | ✅ | ✅ |
| Pyodide 真实运行 Python（CDN 加载） | ✅ | ✅ | ✅ |
| 学习档案（浏览器 localStorage） | ✅ | ✅ | ✅ |
| **AI 老师走真实大模型 `/api/chat`** | ❌ | ❌ | ✅ |
| AI 离线兜底（kb.js + 档案问答） | ✅ 自动生效 | ✅ 自动生效 | ✅（无 Key 时兜底） |

**原因**：GitHub Pages 只提供静态文件分发，没有 Node 运行时，`/api/chat` 这个服务端接口不存在；浏览器对该路径的请求会拿到 404/405，前端捕获后回退离线知识库——不会白屏、不会报错崩溃，只是 AI 回答来自本地知识库而非大模型。

### 3.2 GitHub Pages 部署步骤（静态部分，AI 走兜底）

1. 新建空仓库（**不要勾选** README / .gitignore，保持全空最省事）。
2. 上传仓库根目录内容（即仓库根 = 项目根，不要多套一层目录）：
   ```
   index.html
   server.js              # 上传无害，Pages 不会执行它
   启动服务器.bat / 停止服务器.bat
   assets/  (app.js exercises.js courses.js basic-code.js lessons.js kb.js styles.css)
   PROJECT_RULES.md / PROJECT_STATUS.md / CHANGELOG.md / DEPLOYMENT.md
   ```
3. Settings → Pages → Source 选 `Deploy from branch` → 分支 `main` → 目录 `/ (root)` → Save。
4. 等 1～3 分钟，访问 `https://<用户名>.github.io/<仓库名>/`。
5. 若静态资源 404：检查是否多套了一层目录；`assets/` 必须和 `index.html` 同级。

> 已在使用的 WorkBuddy 静态站点：
> `https://fb22641161194a98830aaf61b19ec21c.app.workbuddy.link`
> 同样是纯静态托管，**AI 也只有离线兜底**。

---

## 4. 本地运行命令

### 4.1 最常用（推荐）

```bash
# 进入项目目录
cd python-learning-assistant

# 带 Key 启动（Windows CMD）
set AGNES_API_KEY=你的真实Key && node server.js

# 带 Key 启动（PowerShell）
$env:AGNES_API_KEY="你的真实Key"; node server.js

# 不带 Key 启动（仅静态功能 + AI 离线兜底）
node server.js
```

启动后浏览器会自动/手动访问 **http://localhost:8765**。

### 4.2 一键脚本（Windows）

- 双击 **`启动服务器.bat`**：默认 8765，端口被占用会自动 +1（最多到 8800），并自动打开浏览器。
- 双击 **`停止服务器.bat`**：查 PID 后 `taskkill /F`。
- 想让 bat 也带上 Key：先用一次 `setx AGNES_API_KEY "你的真实Key"`（系统级，之后双击 bat 就自动生效），**不建议把 Key 明文写进 bat**（容易误传到 GitHub）。

### 4.3 换端口

```bash
# Windows CMD
set PORT=9000 && node server.js
# PowerShell
$env:PORT=9000; node server.js
# Linux/macOS
PORT=9000 node server.js
```

### 4.4 快速自检

```bash
# 1) 静态服务
curl -s -o NUL -w "%{http_code}\n" http://localhost:8765/                 # 期望 200
curl -s -o NUL -w "%{http_code}\n" http://localhost:8765/assets/lessons.js # 期望 200

# 2) 代理：非法 JSON（期望 400 invalid_request_error）
curl -X POST http://localhost:8765/api/chat -H "Content-Type: application/json" -d "bad"

# 3) 代理：未配 Key（期望 500 proxy_config_error）
curl -X POST http://localhost:8765/api/chat -H "Content-Type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}]}"

# 4) 代理：配好 Key 后发一条真实消息（期望 200 + choices[0].message.content）
curl -X POST http://localhost:8765/api/chat -H "Content-Type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"print 怎么用？\"}]}"
```

---

## 5. 未来公网部署 Node 服务器步骤

> 目标：让**公网用户也能用上真实 AI**。核心是把 `server.js` 跑在能执行 Node 的平台上，并把 `AGNES_API_KEY` 配成平台环境变量。

### 5.1 通用准备

1. 确认平台运行在**项目根目录**，启动命令是 `node server.js`。
2. 平台环境变量里加：`AGNES_API_KEY = 你的真实Key`。
3. 端口：多数平台会注入 `PORT`，server.js 已自动读取（`process.env.PORT || 8765`），**无需改代码**。
4. 上传内容与 GitHub Pages 相同（index.html + assets/ + server.js + 文档），**不要上传 `_backup/`、临时测试脚本、`.env`**。
5. 部署后先访问首页确认静态部分 OK，再用第 4.4 节的 curl 验证 `/api/chat`（域名换成你的公网域名）。

### 5.2 Render（最省事的免费/低价方案）

1. New → **Web Service** → 连接 GitHub 仓库。
2. Runtime: `Node`，Build Command 留空，Start Command: `node server.js`。
3. Environment → Add Environment Variable：`AGNES_API_KEY = <Key>`。
4. Create Web Service，等待部署完成拿到 `https://xxx.onrender.com`。
5. ⚠️ 免费实例闲时冷启动约 30～60 秒；首次访问慢属正常（上游超时设的是 60s，冷启动严重的平台可能触发 502）。

### 5.3 Railway

1. New Project → Deploy from GitHub repo。
2. Variables 里添加 `AGNES_API_KEY`。
3. Settings → 确认 Start Command 为 `node server.js`；Networking → Generate Domain。
4. Railway 会自动注入 `PORT`。

### 5.4 自有 VPS / 云服务器（Ubuntu 示例）

```bash
# 1) 安装 Node 18+
sudo apt update && sudo apt install -y nodejs npm

# 2) 上传代码到 /opt/pla（scp / git clone 均可）

# 3) 用 systemd 托管（示例：/etc/systemd/system/pla.service）
# [Unit]
# Description=Python Learning Assistant
# After=network.target
# [Service]
# WorkingDirectory=/opt/pla
# Environment=AGNES_API_KEY=你的真实Key
# Environment=PORT=8765
# ExecStart=/usr/bin/node server.js
# Restart=always
# [Install]
# WantedBy=multi-user.target

sudo systemctl daemon-reload
sudo systemctl enable --now pla
sudo systemctl status pla

# 4) 用 Nginx 反代 + HTTPS（certbot 签证书）
# server {
#   listen 80; server_name your.domain;
#   location / { proxy_pass http://127.0.0.1:8765; proxy_read_timeout 70s; }
# }
sudo certbot --nginx -d your.domain
```

> Nginx 的 `proxy_read_timeout` 建议 ≥ 70s，避免上游 60s 超时前被网关先掐断。

### 5.5 部署后的静态/AI 混合方案（可选）

如果既想白嫖静态 CDN，又想有 AI：
- 静态站（GitHub Pages / WorkBuddy）+ 独立 Node 代理（Render/Railway），
- 让前端请求代理域名。**这需要改 app.js 里的 `/api/chat` 为绝对地址并给代理加 CORS**，属代码改动，
  按 `PROJECT_RULES.md` §15/§16 需**先向用户确认再动手**——本轮未做。

### 5.6 部署前清单

- [ ] `AGNES_API_KEY` 已在平台环境变量中配置（**不是写在代码里**）
- [ ] 启动命令为 `node server.js`，工作目录为项目根
- [ ] 未上传 `_backup/`、`.env`、临时测试脚本
- [ ] 静态首页 200，`assets/lessons.js`、`assets/basic-code.js` 均 200（无 404）
- [ ] `/api/chat` 返回 200 且 `choices[0].message.content` 有内容
- [ ] 题库仍为 132 题、课程 21 门（部署不改变数据，仅作回归确认）

---

## 6. 安全注意事项

### 6.1 必须做到

1. **Key 只放环境变量**。绝不写进 `server.js`、`index.html`、`assets/*.js`、`.bat`，也绝不提交到 GitHub。
2. **不要把 Key 提交进仓库**。如果误提交：立即到 Agnes 控制台**吊销旧 Key** 并重新生成（改代码删掉也没用，git 历史里仍在）。
3. **`.env` 必须进 `.gitignore`**（当前项目没有 .env 和 .gitignore，若以后新增请第一时间加上）。
4. **不要以 root 运行**；VPS 上只开放 80/443，Node 监听 127.0.0.1 由 Nginx 反代更安全。
5. **HTTPS 必开**：公网上 HTTP 明文传输 prompt 与回答，且浏览器会对 http 请求报混合内容错误。

### 6.2 已知风险（当前未处理，需用户确认后再做）

| 风险 | 说明 | 建议（未实施） |
|---|---|---|
| **接口无鉴权、无限流** | 任何人拿到你的代理地址都能刷你的 Key，费用损失自负 | 加简单限流（IP 维度 QPS/日额度）、或加一个访问口令；见 `PROJECT_RULES.md` §20 |
| **无用量上限** | 上游按量计费，公开后可能被刷爆 | 在 Agnes 控制台设置消费上限/告警 |
| **日志可能含敏感内容** | 当前 server.js 不打印请求体，但平台访问日志可能记录 URL | 定期清理平台日志；不要在 URL 里带 Key |
| **prompt 注入** | 用户可在输入框里诱导模型忽略教学人格 | 属产品层面问题，人格 prompt 在 app.js，按红线不动 |
| **Key 轮换** | 长期不换 Key 风险累积 | 定期（如每季度）在 Agnes 控制台轮换，重启服务生效 |

### 6.3 前端侧的变化（供对照）

- 浏览器 **不再** 直接请求 `apihub.agnes-ai.com`，也 **不再** 携带 `Authorization` 头。
- `localStorage['pla.llmCfg']` 里旧的 `base` / `key` 字段已不参与请求（**建议手动清掉浏览器里残留的旧 Key**：F12 → Application → Local Storage → 删除 `pla.llmCfg`）。
- AI 可用性由**服务端**决定：没配 Key 时前端会显示调用失败并自动回退离线知识库（kb.js + 档案问答），不会白屏。

---

## 附录 A · 常见故障速查

| 现象 | 原因 | 处理 |
|---|---|---|
| 浏览器报 `Failed to fetch` | 服务没起来 / 端口不对 / 走了代理插件 | 先看控制台是否打印「已启动」，确认访问 `http://localhost:8765` |
| AI 回复红色「大模型调用失败」+ 说未配置 | 未配 `AGNES_API_KEY` 或配了没重启 | 设环境变量后**重启** node 进程 |
| AI 回复 401「无效的令牌」 | Key 错/过期/被吊销 | 到 Agnes 控制台核对或重新生成 |
| AI 回复 502 `proxy_upstream_error` | 上游不可达 / 60s 超时 / 本机网络问题 | 检查网络、重试；平台冷启动会偶发 |
| GitHub Pages 上 AI 无模型回复 | 静态托管无 Node 运行时 | 属预期行为，走离线兜底；要真 AI 请按 §5 部署 Node |
| 端口被占用 | 8765 已占 | `PORT=9000 node server.js`，或用 bat（自动 +1） |
| 页面空白 / Pyodide 加载失败 | 用 `file://` 打开，或 CDN 被墙 | 必须走 HTTP；检查网络能否访问 jsdelivr |

## 附录 B · 相关文件

| 文件 | 作用 |
|---|---|
| `server.js` | 静态服务 + `POST /api/chat` 代理；读 `AGNES_API_KEY` |
| `assets/app.js` | 前端请求出口（同源 `/api/chat`）、判题、档案、课程渲染 |
| `assets/kb.js` | 无 Key / 调用失败时的离线知识库兜底 |
| `PROJECT_RULES.md` §20 | API Key 安全规则与后续计划 |
| `PROJECT_STATUS.md` | 当前实测数字（132 题 / 21 门课）与本地-线上差异 |
| `CHANGELOG.md` | 第五阶段「AI API 安全代理」的完整改动记录 |
