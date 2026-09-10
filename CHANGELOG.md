# CHANGELOG.md — Python AI 学习助手 · 修改日志

> 依据实际备份文件时间戳（`_backup/`）与 `.workbuddy/memory/` 日志整理。
> 本项目**未使用 GitHub**；公网发布走 WorkBuddy 站点部署。

---

## 第一阶段 · 练习题系统与网站初建（2026-09-07）

**日期**：2026-09-07（备份 20260907_233834 / 235807）

**修改内容**：
- 从零创建网站：index.html + server.js（Node 静态服务器，默认 8765）+ assets/{app,exercises,kb,styles}
- Pyodide v0.26.2 代码实验室：浏览器内真实运行 Python 3，`sys.settrace` 行预算看门狗防死循环
- 31 道分级代码练习（exercises.js，含 stdinTests 判题用例），自动判题（stdout/stdin 比对、异常中文回溯）
- AI 答疑（用户自带 API Key）+ 离线知识库 kb.js 兜底
- 站名定为「Python AI 学习助手」，favicon、og 元信息
- 一键启停 bat（GBK 编码；启动自动换端口、延迟开浏览器；停止 taskkill）
- 首次发布公网（workbuddy_sites_deploy）

**修改文件**：新建全部文件

**测试结果**：真实 Python 3.13 验证 31/31 正解通过、错解拒绝、stdin 判题、死循环 0.3s 拦截

---

## 第二阶段 · AI 教师 + 成长档案（2026-09-08）

**日期**：2026-09-08（备份 20260908_002414 / 003007 / 133115）

**修改内容**：
- AI 答疑升级为「Python AI 教师」：12 条教学原则、3 级渐进求助（提示 → 更具体 → 明确要求才给答案）
- 新增「学生成长档案系统」：等级/进度/正确率/错题/薄弱知识点/行为事件（localStorage `pla.profile`，入口 `recordJudge()`），侧边栏"我的学习"面板
- 修复：AI 自称"无记忆"——根因是线上未同步档案注入代码，修复后重新部署
- 修复：`RE_WANT_ANSWER` 过宽误判、求助层级第 3 次矛盾、catName 尾随空格、无 Key 问薄弱点的离线兜底（isProfileQuery/profileQueryAnswer）

**修改文件**：assets/app.js（增量）、index.html

**测试结果**：多轮回归 8/8、9/9 全过；线上字节数与本地核对一致

---

## 第二阶段后半 · 阶段 1～2 题型扩展（2026-09-09 上午）

**日期**：2026-09-09（备份 20260909_133115 之前一轮，时间戳见 _backup/）

**修改内容**：
- 新建 courses.js：`STAGES`（6 阶段）+ `POINTS`（知识点表）+ 60 道新题（choice 32 / bool 22 / fill 6），末尾 concat 进题库（31 → 91 题，旧题零改动）
- 新增「学习路线」页（#view-roadmap）：阶段卡片 + 知识点按钮（✅/📖/⬜、错 N 次、点击跳题）
- app.js 增量：renderExDetail 支持四种题型、submitQuiz 本地判分、按阶段/知识点分组、档案增加 currentStage/recommendNext/掌握知识点、AI 阶段感知（阶段 1～2 不主动讲高级特性）
- 清理会被误发布的临时文件后同步上线

**修改文件**：新建 assets/courses.js；assets/app.js、index.html、assets/styles.css（增量）

**测试结果**：桩测试判分/档案/阶段/推荐/AI 请求体全过；node --check 通过；线上与本地字节数一致

---

## 第二阶段收尾 · 零基础代码题（2026-09-09 13:27）

**日期**：2026-09-09（备份 20260909_132752）

**修改内容**：
- 新建 basic-code.js：19 道阶段 1～2 超简单代码题（阶段 1×8、阶段 2×11，覆盖 pyintro/print/variable/datatype/input/operator/if/for/while），91 → **110 题**（旧题零改动）
- app.js 增量：3 级渐进提示 `pickHint/refreshHint`、提交后显示解析、代码题加「运行看看」按钮、带输入题显示标准输入框
- styles.css：`.ex-stdin` 等样式
- **修复 3 个 bug**：① 新按钮 id 与实验室 `btnRun` 冲突 → 改 `btnExRun`；② 提示层级偏移（第一次失败就跳第 2 级）→ pickHint 修正；③ 纯 print 题误显示标准输入框 → 条件收紧

**修改文件**：新建 assets/basic-code.js；assets/app.js、assets/styles.css、index.html（增量）

**测试结果**：39 项断言全绿——结构自检（110 题/字段/难度/知识点覆盖/id 无重复）、真实 Python 判题（19 正解全过 + 19 错解全拦 + 死循环拦截）、jsdom+真实 Python 端到端（渲染/提示层级/档案记录/路线/旧题回归/无控制台错误）。**本轮仅本地，未同步上线**

---

## 第三阶段 · 课程系统框架 + 示范课程（2026-09-09 17:24）

**日期**：2026-09-09（备份 20260909_172421）

**修改内容**：
- 新建 lessons.js：`window.LESSONS` 前 3 门课（Python 是什么 / print() / 变量）+ `lessonOf(topic)`
- index.html 新增「课程学习」视图 #view-lesson；app.js 增量新增 openLesson/renderLesson、路线点击分流（有课 📘→课程页，无课→练习）、已读记录（`pla.lesson`）、gotoExerciseById 跳转工具
- 课程页板块：学习目标 → 讲解 → 示例+真实输出 → 重点 → 常见错误 → 理解检查（不计档案）→ 开始练习 → 代码实践 → 完成+下一课
- **修复既有 bug**：CSS 变量 `--bg-2/--bg-3/--border/--text-1/--brand-light` 被大量引用但从未定义（边框/底色静默失效），补齐 :root 定义

**修改文件**：新建 assets/lessons.js；assets/app.js、assets/styles.css、index.html（增量）

**测试结果**：49 项端到端全过（渲染 8 板块/理解检查不计档案/跳转/真实判题/课程链/无课知识点旧行为/无控制台错误）。**仅本地**

---

## 第三阶段后半 · 阶段 1～2 课程补齐（2026-09-09 下午）

**日期**：2026-09-09（备份 20260909_172421）

**修改内容**：
- lessons.js 纯数据新增 7 门课（第 4～10 课）：comment、datatype（含字符串）、input、operator、if、while、for —— 阶段 1～2 知识点课程覆盖率 100%，原 3 门课零改动
- index.html：修复 og:description 残留"31 道"→ 110 道；meta description 同步更新
- quizIds（19 个）/ codeExerciseIds（13 个）全部对应真实题目且归属正确 topic；comment 无代码题按规范留空数组

**修改文件**：assets/lessons.js（纯数据）、index.html（2 行）——**未动 app.js、未动题库**

**测试结果**：3 层共 85 项断言全过——结构校验 12 项、真实 Python 3.13 示例输出 32/32 逐字一致、jsdom 端到端 41/41（含判题/档案/下一课/旧课回归）。**仅本地**

---

## 第三阶段收尾 · 阶段 3～5 课程补齐（2026-09-09 晚）

**日期**：2026-09-09（备份 20260909_203709）

**修改内容**：
- lessons.js 纯数据新增 11 门课（第 11～21 课）：
  - 阶段 3（数据结构）：list、tuple、dict、set
  - 阶段 4（函数）：def、param（含默认参数与作用域）、return
  - 阶段 5（进阶）：class、file、exception、module
- 阶段 3～5 的 11 个知识点在题库中无代码题，codeExerciseIds 按规范留空数组（待补题后点亮"代码实践"）
- 未移动任何知识点、未改 stage、未动原 10 门课与题库

**修改文件**：assets/lessons.js（纯数据）——**未动 app.js、未动题库、未改判题**

**测试结果**：结构校验全过、真实 Python 示例输出 **65/65** 一致（含文件读写续接示例；随机数示例用 seed 固定输出；规避 str 集合打印顺序随机化）、jsdom 端到端 **45/45**（新 11 课全开/理解检查不计档案/跨课衔接/旧 if 课真实判题回归/档案事件/无控制台错误）。**仅本地**

---

## 第四阶段 · 阶段 3～5 代码实践补齐（2026-09-09 深夜）

**日期**：2026-09-09（备份 20260909_234403）

**修改内容**：
- basic-code.js 增量追加 22 道阶段 3～5 基础代码题（110 → **132 题**），每个知识点 2 道：
  - 阶段 3（数据结构）：list（输出首元素/修改元素）、tuple（创建输出/长度与末元素）、dict（按键取值/修改+新增键值对）、set（去重/增删元素）
  - 阶段 4（函数）：def（定义+调用两次/带参数打招呼）、param（双参数加法/默认参数）、return（返回和/嵌套调用 double(double(3))）
  - 阶段 5（进阶）：class（Dog.bark/Student.__init__+introduce）、file（w 写再读/追加模式 a，均设计为重复提交结果稳定）、exception（捕获除零/捕获 ValueError 且含 stdin 用例）、module（math.sqrt/floor、random.seed 固定种子骰子含 3 组 stdin 用例）
  - 难度：k1 全部 level 1，k2 全部 level 2；参考答案追加进答案表（不改动旧条目）
- lessons.js：11 门课（第 11～21 课）的 codeExerciseIds 由空数组更新为对应新题 ID，课程页"💻代码实践"区点亮；comment 课按设计保持空；阶段 1～2 课程关联零改动
- **未动**：app.js、exercises.js、courses.js、判题引擎、settrace、recordJudge、AI 教师、localStorage、CSS

**修改文件**：assets/basic-code.js（追加 22 题 + 答案）、assets/lessons.js（11 处关联）

**测试结果**：结构校验 31/31 + 真实判题引擎（抽取 app.js PY_SETUP 原文执行）68/68（正解全过/错解全拦/语法错误全拦/file 题重复提交稳定）+ jsdom 端到端 33/33（课程入口→真实 Python 判题→档案 attempts/passed/mistakes/done/mastered/事件→旧课旧题回归→无控制台错误）。测试中 3 处失败均为测试脚本自身问题（错解样本设计不当 ×2、lessons.js 并行编辑竞态漏 1 处），应用代码无 bug。**本轮仅本地，未发布上线**

---

## 当前版本快照（2026-09-09 深夜）

- 题库 **132** 题（31+60+19+22）｜课程 **21** 门（阶段 1～5 覆盖 100%，其中 20 个知识点有代码实践）｜6 阶段 / 22 个 topic 标识
- 本地领先线上四个版本，**同步上线需用户明确要求**
- 详细现状见 PROJECT_STATUS.md，开发红线见 PROJECT_RULES.md
