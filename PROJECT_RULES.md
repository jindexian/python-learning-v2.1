# PROJECT_RULES.md — Python AI 学习助手 · 项目长期记忆与开发规则

> **本文件是项目的"宪法"。任何后续开发任务开始前，必须先读本文件和 PROJECT_STATUS.md，再核对实际代码。**
> 禁止依赖聊天上下文做重构决策。最后核对时间：2026-09-09（基于实际代码逐项验证）。

---

## 1. 项目目标

「Python AI 学习助手」：一个**零安装、纯浏览器**的 Python 零基础学习网站。学生在浏览器里直接运行真实 Python 3（Pyodide），按 6 阶段学习路线走"课程学习 → 理解检查 → 练习 → 代码实践 → 掌握 → 下一课"的闭环，并由"AI Python 老师"提供渐进式引导答疑（不直接给答案）。

目标用户：**完全没有编程基础的学生**。所有课程文案、提示、报错必须短句、少术语、多例子、多对比。

## 2. 当前项目架构

```
python-learning-assistant/
├── index.html            # 唯一页面，5 个视图 + 侧边栏"我的学习"面板
├── server.js             # Node 静态服务器（默认端口 8765，支持 PORT 环境变量）
├── 启动服务器.bat          # 一键启动（GBK 编码；8765 被占自动 +1 至 8800；自动开浏览器）
├── 停止服务器.bat          # netstat 找 PID 后 taskkill /F
└── assets/
    ├── app.js        (77,470 B)  # 全部应用逻辑（判题/档案/AI/渲染）
    ├── exercises.js  (26,071 B)  # 最初 31 道代码题【自 2026-09-07 起零改动】
    ├── courses.js    (30,966 B)  # STAGES + POINTS + 60 道新题（choice/bool/fill）
    ├── basic-code.js (54,018 B)  # 41 道零基础代码题（阶段 1～2 的 19 道 + 阶段 3～5 的 22 道）
    ├── lessons.js    (70,121 B)  # 21 门课程数据 + lessonOf()
    ├── kb.js         (16,290 B)  # 离线知识库（无 API Key 时的 AI 兜底）
    └── styles.css    (24,287 B)  # 全部样式
```

技术栈：原生 HTML/CSS/JS，无框架、无构建、无后端业务逻辑。Pyodide v0.26.2（jsdelivr CDN）。

## 3. 各核心文件职责（不要互相越界）

| 文件 | 职责 | 红线 |
|---|---|---|
| `index.html` | 页面骨架、5 个视图、脚本引入顺序、meta/SEO | 引入顺序：exercises → courses → basic-code → **lessons → kb → app**（app.js 必须最后） |
| `app.js` | 判题引擎、学习档案、AI 教师、各视图渲染、课程页渲染、localStorage | **禁止整体重写**；只允许增量修改 |
| `exercises.js` | 最初 31 道代码题 + stdinTests 判题用例 | 已通过全部回归测试，**不要再动** |
| `courses.js` | `window.STAGES`、`window.POINTS`、60 道新题，末尾 `concat` 进 `window.EXERCISES` | 阶段/知识点划分以此为准，**不要移动知识点或改 stage** |
| `basic-code.js` | `window.BASIC_CODE`（41 题），末尾 concat | 阶段 1～2 与阶段 3～5 代码题的数据源 |
| `lessons.js` | `window.LESSONS`（21 门课）+ `lessonOf(topic)` | 纯数据文件，加课只改这里 |
| `kb.js` | 离线问答知识库 | 未改动过 |
| `server.js` | 静态文件服务、MIME、防路径穿越 | 未改动过 |

## 4. 课程系统架构（lessons.js + app.js 渲染）

- 数据结构：每门课含 `id / stage / topic / topicName / title / summary / content[]（讲解段落） / examples[{code, output, note}] / keyPoints[] / tips[{bad, good, why}] / quizIds[] / codeExerciseIds[]`。
- 课程页 `#view-lesson` 由 app.js 的 `openLesson / renderLesson` 渲染，板块顺序：学习目标 → 知识讲解 → 示例+真实输出 → 重点总结 → 常见错误（✗/✓对照）→ 理解检查（内嵌 choice/bool 题，即时反馈、可重选、**不计档案**）→ 开始练习（正式题库，计档案）→ 代码实践按钮 → 完成知识点 + "继续下一课"。
- **课程只引用题目 ID，不复制题目内容**。quizIds/codeExerciseIds 必须指向 `window.EXERCISES` 中真实存在的 id。
- 学习路线 `#view-roadmap`：有课程的知识点显示 📘（学过变 📗）徽标，点击进课程页；无课程的知识点保持旧行为（直接进第一题）。
- 已读课程记录存 `localStorage['pla.lesson']`。

## 5. 题库系统架构（132 道 = 31 + 60 + 41）

- 所有题统一挂 `window.EXERCISES`（三个文件依次 concat，**永不覆盖、永不删除**）。
- 题目字段：`id / type / cat / catName / point / stage / level(difficulty) / title / desc / io / starter`。
  - 代码题（type='code'）另有 `stdinTests`（喂 stdin、比 stdout）、`hints`（3 级渐进提示，阶段 1～2 新题）、`explanation`、`answer`（参考答案，新题才有）。
  - 新题型：`choice`（选项 options + answer 索引）、`bool`、`fill`（字符串比对）。
- 判题：代码题走 Pyodide 内的 `_run / _test / _stdin_test`（真实执行 + stdout 比对）；choice/bool/fill 由 app.js 的 `submitQuiz()` 本地判分。两条路都汇入 `recordJudge(ex, allPass)`。
- **fill 题不进课程"理解检查"**（课程理解检查只支持 choice/bool），但通过"去做练习题"可达。

## 6. 学习档案系统（localStorage['pla.profile']）

- 字段：`done[]（完成题 id）、attempts、passed、topics{cat:{name, mistakes, ok}}、events[]、failStreak{题id:连败次数}、mastered[]（已掌握知识点 cat 列表）`。
- 核心函数（都在 app.js）：`calcLevel() / currentStage() / recommendNext() / profileSummaryForAI() / recordJudge() / recordEvent()`。
- 派生展示：侧边栏"我的学习"面板（等级/进度/薄弱点/**当前学习阶段 pfStage**/**推荐下一课 pfNext**）。
- **唯一记录入口是 `recordJudge()`**——任何新题型、新功能都必须走它，禁止另建记录系统。
- 事件类型取值为 `pass / fail / ask_ai` 等（`recordEvent(type, meta)`）。

## 7. AI 老师系统（app.js 内，勿动）

- 人格："耐心 Python 老师"，12 条教学原则；每次请求注入【学生信息】（含档案摘要、当前阶段、推荐下一课）+【求助层级】+【学生问题】。
- 渐进求助：`RE_TRY / RE_HELP / RE_WANT_ANSWER` + `countHelpTurns()`——第 1 次轻提示 → 第 2 次更具体 → 第 3 次或明确要答案才给完整写法。`RE_WANT_ANSWER` 已收紧，避免误判。
- 无 Key 兜底：`kbAnswer()`（kb.js 知识库）+ `isProfileQuery()/profileQueryAnswer()`（离线档案问答，问"我的薄弱点"也能答）。
- 阶段感知：阶段 1～2 不主动讲装饰器/生成器/闭包等高级内容。
- API Key 存 `localStorage['pla.llmCfg']`，**只在浏览器本地使用，随请求直发用户填写的服务商，不经任何中间服务器**。

## 8. Pyodide 代码运行系统（app.js 内，勿动）

- Pyodide v0.26.2，CDN 加载，`initPyodide()` 启动。
- 判题环境 `PY_SETUP`：`_run(code)`、`_test(code, cases)`、`_stdin_test(code, stdin, expect)`；支持 stdin 模拟、异常回溯转中文。
- **看门狗**：`sys.settrace` 行预算机制，死循环约 0.3 秒内中断并抛中文超时提示。这是核心安全机制，禁止移除。
- 代码实验室（`#view-lab`）与练习判题共用同一 Pyodide 实例；实验室运行按钮 id=`btnRun`，练习页运行按钮 id=`btnExRun`（**id 冲突已修过，不要改回去**）。

## 9. localStorage 数据（禁止改键名/结构）

| 键 | 内容 |
|---|---|
| `pla.done` | 完成的题目 id 数组 |
| `pla.labCode` | 代码实验室草稿 |
| `pla.exCode` | 各练习题的代码草稿 |
| `pla.llmCfg` | AI 服务的 API Key / 模型配置（敏感，勿上传） |
| `pla.chat` | AI 对话记录 |
| `pla.profile` | 学习档案（见 §6） |
| `pla.quizAnswer` | choice/bool/fill 的作答记录 |
| `pla.lesson` | 已读课程记录 |
| `pla.debug` | 调试开关（=1 开启 AI 请求日志） |

## 10. 当前 6 个学习阶段（courses.js 的 STAGES，以此为准）

| 阶段 | 名称 | 知识点 |
|---|---|---|
| 1 | Python 认识 | pyintro, print, comment, variable, datatype |
| 2 | 基础语法 | input, operator, if, while, for |
| 3 | 数据结构 | list, tuple, dict, set |
| 4 | 函数 | def, param, return |
| 5 | 进阶 | class, file, exception, module |
| 6 | 高级挑战 | advanced（装饰器/生成器/闭包/算法，归入旧题，**不配课、不提前**） |

## 11. 当前知识点（courses.js 的 POINTS）

`POINTS` 共 **22 个 topic 标识**：21 个真实知识点（§10 表中阶段 1～5 的全部）+ `advanced`（阶段 6 汇总桶）。
注意：旧 31 题使用的 `basics / data / func / oop / algo` 等旧 cat **不在 POINTS 体系内**，无法挂课程——这是历史遗留，属正常现象，不要"修复"它。

## 12. 当前题库（实测数字，2026-09-09 第四阶段后核对）

总 **132 题** = 旧 31（exercises.js）+ 60（courses.js）+ 41（basic-code.js：阶段 1～2 共 19 + 阶段 3～5 共 22）。按题型：code 72 / choice 32 / bool 22 / fill 6。按阶段：S1=24、S2=32、S3=21、S4=18、S5=17、S6=10。
阶段 3～5 的 11 个知识点各有 2 道新代码题（k1=level 1 基本语法，k2=level 2 稍作变化）。

## 13. 当前 21 门课程（lessons.js，全部已通过测试）

1. pyintro · Python 是什么　2. print · print()：让 Python 说话　3. variable · 变量　4. comment · 注释　5. datatype · 数据类型（含字符串内容）　6. input · input()　7. operator · 基本运算　8. if · if 判断　9. while · while 循环　10. for · for 循环　11. list · 列表　12. tuple · 元组　13. dict · 字典　14. set · 集合　15. def · 定义函数　16. param · 函数参数（含作用域）　17. return · 返回值　18. class · 类与对象　19. file · 文件读写　20. exception · 异常处理　21. module · 模块导入

阶段 1～5 覆盖率 100%；**阶段 1～5 的 20 个知识点课程都挂了 codeExerciseIds 且全部有效**（仅 comment 无代码题按设计留空）。file 题统一"先 w 写再读"，重复提交结果稳定。

## 14. 已验证通过的重要功能（测试基线，改动后需回归）

1. 31 道旧代码题：正解全过、错解拒绝、stdin 判题、死循环 0.3s 拦截。
2. 新题型 choice/bool/fill 本地判分与档案记录。
3. 41 道零基础代码题（basic-code.js）：真实 Python 判题、3 级渐进提示（第 1 次轻提示 → 第 2 次更具体 → 第 3 次完整写法）、file 题重复提交结果稳定。
4. 21 门课程：全部可打开、示例输出与真实 Python 3.13 逐字一致（65/65）、理解检查即时反馈且**不计档案**、阶段 3～5 的 11 门课"代码实践"区已点亮。
5. 学习档案：attempts/passed/mistakes/mastered/events 正确累加；currentStage/recommendNext 正确。
6. 学习路线：徽标、点击分流（有课→课程页，无课→练习）、"继续下一课"跨课衔接。
7. AI 教师：档案注入、求助层级、无 Key 离线兜底（kbAnswer + profileQueryAnswer）。
8. 最近一次全量端到端（jsdom + 真实 Python 桥接）：**45/45 通过，无控制台错误**。

## 15. 不允许随意修改的核心功能（保护清单）

- `exercises.js` 的 31 道旧题（连字段顺序都不要动）
- 判题引擎 `PY_SETUP` / `_run` / `_test` / `_stdin_test` 与 settrace 看门狗
- `recordJudge()` 与档案数据结构（§6）
- 所有 localStorage 键名与值的结构（§9）
- AI 教师的 system prompt、渐进求助正则、档案注入逻辑
- `window.STAGES` / `window.POINTS` 的阶段与知识点划分（含 stage 编号）
- 已通过测试的 21 门课的 `id`（第 1～10 课内容也不许改）
- 按钮 id：实验室 `btnRun` / 练习页 `btnExRun`（曾因重名修过 bug）
- CSS 变量 `:root` 定义（`--bg-2/--bg-3/--border/--text-1/--brand-light` 等曾因未定义修过，已补齐）

## 16. 增量修改原则（默认工作方式）

1. **默认增量**：只加数据、只做局部小改；新功能优先放新文件（如 lessons.js、basic-code.js 的先例）。
2. 改前必备份到 `../_backup/<文件名>.bak.<YYYYMMDD_HHMMSS>`（现有惯例，见 _backup/ 目录）。
3. 禁止未经用户明确要求：
   - 重写整个 app.js
   - 删除题库 / 删除课程
   - 修改已通过测试的核心逻辑（§15 清单）
   - 修改 Pyodide / 重做判题系统
   - 删除学习档案 / 改变 localStorage 数据结构
   - 发布 GitHub / 大规模 UI 重构
4. 如确需触碰核心架构：**先停下，向用户说明原因并获确认后再动手**。
5. 课程内容扩展 → 只改 lessons.js；新题目 → 按现有格式写进对应题库文件末尾 concat。
6. 测试用的临时文件（脚本、目录）用完即删，不留进项目。

## 17. 测试原则

每次修改后：
1. 先测新功能，再回归相关旧功能（判题、档案、课程、路线至少抽测）。
2. `node --check` 所有改过的 JS。
3. 浏览器控制台无新增 JS 错误。
4. 涉及课程示例/判题时，用**真实 Python 3.13**（`C:\Users\金金\.workbuddy\binaries\python\versions\3.13.12\python.exe`）验证输出；课程里的"运行结果"必须与真实执行逐字一致。
5. 端到端用 jsdom + Python 桥接（spawnSync 同步返回，见既往测试先例）；file:// 协议下 localStorage 不可用，必须走 HTTP。
6. **测试失败时：先定位根因，不要无休止改代码碰运气。** 区分"应用 bug"与"测试断言写错"。
7. 结束时报告测试结果（通过/失败明细）。

## 18. 当前发布状态

- **未使用 GitHub，未发布到 GitHub。**
- 公网发布走 WorkBuddy 站点部署，链接：`https://fb22641161194a98830aaf61b19ec21c.app.workbuddy.link`（复用沙箱覆盖内容，链接不变）。
- **线上版本落后于本地**：最后一次同步上线在"阶段 1～2 题型系统"完成后；此后新增的 basic-code.js（41 题）、lessons.js（21 门课）、课程页视图、index.html 描述更新**均只在本地，未同步上线**。同步前需用户明确要求。

## 19. 当前开发路线

- ✅ 第一阶段：网站 + 31 题判题 + 代码实验室 + AI 答疑（2026-09-07）
- ✅ 第二阶段：AI 教师 + 成长档案 + 阶段 1～2 题型扩展 + 19 道零基础代码题（2026-09-08～09-09）
- ✅ 第三阶段：课程系统 + 21 门课覆盖阶段 1～5（2026-09-09）
- ✅ 第四阶段：阶段 3～5 的 22 道代码实践题补齐，课程闭环全部打通（2026-09-09）
- ⬜ 下一步：同步线上（需用户明确要求）；顺带核对 variable/datatype 的 stage 标注不一致（见 STATUS §已知问题）
- ⬜ 阶段 6 是否配课待用户决定（当前按 STAGES 定义"学完前 5 阶段再来"，不配课）

## 20. API Key 安全（现状与未来计划）

- 现状：Key 只存浏览器 `localStorage['pla.llmCfg']`，请求由浏览器直连用户配置的服务商；本项目无后端、**不收集、不转发、不持久化 Key 到任何服务器**；仓库/发布内容中不含 Key。
- 未来计划（未实施，需用户确认后再做）：
  1. 输入框加密码型遮蔽 + "仅保存在本机" 明确提示；
  2. 支持"会话内使用、不持久保存"选项；
  3. 若未来加后端代理，Key 必须服务端加密存储，且默认不启用。
