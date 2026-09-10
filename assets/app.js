/* ============================================================
 * Python AI 学习助手 —— 主逻辑
 * ============================================================ */
(function () {
  'use strict';

  const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';
  const LS = {
    done: 'pla.done',
    lab: 'pla.labCode',
    ex: 'pla.exCode',
    cfg: 'pla.llmCfg',
    chat: 'pla.chat',
    profile: 'pla.profile',
    quiz: 'pla.quizAnswer',  // 选择/判断/填空题的作答（增量新增，不影响原有键）
    lesson: 'pla.lesson'     // 课程学习：已读课程记录（第三阶段增量）
  };

  let pyodide = null;
  let currentEx = null;
  // 选择/判断/填空题的作答记录 { 题ID: 选项索引 / true|false / 文本 }
  const quizAnswerMap = JSON.parse(localStorage.getItem(LS.quiz) || '{}');

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  /* ============================================================
   * 学生成长档案（增量新增）
   * 记录：学习等级 / 做题进度 / 正确率 / 错题与薄弱知识点 / 学习行为
   * 存储：localStorage（键 pla.profile），不影响原有任何存储
   * ============================================================ */
  const PROFILE_DEFAULT = {
    done: [],        // 已完成题目 ID
    attempts: 0,     // 判题提交总次数
    passed: 0,       // 一次通过的次数
    topics: {},      // { cat: { name:'函数', mistakes:3, ok:1 } } 知识点统计
    events: [],      // 学习行为记录（最近 300 条）
    failStreak: {},  // { 题目ID: 连续失败次数 }
    mastered: []     // 已掌握的知识点 cat 列表
  };

  function loadProfile() {
    try {
      const p = JSON.parse(localStorage.getItem(LS.profile) || '{}');
      return Object.assign({}, PROFILE_DEFAULT, p);
    } catch (e) {
      return Object.assign({}, PROFILE_DEFAULT);
    }
  }

  let profile = loadProfile();

  function saveProfile() {
    try { localStorage.setItem(LS.profile, JSON.stringify(profile)); } catch (e) { /* 容量超限时静默 */ }
  }

  // 调试模式判定：本地访问 / localStorage pla.debug=1 / window.PLA_DEBUG
  function isDebug() {
    try {
      const h = (location.hostname || '').toLowerCase();
      if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h === '') return true;
      if (localStorage.getItem('pla.debug') === '1') return true;
      return !!window.PLA_DEBUG;
    } catch (e) { return false; }
  }

  // 学习等级：初学者 / 入门 / 熟练
  function calcLevel() {
    const total = (window.EXERCISES || []).length;
    const ratio = total ? profile.done.length / total : 0;
    const acc = accuracy();
    if (ratio >= 0.66 && acc >= 70) return { key: 'skilled', name: '熟练' };
    if (ratio >= 0.25 || acc >= 60) return { key: 'entry', name: '入门' };
    return { key: 'beginner', name: '初学者' };
  }

  // 正确率：一次通过的次数 / 总提交次数
  function accuracy() {
    if (!profile.attempts) return 0;
    return Math.round((profile.passed / profile.attempts) * 100);
  }

  // 薄弱知识点：按错误次数降序
  function weakTopics(limit) {
    return Object.keys(profile.topics)
      .map((k) => Object.assign({ cat: k }, profile.topics[k]))
      .filter((t) => t.mistakes > 0)
      .sort((a, b) => b.mistakes - a.mistakes)
      .slice(0, limit || 3);
  }

  // 学习行为记录
  function recordEvent(type, data) {
    profile.events.push(Object.assign({ t: Date.now(), type: type }, data || {}));
    if (profile.events.length > 300) profile.events = profile.events.slice(-300);
  }

  // 最近错误：从学习行为记录里取最近 N 条 fail / streak_fail
  function recentMistakes(limit) {
    const n = limit || 5;
    return (profile.events || [])
      .filter((e) => e.type === 'fail' || e.type === 'streak_fail')
      .slice(-n)
      .reverse()
      .map((e) => {
        const label = [String(e.topic || '').trim(), String(e.title || e.exId || '').trim()]
          .filter(Boolean).join('·');
        return label + (e.type === 'streak_fail' ? '（连续失败 ' + (e.streak || 2) + ' 次）' : '');
      });
  }

  // 知识点名称：优先用档案里记录的，其次从题库 cat/catName 反查
  function topicName(cat) {
    const t = profile.topics[cat];
    if (t && t.name) return String(t.name).trim();
    const ex = (window.EXERCISES || []).find((e) => e.cat === cat);
    return String((ex && ex.catName) || cat).trim();
  }

  // —— 当前学习阶段：根据已掌握知识点落在哪个阶段 ——
  function currentStage() {
    const stages = window.STAGES || [];
    const mastered = profile.mastered || [];
    let cur = stages[0] || { id: 1, name: 'Python 认识' };
    // 找到第一个「还有知识点没掌握」的阶段
    for (let i = 0; i < stages.length; i++) {
      const pts = stages[i].points || [];
      const allDone = pts.length && pts.every((p) => mastered.indexOf(p) !== -1);
      if (!allDone) { cur = stages[i]; break; }
      cur = stages[i];
    }
    return cur;
  }

  // —— 推荐下一课：优先错得最多的薄弱知识点，否则取当前阶段第一个未掌握知识点 ——
  function recommendNext() {
    const weak = weakTopics(1);
    if (weak.length && weak[0].mistakes >= 2) {
      return { cat: weak[0].cat, name: String(weak[0].name).trim(),
               reason: '你在「' + String(weak[0].name).trim() + '」错了 ' + weak[0].mistakes + ' 次，建议重新学习这个知识点。' };
    }
    const st = currentStage();
    const pts = st.points || [];
    const mastered = profile.mastered || [];
    const next = pts.find((p) => mastered.indexOf(p) === -1);
    if (!next) return { cat: null, name: '', reason: '当前阶段内容已掌握，可以进入下一阶段啦。' };
    const nm = (window.POINTS && window.POINTS[next]) ? window.POINTS[next].name : next;
    return { cat: next, name: nm, reason: '建议继续学习「' + nm + '」。' };
  }

  // —— 各知识点掌握情况（已掌握 / 未掌握），供档案与 AI 使用 ——
  function pointStatus() {
    const ok = [], bad = [];
    Object.keys(profile.topics || {}).forEach((k) => {
      const t = profile.topics[k];
      const nm = String(t.name || k).trim();
      if (profile.mastered && profile.mastered.indexOf(k) !== -1) ok.push(nm);
      else if (t.mistakes > 0) bad.push(nm + '（错 ' + t.mistakes + ' 次）');
    });
    return { ok: ok, bad: bad };
  }

  // 供 AI 使用的学生档案摘要（纯文本，注入 system prompt 与用户消息）
  function profileSummaryForAI() {
    const total = (window.EXERCISES || []).length;
    const lv = calcLevel();
    const weak = weakTopics(3);
    const recent = recentMistakes(5);
    const hasData = profile.attempts > 0 || profile.done.length > 0;
    const lines = [];
    lines.push('【学生信息】');
    lines.push('当前水平：Python' + lv.name);
    lines.push('完成题目：' + profile.done.length + ' / ' + total);
    lines.push('正确率：' + (profile.attempts
      ? accuracy() + '%（提交 ' + profile.attempts + ' 次，一次通过 ' + profile.passed + ' 次）'
      : '暂无记录（该学生还没有任何做题数据）'));
    lines.push('薄弱知识点：' + (weak.length
      ? weak.map((w) => String(w.name).trim() + '（累计错 ' + w.mistakes + ' 次）').join('、')
      : '暂无明显薄弱项'));
    lines.push('最近错误：' + (recent.length ? recent.join('；') : '暂无错误记录'));

    // —— 学习阶段 / 掌握情况 / 推荐下一课（渐进式课程新增）——
    const st = currentStage();
    const ps = pointStatus();
    const rec = recommendNext();
    lines.push('当前学习阶段：阶段' + st.id + '「' + st.name + '」' + (st.desc ? '（' + st.desc + '）' : ''));
    if (ps.ok.length) lines.push('已掌握知识点：' + ps.ok.join('、'));
    if (ps.bad.length) lines.push('未掌握知识点：' + ps.bad.join('、'));
    if (rec.name) lines.push('推荐下一课：' + rec.name + '（' + rec.reason + '）');

    if (profile.mastered && profile.mastered.length) {
      lines.push('已掌握：' + profile.mastered.map((c) => topicName(c)).join('、'));
    }
    if (!hasData) {
      lines.push('（提示：该学生目前没有任何做题记录，请如实说明「目前还没有你的做题记录」，并引导他先完成 1-2 道练习题；不要说你无法查看。）');
    }
    return lines.join('\n');
  }

  // —— 记录一次判题结果（成功 / 失败 / 连续失败 / 掌握知识点）——
  function recordJudge(ex, allPass) {
    if (!ex) return;
    const cat = ex.cat || 'other';
    const name = String(ex.catName || cat).trim();   // catName 可能带尾随空格
    profile.attempts++;

    if (!profile.topics[cat]) profile.topics[cat] = { name: name, mistakes: 0, ok: 0 };

    if (allPass) {
      profile.passed++;
      profile.topics[cat].ok++;
      profile.failStreak[ex.id] = 0;
      if (profile.done.indexOf(ex.id) === -1) profile.done.push(ex.id);
      recordEvent('pass', { exId: ex.id, title: ex.title, topic: name });
      // 掌握判定：该知识点做对 ≥2 次且很少出错
      if (profile.topics[cat].ok >= 2 && profile.topics[cat].mistakes <= 1 &&
          profile.mastered.indexOf(cat) === -1) {
        profile.mastered.push(cat);
        recordEvent('learn', { topic: name, cat: cat });
      }
    } else {
      profile.topics[cat].mistakes++;
      const streak = (profile.failStreak[ex.id] || 0) + 1;
      profile.failStreak[ex.id] = streak;
      recordEvent('fail', { exId: ex.id, title: ex.title, topic: name, streak: streak });
      if (streak >= 2) {
        recordEvent('streak_fail', { exId: ex.id, title: ex.title, topic: name, streak: streak });
      }
    }
    saveProfile();
  }

  // 渲染侧边栏「我的学习」面板
  function renderProfilePanel() {
    const box = document.getElementById('profileCard');
    if (!box) return;
    const total = (window.EXERCISES || []).length;
    const lv = calcLevel();
    const weak = weakTopics(3);
    const el = (id) => document.getElementById(id);

    if (el('pfLevel')) el('pfLevel').textContent = lv.name;
    if (el('pfLevel')) el('pfLevel').className = 'pf-level lv-' + lv.key;
    if (el('pfDone')) el('pfDone').textContent = profile.done.length + ' / ' + total;
    if (el('pfAcc')) el('pfAcc').textContent = profile.attempts ? accuracy() + '%' : '—';

    // 学习阶段 + 推荐下一课（渐进式课程新增）
    if (el('pfStage')) {
      const stg = currentStage();
      el('pfStage').textContent = '阶段' + stg.id + ' · ' + stg.name;
    }
    if (el('pfNext')) {
      const rec = recommendNext();
      el('pfNext').textContent = rec.name
        ? (rec.name + ' — ' + rec.reason)
        : '先做几道题，我来帮你规划 📘';
    }

    const wt = el('pfWeak');
    if (wt) {
      wt.innerHTML = weak.length
        ? weak.map((w) => '<span class="pf-chip" title="累计错 ' + w.mistakes + ' 次">' +
            esc(w.name) + '<i>' + w.mistakes + '</i></span>').join('')
        : '<span class="pf-empty">暂无，继续保持 🎉</span>';
    }
  }


  /* ---------------- Python 侧运行/判题脚本 ---------------- */
  const PY_SETUP = String.raw`
import io, json, contextlib, traceback, builtins, sys

# ---- 行数预算看门狗：防止死循环把浏览器卡死 ----
class _TimeoutError(Exception):
    pass

_BUDGET = [4000000]

def _install_guard():
    _BUDGET[0] = 4000000
    def tracer(frame, event, arg):
        if event == 'line':
            _BUDGET[0] -= 1
            if _BUDGET[0] <= 0:
                raise _TimeoutError('运行超时：可能存在死循环或执行量过大，请检查循环的退出条件')
        return tracer
    sys.settrace(tracer)

def _uninstall_guard():
    sys.settrace(None)

_STDIN = []
_STDIN_I = [0]

def _fake_input(prompt=''):
    if _STDIN_I[0] < len(_STDIN):
        v = _STDIN[_STDIN_I[0]]
        _STDIN_I[0] += 1
        return v
    raise EOFError('输入已耗尽（请在"标准输入"框补充内容）')

builtins.input = _fake_input

def _set_stdin(text):
    global _STDIN
    _STDIN = text.split('\n') if text else []
    _STDIN_I[0] = 0

def _norm(v):
    try:
        return json.dumps(v, sort_keys=True, ensure_ascii=False, default=str)
    except Exception:
        return repr(v)

def _eq(a, b):
    if isinstance(a, bool) != isinstance(b, bool):
        return False
    if isinstance(a, bool):
        return a is b
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return abs(float(a) - float(b)) < 1e-9
    return _norm(a) == _norm(b)

def _run(code, stdin_text):
    _set_stdin(stdin_text or '')
    buf = io.StringIO()
    err = ''
    try:
        _install_guard()
        with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
            exec(compile(code, '<main>', 'exec'), {'__name__': '__main__'})
    except SyntaxError:
        err = traceback.format_exc(limit=2)
    except Exception:
        err = traceback.format_exc(limit=6)
    finally:
        _uninstall_guard()
    return json.dumps({'stdout': buf.getvalue(), 'error': err}, ensure_ascii=False)

def _test(code, tests_json):
    _set_stdin('')
    ns = {'__name__': '__main__'}
    buf = io.StringIO()
    try:
        _install_guard()
        with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
            exec(compile(code, '<solution>', 'exec'), ns)
    except Exception:
        _uninstall_guard()
        return json.dumps({
            'error': traceback.format_exc(limit=6),
            'stdout': buf.getvalue(), 'results': [], 'passed': 0, 'total': 0
        }, ensure_ascii=False)

    results = []
    try:
        for t in json.loads(tests_json):
            kind = t.get('type', 'call')
            name = t.get('name', '用例')
            _BUDGET[0] = 4000000
            try:
                if kind == 'true':
                    val = eval(t['call'], ns)
                    results.append({'name': name, 'ok': bool(val),
                                    'expected': 'True', 'actual': _norm(val)})
                elif kind == 'stdout':
                    b2 = io.StringIO()
                    with contextlib.redirect_stdout(b2), contextlib.redirect_stderr(b2):
                        exec(compile(t['code'], '<test>', 'exec'), ns)
                    out = b2.getvalue().strip()
                    exp = str(t.get('expect', '')).strip()
                    results.append({'name': name, 'ok': out == exp,
                                    'expected': exp, 'actual': out})
                else:
                    actual = eval(t['call'], ns)
                    expected = t.get('expect')
                    results.append({'name': name, 'ok': _eq(actual, expected),
                                    'expected': _norm(expected), 'actual': _norm(actual)})
            except Exception:
                last = traceback.format_exc().strip().split('\n')[-1]
                results.append({'name': name, 'ok': False,
                                'expected': '正常返回结果', 'actual': last})
    finally:
        _uninstall_guard()
    return json.dumps({
        'results': results, 'passed': sum(1 for r in results if r['ok']),
        'total': len(results), 'stdout': buf.getvalue(), 'error': ''
    }, ensure_ascii=False)

def _stdin_test(code, tests_json):
    results = []
    for t in json.loads(tests_json):
        buf = io.StringIO()
        _set_stdin(t.get('stdin', ''))
        err = ''
        try:
            _install_guard()
            with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
                exec(compile(code, '<main>', 'exec'), {'__name__': '__main__'})
        except Exception:
            err = traceback.format_exc(limit=4)
        finally:
            _uninstall_guard()
        out = buf.getvalue().strip()
        exp = str(t.get('expect', '')).strip()
        results.append({'name': t.get('name', '用例'),
                        'ok': (out == exp and not err),
                        'expected': exp,
                        'actual': out or err.strip().split('\n')[-1]})
    return json.dumps({
        'results': results, 'passed': sum(1 for r in results if r['ok']),
        'total': len(results), 'stdout': '', 'error': ''
    }, ensure_ascii=False)
`;

  /* ---------------- 运行时初始化 ---------------- */
  function setRuntime(pct, text, state) {
    $('#rtBar').style.width = pct + '%';
    $('#rtText').textContent = text;
    const dot = $('#rtDot');
    dot.className = 'rt-dot' + (state ? ' ' + state : '');
  }

  async function initPyodide() {
    if (typeof loadPyodide === 'undefined') {
      setRuntime(100, '运行时加载失败', 'err');
      $('#rtTip').textContent = '未能加载 pyodide.js，请检查网络后刷新页面。';
      return;
    }
    let pct = 10;
    const timer = setInterval(() => {
      pct = Math.min(pct + 4, 88);
      setRuntime(pct, '正在下载 Python 运行时…');
    }, 300);

    try {
      pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });
      setRuntime(92, '初始化运行环境…');
      pyodide.runPython(PY_SETUP);
      clearInterval(timer);
      setRuntime(100, 'Python ' + pyodide.version.split(' ')[0] + ' 已就绪', 'ok');
      $('#rtTip').textContent = '代码在浏览器沙箱内执行，不会访问你的本机文件。';
      $('#btnRun').disabled = false;
    } catch (e) {
      clearInterval(timer);
      setRuntime(100, '运行时加载失败', 'err');
      $('#rtTip').textContent = '下载失败：' + e.message + '（需要联网访问 jsdelivr CDN）';
    }
  }

  function pyCall(fn, a, b) {
    pyodide.globals.set('_arg_a', a);
    pyodide.globals.set('_arg_b', b);
    const raw = pyodide.runPython(fn + '(_arg_a, _arg_b)');
    return JSON.parse(String(raw));
  }

  /* ---------------- 视图切换 ---------------- */
  function switchView(view) {
    $$('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
    $$('.view').forEach((v) => v.classList.toggle('active', v.id === 'view-' + view));
  }
  $$('.nav-item').forEach((b) => b.addEventListener('click', () => switchView(b.dataset.view)));

  /* ---------------- 代码实验室 ---------------- */
  const editor = $('#editor');
  const saved = localStorage.getItem(LS.lab);
  if (saved) editor.value = saved;

  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = editor.selectionStart, t = editor.selectionEnd;
      editor.value = editor.value.slice(0, s) + '    ' + editor.value.slice(t);
      editor.selectionStart = editor.selectionEnd = s + 4;
      editor.dispatchEvent(new Event('input'));
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  });
  editor.addEventListener('input', () => localStorage.setItem(LS.lab, editor.value));

  // 示例下拉
  const sel = $('#sampleSelect');
  window.SAMPLES.forEach((s, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = s.name;
    sel.appendChild(o);
  });
  sel.addEventListener('change', () => {
    const s = window.SAMPLES[Number(sel.value)];
    if (s) { editor.value = s.code; localStorage.setItem(LS.lab, s.code); sel.value = ''; runCode(); }
  });

  function esc(s) {
    return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  function renderRun(res) {
    const box = $('#output');
    let html = '';
    if (res.stdout) html += '<div class="out-block out-stdout">' + esc(res.stdout) + '</div>';
    if (res.error) html += '<div class="out-block out-err">' + esc(res.error) + '</div>';
    if (!res.stdout && !res.error) html += '<div class="out-block out-muted">（代码已执行，无输出）</div>';
    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;
    $('#outMeta').textContent = res.error ? '执行出错' : '执行成功';
  }

  function runCode() {
    if (!pyodide) return;
    $('#runLabel').textContent = '运行中…';
    setTimeout(() => {
      try {
        const t0 = performance.now();
        const res = pyCall('_run', editor.value, $('#stdinInput').value);
        res.ms = Math.round(performance.now() - t0);
        renderRun(res);
        $('#outMeta').textContent = res.error ? '执行出错' : `执行成功 · ${res.ms}ms`;
      } catch (e) {
        $('#output').innerHTML = '<div class="out-block out-err">运行异常：' + esc(e.message) + '</div>';
      }
      $('#runLabel').textContent = '运行';
    }, 10);
  }

  $('#btnRun').addEventListener('click', runCode);
  $('#btnClearOut').addEventListener('click', () => {
    $('#output').innerHTML = '<div class="out-placeholder">点击「运行」或按 Ctrl+Enter 执行代码</div>';
    $('#outMeta').textContent = '';
  });
  $('#btnFormatHint').addEventListener('click', () => {
    alert('编辑器快捷键\n\nCtrl + Enter : 运行代码\nTab         : 缩进 4 个空格\n\n提示：浏览器沙箱内没有本地磁盘，\n文件读写可用 io.StringIO 演示。');
  });

  /* ---------------- 练习题库 ---------------- */
  const doneSet = new Set(JSON.parse(localStorage.getItem(LS.done) || '[]'));
  const exCodeMap = JSON.parse(localStorage.getItem(LS.ex) || '{}');
  // 课程学习：已读课程记录 { 知识点: true }（第三阶段增量）
  const lessonReadMap = JSON.parse(localStorage.getItem(LS.lesson) || '{}');

  function saveProgress() {
    const arr = Array.from(doneSet);
    localStorage.setItem(LS.done, JSON.stringify(arr));
    profile.done = arr;          // 同步到学习档案
    saveProfile();
    renderProfilePanel();        // 刷新侧边栏「我的学习」
    if (typeof renderRoadmap === 'function') renderRoadmap();   // 同步刷新学习路线
    const total = window.EXERCISES.length;
    const d = doneSet.size;
    $('#pcRatio').textContent = d + ' / ' + total;
    $('#pcBar').style.width = (total ? (d / total) * 100 : 0) + '%';
  }
  $('#pcReset').addEventListener('click', () => {
    if (!confirm('确定清空所有做题记录和学习档案？')) return;
    doneSet.clear();
    // 同步清空学习档案，避免出现"进度为 0 但档案还有记录"的不一致
    profile = Object.assign({}, PROFILE_DEFAULT, {
      done: [], topics: {}, events: [], failStreak: {}, mastered: []
    });
    saveProfile();
    saveProgress();
    renderExList();
    if (currentEx) renderExDetail(currentEx);
  });

  // 分类筛选：改为按学习阶段筛选（题目已按阶段归类）
  const cats = [];
  window.EXERCISES.forEach((e) => { if (!cats.find((c) => c.id === e.cat)) cats.push({ id: e.cat, name: e.catName }); });
  (window.STAGES || []).forEach((st) => {
    const n = window.EXERCISES.filter((x) => x.stage === st.id).length;
    if (!n) return;
    const o = document.createElement('option');
    o.value = 's' + st.id;
    o.textContent = '阶段' + st.id + '·' + st.name + '（' + n + '）';
    $('#catFilter').appendChild(o);
  });

  // 按「学习阶段 → 知识点」分组展示，让零基础学生看清学习路线
  function renderExList() {
    const filter = $('#catFilter').value;
    const box = $('#exList');
    box.innerHTML = '';
    const stages = window.STAGES || [];
    stages.forEach((st) => {
      const items = window.EXERCISES.filter((e) => e.stage === st.id);
      if (!items.length) return;
      if (filter !== 'all' && filter !== 's' + st.id) return;
      const doneN = items.filter((e) => doneSet.has(e.id)).length;
      const h = document.createElement('div');
      h.className = 'ex-group-title';
      h.innerHTML = '阶段' + st.id + ' · ' + esc(st.name) +
        ' <span style="font-weight:400;opacity:.75">(' + doneN + '/' + items.length + ')</span>';
      box.appendChild(h);
      // 阶段内按知识点再分组
      const seen = [];
      items.forEach((e) => { if (seen.indexOf(e.cat) === -1) seen.push(e.cat); });
      seen.forEach((cat) => {
        const sub = items.filter((x) => x.cat === cat);
        const pn = (window.POINTS && window.POINTS[cat]) ? window.POINTS[cat].name : sub[0].catName;
        const subT = document.createElement('div');
        subT.className = 'ex-point-title';
        subT.textContent = '└ ' + pn;
        box.appendChild(subT);
        sub.forEach((e) => {
          const b = document.createElement('button');
          const typeMark = { choice: '选', bool: '判', fill: '填', code: '码' }[e.type || 'code'];
          b.className = 'ex-item' + (doneSet.has(e.id) ? ' done' : '') +
            (currentEx && currentEx.id === e.id ? ' active' : '');
          b.innerHTML = '<span class="ex-check">✓</span>' +
            '<span class="ex-item-title">' + esc(e.title) + '</span>' +
            '<span class="ex-type t' + (e.type || 'code') + '">' + typeMark + '</span>';
          b.addEventListener('click', () => { currentEx = e; renderExList(); renderExDetail(e); });
          box.appendChild(b);
        });
      });
    });
  }
  $('#catFilter').addEventListener('change', renderExList);

  // 按题型生成答题区（代码题沿用原有编辑器；选择/判断/填空用新的轻量 UI）
  function renderAnswerArea(e) {
    const t = e.type || 'code';
    const saved = quizAnswerMap[e.id];
    if (t === 'choice') {
      let h = '<div class="quiz-box" id="quizBox">';
      (e.options || []).forEach((op, i) => {
        h += '<label class="quiz-opt' + (saved === i ? ' picked' : '') + '">' +
          '<input type="radio" name="qz" value="' + i + '"' + (saved === i ? ' checked' : '') + '>' +
          '<span class="qo-k">' + 'ABCD'[i] + '</span><span class="qo-t">' + esc(op) + '</span></label>';
      });
      h += '</div>';
      return h;
    }
    if (t === 'bool') {
      let h = '<div class="quiz-box" id="quizBox">';
      [[1, '正确'], [0, '错误']].forEach(([v, label]) => {
        const on = saved === (v === 1);
        h += '<label class="quiz-opt' + (on ? ' picked' : '') + '">' +
          '<input type="radio" name="qz" value="' + v + '"' + (on ? ' checked' : '') + '>' +
          '<span class="qo-k">' + (v ? '✓' : '✗') + '</span><span class="qo-t">' + label + '</span></label>';
      });
      h += '</div>';
      return h;
    }
    if (t === 'fill') {
      return '<div class="ex-desc"><b>题目代码：</b></div>' +
        '<pre class="quiz-code">' + esc(e.code || '') + '</pre>' +
        '<div class="quiz-box"><input type="text" class="quiz-input" id="quizInput" placeholder="在这里填写答案" value="' +
        esc(saved === undefined ? '' : saved) + '"></div>';
    }
    // 代码题：有标准输入的题目额外给一个输入框（运行/判题时喂给程序）
    let pre = '';
    if (t === 'code' && e.stdinTests && e.stdinTests.some((t2) => t2.stdin)) {
      pre = '<div class="ex-desc" style="margin-bottom:6px"><b>标准输入（程序运行时会读到这些内容）：</b></div>' +
        '<textarea class="ex-stdin" id="exStdin" spellcheck="false">' +
        esc(e.stdinTests[0].stdin || '') + '</textarea>';
    }
    return pre + '<textarea class="ex-editor" id="exEditor" spellcheck="false"></textarea>';
  }

  /* ---- 渐进式提示：第 1 次给轻提示，连续失败后逐步给更具体的提示 ---- */
  function hintLevel(e) {
    return (profile.failStreak && profile.failStreak[e.id]) || 0;
  }
  // afterFail = true 表示「刚判完且没通过」，此时 failStreak 已 +1，要减回来才是本次该给的层级
  function pickHint(e, afterFail) {
    const list = (e.hints && e.hints.length) ? e.hints : (e.hint ? [e.hint] : []);
    if (!list.length) return '再仔细想想，需要的话可以问 AI 老师。';
    let i = (hintLevel(e) || 0) - (afterFail ? 1 : 0);
    if (i < 0) i = 0;
    if (i > list.length - 1) i = list.length - 1;
    return list[i];
  }
  // 判题失败后刷新提示：第 1 次轻提示 → 第 2 次更具体 → 第 3 次给完整写法
  function refreshHint(e) {
    const box = $('#exHint');
    if (!box) return;
    box.innerHTML = '<b>提示：</b>' + pickHint(e, true);
    box.classList.add('show');
  }

  function renderExDetail(e) {
    const box = $('#exDetail');
    const ioHtml = (e.io || []).map((r) => '<div><b>' + esc(r[0]) + '</b><code>' + esc(r[1]) + '</code></div>').join('');
    const t = e.type || 'code';
    const typeLabel = { code: '代码练习', choice: '选择题', bool: '判断题', fill: '填空题' }[t] || '练习';
    const stage = window.stageOf ? window.stageOf(e.stage) : null;
    const caseCount = t === 'code' ? ((e.tests || []).length + (e.stdinTests || []).length) : 1;
    box.innerHTML =
      '<h2>' + esc(e.title) + '</h2>' +
      '<div class="ex-tags"><span class="tag">' + esc(e.catName) + '</span>' +
      '<span class="tag tag-type">' + typeLabel + '</span>' +
      (stage ? '<span class="tag">阶段' + stage.id + '·' + esc(stage.name) + '</span>' : '') +
      '<span class="tag">' + (t === 'code' ? caseCount + ' 个测试用例' : '单选') + '</span>' +
      (doneSet.has(e.id) ? '<span class="tag" style="background:#e8f7ef;color:#1a9c5b">已完成 ✓</span>' : '') + '</div>' +
      '<div class="ex-desc">' + e.desc + '</div>' +
      ((e.code && t !== 'fill') ? '<pre class="quiz-code">' + esc(e.code) + '</pre>' : '') +
      (ioHtml ? '<div class="ex-io">' + ioHtml + '</div>' : '') +
      renderAnswerArea(e) +
      '<div class="ex-actions">' +
      '<button class="btn btn-primary" id="btnSubmit">' + (t === 'code' ? '提交判题' : '提交答案') + '</button>' +
      '<button class="btn" id="btnHint">查看提示</button>' +
      (t === 'code' ? '<button class="btn" id="btnExRun">运行看看</button>' +
        '<button class="btn" id="btnReset">重置代码</button>' +
        '<button class="btn" id="btnCopyLab">复制到实验室</button>' : '') +
      '</div>' +
      '<div class="ex-hint" id="exHint"><b>提示：</b>' + pickHint(e) + '</div>' +
      '<div id="exResult"></div>';

    // 代码题：初始化编辑器（选择/判断/填空题没有 #exEditor，跳过）
    const ta = $('#exEditor');
    if (ta) {
      ta.value = exCodeMap[e.id] !== undefined ? exCodeMap[e.id] : e.starter;
      ta.addEventListener('keydown', (ev) => {
        if (ev.key === 'Tab') {
          ev.preventDefault();
          const s = ta.selectionStart, t2 = ta.selectionEnd;
          ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(t2);
          ta.selectionStart = ta.selectionEnd = s + 4;
        } else if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
          ev.preventDefault(); submitEx();
        }
      });
    }

    // 选择题 / 判断题：点选项时高亮并记录
    $$('#quizBox input[name="qz"]').forEach((inp) => {
      inp.addEventListener('change', () => {
        $$('#quizBox .quiz-opt').forEach((l) => l.classList.remove('picked'));
        inp.closest('.quiz-opt').classList.add('picked');
        quizAnswerMap[e.id] = (t === 'bool') ? (inp.value === '1') : Number(inp.value);
        localStorage.setItem(LS.quiz, JSON.stringify(quizAnswerMap));
      });
    });
    // 填空题：输入即保存
    const qi = $('#quizInput');
    if (qi) {
      qi.addEventListener('input', () => {
        quizAnswerMap[e.id] = qi.value;
        localStorage.setItem(LS.quiz, JSON.stringify(quizAnswerMap));
      });
      qi.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') submitEx(); });
    }

    $('#btnSubmit').addEventListener('click', submitEx);
    $('#btnHint').addEventListener('click', () => $('#exHint').classList.toggle('show'));
    if ($('#btnReset')) $('#btnReset').addEventListener('click', () => {
      if (!ta) return;
      ta.value = e.starter;
      delete exCodeMap[e.id];
      localStorage.setItem(LS.ex, JSON.stringify(exCodeMap));
      $('#exResult').innerHTML = '';
    });
    if ($('#btnExRun')) $('#btnExRun').addEventListener('click', () => {
      if (!ta) return;
      if (!pyodide) { alert('Python 运行时还在加载，请稍候…'); return; }
      const si = $('#exStdin');
      const r = pyCall('_run', ta.value, si ? si.value : '');
      let h = '<div class="out-block"><div style="font-size:12px;color:var(--text-3);margin-bottom:5px">运行结果</div>';
      h += r.stdout ? '<pre class="out-ok">' + esc(r.stdout) + '</pre>'
                    : '<div class="out-muted">（程序没有任何输出）</div>';
      if (r.error) h += '<div class="out-err">' + esc(r.error) + '</div>';
      h += '</div>';
      $('#exResult').innerHTML = h;
    });
    if ($('#btnCopyLab')) $('#btnCopyLab').addEventListener('click', () => {
      if (!ta) return;
      editor.value = ta.value;
      localStorage.setItem(LS.lab, ta.value);
      switchView('lab');
    });
  }

  // 选择 / 判断 / 填空题：本地判题（不需要 Python 运行时），结果同样进学习档案
  function submitQuiz(e) {
    const t = e.type;
    let picked = quizAnswerMap[e.id];
    let ok = false, your = '（未作答）';

    if (t === 'fill') {
      const el = $('#quizInput');
      picked = el ? el.value.trim() : '';
      quizAnswerMap[e.id] = picked;
      localStorage.setItem(LS.quiz, JSON.stringify(quizAnswerMap));
      const accepts = Array.isArray(e.answer) ? e.answer : [e.answer];
      ok = picked !== '' && accepts.some((a) => String(a).trim().toLowerCase() === picked.toLowerCase());
      your = picked || '（未作答）';
    } else if (t === 'bool') {
      if (picked === undefined) picked = null;
      ok = picked === !!e.answer;
      your = picked === null ? '（未作答）' : (picked ? '正确' : '错误');
    } else {
      if (picked === undefined) picked = null;
      ok = picked === e.answer;
      your = picked === null ? '（未作答）' : ('ABCD'[picked] + '. ' + (e.options[picked] || ''));
    }

    // 学习档案：与代码题共用同一套记录逻辑（错题/薄弱知识点/事件）
    try { recordJudge(e, ok); } catch (pe) { /* 忽略 */ }

    const right = t === 'bool' ? (e.answer ? '正确' : '错误') : ('ABCD'[e.answer] + '. ' + (e.options ? e.options[e.answer] : ''));
    const fillRight = t === 'fill' ? (Array.isArray(e.answer) ? e.answer[0] : e.answer) : '';
    let html = '<div class="test-result"><div class="tr-head ' + (ok ? 'pass' : 'fail') + '">' +
      '<span>' + (ok ? '回答正确 🎉' : '再想想～') + '</span><span>' + (ok ? '1 / 1' : '0 / 1') + '</span></div>';
    html += '<div class="tr-item"><span class="tr-flag ' + (ok ? 'pass' : 'fail') + '">' +
      (ok ? '通过' : '失败') + '</span><div class="tr-body"><div class="tr-name">你的答案</div>' +
      '<div class="tr-diff"><span class="k">你选：</span><span class="act">' + esc(your) + '</span></div>' +
      '<div class="tr-diff"><span class="k">正确：</span><span class="exp">' +
      esc(t === 'fill' ? fillRight : right) + '</span></div></div></div>';
    html += '<div class="quiz-explain"><b>解析：</b>' + e.explain + '</div></div>';
    $('#exResult').innerHTML = html;

    if (!ok) refreshHint(e);   // 答错了：先给轻提示，连续失败再逐步给更明确的提示

    if (ok) {
      const isNew = !doneSet.has(e.id);
      doneSet.add(e.id);
      saveProgress();
      renderExList();
      if (isNew) {
        const tags = $('#exDetail .ex-tags');
        if (tags && !tags.textContent.includes('已完成')) {
          tags.insertAdjacentHTML('beforeend', '<span class="tag" style="background:#e8f7ef;color:#1a9c5b">已完成 ✓</span>');
        }
      }
    }
  }

  function submitEx() {
    const e = currentEx;
    // 非代码题：本地判题，不依赖 Pyodide
    if (e && e.type && e.type !== 'code') { submitQuiz(e); return; }
    if (!pyodide) { alert('Python 运行时还在加载，请稍候…'); return; }
    const code = $('#exEditor').value;
    exCodeMap[e.id] = code;
    localStorage.setItem(LS.ex, JSON.stringify(exCodeMap));

    $('#btnSubmit').textContent = '判题中…';
    setTimeout(() => {
      let res;
      try {
        if (e.stdinTests && e.stdinTests.length) {
          res = pyCall('_stdin_test', code, JSON.stringify(e.stdinTests));
        } else {
          res = pyCall('_test', code, JSON.stringify(e.tests || []));
        }
      } catch (err) {
        $('#exResult').innerHTML = '<div class="out-err">判题异常：' + esc(err.message) + '</div>';
        $('#btnSubmit').textContent = '提交判题';
        return;
      }

      const allPass = res.total > 0 && res.passed === res.total;

      // 学习档案：记录本次判题结果（包了 try，档案异常绝不影响判题展示）
      try { recordJudge(e, allPass); } catch (pe) { /* 忽略 */ }

      let html = '<div class="test-result"><div class="tr-head ' + (allPass ? 'pass' : 'fail') + '">' +
        '<span>' + (allPass ? '全部通过 🎉' : '未通过') + '</span>' +
        '<span>' + res.passed + ' / ' + res.total + '</span></div>';

      if (res.error) {
        html += '<div class="tr-item"><span class="tr-flag fail">错误</span><div class="tr-body">' +
          '<div class="tr-diff">' + esc(res.error) + '</div></div></div>';
      }
      (res.results || []).forEach((r) => {
        html += '<div class="tr-item"><span class="tr-flag ' + (r.ok ? 'pass' : 'fail') + '">' +
          (r.ok ? '通过' : '失败') + '</span><div class="tr-body">' +
          '<div class="tr-name">' + esc(r.name) + '</div>';
        if (!r.ok) {
          html += '<div class="tr-diff"><span class="k">期望：</span><span class="exp">' + esc(r.expected) + '</span></div>' +
            '<div class="tr-diff"><span class="k">实际：</span><span class="act">' + esc(r.actual) + '</span></div>';
        }
        html += '</div></div>';
      });
      const expHtml = e.explanation || e.explain;   // 代码题解析（旧题没有该字段则跳过）
      if (expHtml) html += '<div class="quiz-explain"><b>解析：</b>' + expHtml + '</div>';
      html += '</div>';
      $('#exResult').innerHTML = html;

      if (!allPass) refreshHint(e);   // 未通过：先轻提示，连续失败后提示逐步具体

      if (allPass) {
        const isNew = !doneSet.has(e.id);
        doneSet.add(e.id);
        saveProgress();
        renderExList();
        if (isNew) {
          const tags = $('#exDetail .ex-tags');
          if (tags && !tags.textContent.includes('已完成')) {
            tags.insertAdjacentHTML('beforeend', '<span class="tag" style="background:#e8f7ef;color:#1a9c5b">已完成 ✓</span>');
          }
        }
      }
      $('#btnSubmit').textContent = '提交判题';
    }, 10);
  }

  /* ---------------- 极简 Markdown 渲染 ---------------- */
  function mdToHtml(text) {
    const blocks = [];
    let s = String(text).replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
      blocks.push('<pre>' + esc(code.replace(/\n$/, '')) + '</pre>');
      return '\u0000B' + (blocks.length - 1) + '\u0000';
    });

    const lines = s.split('\n');
    const out = [];
    let inList = false, table = null;

    const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
    const flushTable = () => {
      if (!table) return;
      let h = '<table style="border-collapse:collapse;margin:8px 0;font-size:12.5px">';
      table.rows.forEach((r, i) => {
        h += '<tr>' + r.map((c) => '<td style="border:1px solid #e6e8ef;padding:5px 9px">' +
          (i === 0 ? '<b>' + c + '</b>' : c) + '</td>').join('') + '</tr>';
      });
      h += '</table>';
      out.push(h);
      table = null;
    };

    const inline = (t) => t
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

    for (const raw of lines) {
      const line = raw.trimEnd();
      if (/^\s*\|.*\|\s*$/.test(line)) {
        closeList();
        const cells = line.trim().slice(1, -1).split('|').map((c) => inline(c.trim()));
        if (/^[\s:-]+$/.test(cells.join('').replace(/<[^>]+>/g, ''))) continue;
        if (!table) table = { rows: [] };
        table.rows.push(cells);
        continue;
      }
      flushTable();

      if (!line.trim()) { closeList(); continue; }
      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        closeList();
        out.push('<div style="font-weight:650;margin:10px 0 4px;font-size:' +
          [16, 15, 14, 13][h[1].length - 1] + 'px">' + inline(h[2]) + '</div>');
        continue;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        if (!inList) { out.push('<ul style="margin:6px 0;padding-left:20px">'); inList = true; }
        out.push('<li style="margin:3px 0">' + inline(line.replace(/^\s*[-*]\s+/, '')) + '</li>');
        continue;
      }
      closeList();
      out.push('<div style="margin:5px 0">' + inline(line) + '</div>');
    }
    closeList();
    flushTable();

    return out.join('').replace(/\u0000B(\d+)\u0000/g, (_, i) => blocks[Number(i)]);
  }

  /* ---------------- AI 答疑 ---------------- */
  const cfg = JSON.parse(localStorage.getItem(LS.cfg) || '{"base":"","key":"","model":""}');
  let chatHistory = JSON.parse(localStorage.getItem(LS.chat) || '[]');

  function hasCfg() { return !!(cfg.base && cfg.key && cfg.model); }

  function updateModeTip() {
    $('#chatModeTip').textContent = hasCfg()
      ? '已接入大模型：' + cfg.model
      : '未配置 API，当前使用内置知识库离线回答（点击右上角「模型设置」接入大模型）';
  }

  function addMsg(role, html, src) {
    const box = $('#chatMsgs');
    const d = document.createElement('div');
    d.className = 'msg ' + role;
    d.innerHTML = '<div class="msg-avatar">' + (role === 'ai' ? 'AI' : '我') + '</div>' +
      '<div class="msg-body">' + html + (src ? '<div class="msg-src">' + src + '</div>' : '') + '</div>';
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
    return d;
  }

  function restoreChat() {
    if (!chatHistory.length) {
      addMsg('ai', '你好！我是一名耐心的 Python 编程老师 👋<br>' +
        '我不只会给你答案，更会带着你：<b>先懂原理 → 再写代码 → 自己调错</b>。<br><br>' +
        '你可以：<br>' +
        '&nbsp;• 问我语法 / 概念（如"什么是装饰器"）<br>' +
        '&nbsp;• 把报错信息贴给我，我带你一起排查<br>' +
        '&nbsp;• 贴上你写的代码，我会先讲它做了什么、再指出问题<br>' +
        '&nbsp;• 问"这道题怎么做"——我通常先给你提示，让你自己试试<br><br>' +
        (hasCfg() ? '已接入大模型：<b>' + cfg.model + '</b>，随时可自由问答。' :
          '当前是<b>离线知识库</b>模式（覆盖常见问题）。想让老师"自由发挥"、按你的情况因材施教，点右上角「模型设置」填入 API 即可。'), '');
      return;
    }
    chatHistory.forEach((m) => addMsg(m.role, m.html, m.src));
  }

  function kbAnswer(q) {
    const text = q.toLowerCase();
    let best = null, bestScore = 0;
    window.KB.forEach((item) => {
      let score = 0;
      item.k.forEach((k) => { if (text.includes(k.toLowerCase())) score += k.length; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    if (!best) {
      const topics = window.KB.slice(0, 8).map((x) => '· ' + x.q).join('<br>');
      const miss = '这个问题超出了内置知识库范围。你可以：' +
        '<br><br>1️⃣ 点右上角「<b>模型设置</b>」接入大模型，获得自由问答能力' +
        '<br>2️⃣ 换个问法，或试试这些内置话题：<br><br>' + topics;
      return { text: miss, html: miss, src: '离线知识库 · 未命中' };
    }
    return { text: best.a, html: mdToHtml(best.a), src: '离线知识库 · ' + best.q };
  }

  /* ---------- 档案查询：无论是否接大模型，都能基于学生档案回答 ---------- */
  // 命中「我的学习记录 / 薄弱点 / 进度 / 正确率」等档案查询意图时，优先走这里，
  // 保证不依赖大模型、也不依赖记忆，直接基于本地档案给出分析与建议。
  function isProfileQuery(q) {
    const t = q.toLowerCase();
    // 必须有"我/我的 + 学习/记录/进度/薄弱/正确率/错题/复习"这类自我档案查询语义，
    // 且偏向询问档案状态（而不是问知识点本身）。
    const profileIntent = /(我的|我)?(学习记录|学习档案|学习情况|做题情况|哪些题|做过的题)/.test(q) ||
      /(薄弱点|薄弱项|弱项|薄弱知识|哪里(不会|不熟)|哪块|什么(不会|不熟|薄弱))/.test(q) ||
      /(我的)?(学习进度|进度|正确率|完成.*题|做了几道|做了多少)/.test(q) ||
      /(我的)?(错题|错误记录|最近错|错过.*题)/.test(q) ||
      /(根据|看|查|翻)?(我|本学生|档案).*(学习|记录|档案)/.test(q);
    // 排除明显的纯概念提问（避免把"字典哪里不会"等误判成查档案）
    if (/什么是|怎么理解|如何用|教程|函数是|列表是/.test(q)) return false;
    return profileIntent;
  }

  // 生成基于档案的回答（纯文本，由调用方决定是否走模型）
  function profileQueryAnswer(q) {
    const total = (window.EXERCISES || []).length;
    const lv = calcLevel();
    const weak = weakTopics(4);
    const hasData = profile.attempts > 0 || profile.done.length > 0;

    if (!hasData) {
      return '你目前还没有任何做题记录，所以我暂时看不到你的薄弱点。建议先去「代码练习」做 1-2 道题，我就会自动记录并帮你分析啦。';
    }
    const lines = [];
    lines.push('根据你的学习档案：');
    lines.push('· 当前水平：Python' + lv.name);
    lines.push('· 已完成：' + profile.done.length + ' / ' + total + ' 题');
    lines.push('· 正确率：' + accuracy() + '%（提交 ' + profile.attempts + ' 次，一次通过 ' + profile.passed + ' 次）');
    if (weak.length) {
      lines.push('· 薄弱知识点：' + weak.map((w) => String(w.name).trim() + '（累计错 ' + w.mistakes + ' 次）').join('、'));
    } else {
      lines.push('· 薄弱知识点：目前没有明显短板，继续保持！');
    }
    const recent = recentMistakes(3);
    if (recent.length) lines.push('· 最近出错：' + recent.join('；'));

    // 针对薄弱点给出具体复习建议（复用题库同名知识点的解释思路）
    if (weak.length) {
      const top = weak[0];
      lines.push('');
      lines.push('建议你先从「' + String(top.name).trim() + '」补起——它错得最多。');
      lines.push('可以从基础概念重新过一遍：它是什么、用来解决什么问题，再手写 1-2 个最小例子验证。想让我从最基础带你复习这个知识点吗？');
    } else {
      lines.push('');
      lines.push('你现在状态不错，想再进步的话，可以从「' + (profile.done.length >= total ? '已全部完成，尝试挑战更难的算法题' : '未完成的题目') + '」继续。');
    }
    return lines.join('\n');
  }

  /* ---------------- 渐进式求助：识别学生是第几次开口求助 ---------------- */
  // 明确索取答案：必须出现「答案 / 完整代码 / 直接给」这类强诉求，
  // 不能只因为句子里出现「代码」二字就误判（否则"帮我看看这段代码"会被当成要答案）
  const RE_WANT_ANSWER = /(完整|标准|最终|正确)?的?(答案|完整代码|完整实现|完整写法)|直接(给|告诉|说|把)|别提示|不要提示|不用提示|把答案|给个答案|告诉我吧/;
  // 一般性求助信号
  const RE_NEED_HELP = /(不会|不懂|不明白|不知道|没思路|没头绪|卡住|求助|提示|怎么做|怎么办|怎么写|如何做|帮帮我|教教我)/;
  // 完全不会 / 零基础
  const RE_ZERO = /(完全不会|一点都不会|什么都不懂|零基础|从零开始|从最基础|我是小白|纯新手|第一次学|啥也不会)/;

  // 从最近的对话尾部往前，统计连续求助了几次（遇到学生自己的尝试/回答就归零）
  function countHelpTurns() {
    let n = 0;
    for (let i = chatHistory.length - 1; i >= 0; i--) {
      if (chatHistory[i].role !== 'user') continue;
      const t = chatHistory[i].text || '';
      if (RE_WANT_ANSWER.test(t)) return 3;
      if (RE_NEED_HELP.test(t)) { n++; if (n >= 3) return 3; continue; }
      break;
    }
    return n;
  }

  // 生成给 AI 的教学上下文前缀（不展示给学生，仅用于 system/user 指令）
  function buildTeachContext(question) {
    let ctx = '';
    // 学生是在查询自己的档案（薄弱点/进度/正确率等）——提醒模型基于【学生信息】作答
    if (isProfileQuery(question)) {
      ctx += '【档案查询】学生正在询问自己的学习档案（薄弱点/进度/正确率等）。请直接基于消息中的【学生信息】给出具体分析与复习建议，不要说你无法查看。\n';
    }
    if (RE_WANT_ANSWER.test(question)) {
      ctx += '【求助层级】学生明确要求直接给答案 → 可以给完整答案，但必须附完整解释。\n';
    } else {
      const lv = countHelpTurns();
      if (lv >= 3) {
        ctx += '【求助层级】第 ' + lv + ' 次求助 → 学生已多次尝试未果，可以给完整答案，但必须附完整解释。\n';
      } else if (lv === 2) {
        ctx += '【求助层级】第 2 次求助 → 给更具体的提示（关键步骤，可给 1-3 行关键代码片段），仍不要给完整答案。\n';
      } else if (lv === 1) {
        ctx += '【求助层级】第 1 次求助 → 只给方向性提示（该用什么知识点、什么思路），不给代码。\n';
      }
    }
    if (RE_ZERO.test(question)) {
      ctx += '【学生状态】学生表示完全不会 / 零基础 → 从最基础讲起，第一步要小到他能立刻动手。\n';
    }
    return ctx ? ctx + '\n' : '';
  }

  async function aiAnswer(question) {
    // 教学人格：扮演耐心、专业的 Python 老师（帮助初学者学习，而非替写作业）
    const sys = [
      '# 角色',
      '你是一名耐心、专业的 Python 编程老师，代号「Python AI 教师」。你的任务是帮助学生学会 Python，而不是替学生完成代码或作业。',
      '核心信条：宁可让学生多想一分钟，也不要让他少学一个知识点。',
      '',
      '# 学生画像',
      '学生是 Python 初学者，有一点基础，但很多知识还不熟。',
      '- 默认使用简单、自然、口语化的中文。',
      '- 绝不假设学生已经掌握高级知识（装饰器、生成器、元类、异步、魔法方法等）；一旦涉及，先用一句大白话解释它是什么。',
      '',
      '# 核心节奏（每次回复都要遵循）',
      '解释 → 小例子 → 提问 → 等学生回答 → 再决定下一步。',
      '一次只推进一小步，禁止一口气输出长篇教程。',
      '',
      '# 硬性约束',
      '1.【长度】单次回复控制在 300 字以内 + 1 个不超过 10 行的小例子；学生明确要求详细讲解时才可放宽。',
      '2.【结尾】除学生明确要答案的情况外，每条回复必须以一个简单问题结尾，把思考的机会还给学生。',
      '3.【代码】代码一律用 ```python 代码块包裹；优先给最小可运行片段，不要给完整大工程。',
      '',
      '# 分场景规则',
      '',
      '## A. 学生问知识点 / 概念',
      '- 第一步：先判断他的理解程度（可简短问一句，或直接按零基础来假设）。',
      '- 第二步：用生活化类比 + 简单语言解释。',
      '- 第三步：给一个非常小的代码例子（不超过 10 行），并逐行说明。',
      '- 第四步：最后提一个简单问题，让他思考或动手。',
      '',
      '## B. 学生发送代码',
      '- 第一步：先说出「这段代码想实现的是……」，确认你理解了他的意图。',
      '- 第二步：肯定其中写得对、值得肯定的部分。',
      '- 第三步：如果有错误，指出错误位置并解释为什么会错。',
      '- 第四步：不要一开始就给完整正确答案。先给修改思路，或只给最小改动片段，引导他自己改。',
      '- 第五步：只有当学生明确要求「直接给改好的代码」时，才给出完整修改版，并逐处解释改动原因。',
      '- 第六步：最后给一个类似的小练习让他巩固。',
      '',
      '## C. 学生做题遇到困难（渐进式帮助，必须严格遵守）',
      '依据学生消息前的【求助层级】标记来判断：',
      '- 第 1 次求助：只给方向性提示（该用哪个知识点、什么思路），不给代码。',
      '- 第 2 次求助：给更具体的提示（关键步骤，可给 1-3 行关键代码片段），仍不给完整答案。',
      '- 第 3 次及以后，或学生明确说「直接告诉我答案 / 给我完整代码」：给出完整答案，但必须附带完整解释（为什么这样写、每一步在做什么）。',
      '- 学生说「我完全不会 / 零基础 / 从最基础开始」：从最基础的概念讲起，第一步要小到他能立刻动手。',
      '',
      '## D. 学生给出回答或代码后',
      '- 答对了：明确告诉他为什么对（点出关键的那一行或那个概念），肯定他的思路，再顺势推进一小步。',
      '- 答错了：不要说「错了」。先肯定思路里合理的部分，再解释为什么会得到这个结果，然后用提问引导他重新思考（例如「你觉得这里 a 的值会是多少？」）。',
      '- 连续 2 次以上犯同类错误：温和提醒他这个知识点可能还没掌握牢，换更基础的方式重讲一遍，并配一个小练习巩固。',
      '',
      '## E. 学生发送报错信息（Debug）',
      '- 第一步：用白话说明这是什么类型的错误（例如「这是把文字当数字用了」）。',
      '- 第二步：指出最可能出问题的位置（行号或变量名）。',
      '- 第三步：解释为什么会出现这个错误。',
      '- 第四步：给出修改方法（先给思路，不急着给完整代码）。',
      '- 第五步：告诉他以后遇到同类错误该如何自己排查。',
      '',
      '# 求助层级标记说明',
      '学生消息前可能出现一行标记，例如：【求助层级】第 2 次求助。',
      '它表示这是学生针对当前问题的第几次求助，请严格按上面 C 规则匹配回应级别。没有该标记时，按第 1 次求助处理。',
      '',
      '# 绝对禁止',
      '- 学生一提问就甩出完整可运行代码。',
      '- 一次堆砌大量知识点、长篇大论。',
      '- 直接说「你错了」「这很简单」「这么简单都不会」。',
      '- 使用学生没学过的术语却不解释。',
      '- 替学生完成作业或练习题的完整实现（除非他明确要答案）。',
      '',
      '# 语言与语气',
      '始终使用中文。语气耐心、友好、鼓励，不嘲笑学生的任何错误。',
      '学生卡住时给台阶下（例如「这个坑很多人第一次都会踩」），把错误当成学习机会。',
      '遇到专业术语时，先用简单中文解释一遍再使用。',
      '',
      '# 学生档案使用规则（每次回答前必读）',
      '本系统会在每条消息里实时提供【学生信息】，包含学生的当前水平、完成题量、正确率、薄弱知识点和最近错误。这些数据是本系统实时读取的真实记录，就是你所掌握的该学生学习情况。',
      '',
      '## 0. 数据来源与身份（最高优先级）',
      '- 你拥有当前学生档案提供的信息，请直接使用它进行分析和教学。',
      '- 严禁说「我是语言模型」「我没有记忆能力」「每次对话都是独立的」「我无法查看你的学习记录」「我不记得你」这类话——这会直接让学生失去信任。',
      '- 也不要反过来声称自己拥有跨会话的长期记忆；你只需要、也只应该使用本次消息中提供的档案数据作答。',
      '- 当学生询问「我的学习记录 / 我的薄弱点 / 我的进度 / 我的正确率」时，必须基于【学生信息】直接给出具体分析与复习建议。',
      '  示例回答：「你目前『函数与作用域』错得最多（累计 5 次），建议先复习函数参数和 return 的用法。」',
      '- 若档案显示暂无记录，如实说明「目前还没有你的做题记录」，并引导他先去做 1-2 道题；同样不要说「我无法查看」。',
      '',
      '## 1-5. 教学调整',
      '1. 按「当前水平」调整解释深度：初学者多用生活类比、一次只讲一个点；入门可适当引入术语；熟练才可以讨论进阶写法和性能取舍。',
      '2. 若本次问题涉及学生的薄弱知识点，先用 1-2 句话帮他复习最基础的概念，再进入正题，不要一上来就展开。',
      '3. 不要假设学生懂高级概念（装饰器、生成器、异步、魔法方法等），用到必须先用白话解释。',
      '4. 本段规则与前面所有教学规则**叠加生效**，不覆盖它们：仍然要用简单中文、先解释、给小例子、引导学生思考、不直接甩完整答案。',
      '5. 当你判断学生刚刚真正掌握某个知识点时，可以在结尾用一句简短的话鼓励他，不要长篇总结。',
      '',
      '## 6. 学习阶段感知（渐进式课程）',
      '- 【学生信息】里会给出「当前学习阶段」「已掌握/未掌握知识点」「推荐下一课」，请据此调整教学。',
      '- 学生处于阶段 1-2（刚入门）时，**不要**主动展开装饰器、生成器、闭包、元类、异步等高级概念；',
      '  若学生问到，先说「这个属于后面的进阶内容」，再用最生活化的比喻一句话带过，并建议他先巩固当前阶段。',
      '- 学生问的知识点正好是他的「薄弱知识点」或「未掌握知识点」时，先用 1-2 句复习最基础的概念再展开。',
      '- 学生问「什么是列表」这类基础概念时：简单中文解释 → 一个生活类比 → 一个不超过 10 行的小例子 → 最后提一个小问题让他思考。',
      '- 可以在合适时机提醒他「你现在的推荐下一课是 XXX」，但不要每句话都提。',
    ].join('\n');

    // —— 每次请求都重新读取一次档案，确保拿到最新数据 ——
    try { profile = loadProfile(); } catch (e) { /* 读取失败则沿用内存中的档案 */ }
    const summary = profileSummaryForAI();

    const messages = [{ role: 'system', content: sys + '\n\n' + summary }];

    // 历史消息：排除掉刚刚推入的当前提问，避免同一句话在末尾重复出现两次
    const hist = chatHistory.slice();
    if (hist.length && hist[hist.length - 1].role === 'user' &&
        hist[hist.length - 1].text === question) {
      hist.pop();
    }
    hist.slice(-6).forEach((m) => {
      const content = (m.role === 'user' ? m.text : m.text) || '';
      if (content) messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: content });
    });

    // 用户消息：档案 + 【学生问题】，保证模型在作答前一定能看到最新档案
    messages.push({
      role: 'user',
      content: summary + '\n\n【学生问题】\n' + buildTeachContext(question) + question
    });

    const base = cfg.base.replace(/\/+$/, '');
    const url = /\/chat\/completions$/.test(base) ? base : base + '/chat/completions';

    // —— 调试模式：localhost / 127.0.0.1 / localStorage pla.debug=1 / window.PLA_DEBUG ——
    if (isDebug()) {
      console.log('%c[AI 请求] ① 当前学生档案 pla.profile',
        'color:#2563eb;font-weight:bold', JSON.parse(JSON.stringify(profile)));
      console.log('%c[AI 请求] ② 注入模型的档案摘要',
        'color:#2563eb;font-weight:bold', '\n' + summary);
      console.log('%c[AI 请求] ③ 最终发送给模型的 messages',
        'color:#2563eb;font-weight:bold', messages);
      console.log('%c[AI 请求] ④ 请求地址与模型',
        'color:#2563eb;font-weight:bold', url, cfg.model);
      window.__PLA_LAST_MESSAGES = messages;   // 方便在控制台手动检查
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
      body: JSON.stringify({ model: cfg.model, messages, temperature: 0.3 })
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error('HTTP ' + res.status + ' ' + t.slice(0, 200));
    }
    const data = await res.json();
    return data.choices[0].message.content;
  }

  async function send() {
    const input = $('#chatInput');
    const q = input.value.trim();
    if (!q) return;
    input.value = '';

    addMsg('user', esc(q), '');
    chatHistory.push({ role: 'user', text: q, html: esc(q), src: '' });

    // 学习档案：记录一次 AI 求助（含求助层级）
    try {
      recordEvent('ask_ai', { helpLevel: countHelpTurns(), level: calcLevel().name, brief: q.slice(0, 60) });
      saveProfile();
    } catch (pe) { /* 忽略 */ }

    const typing = addMsg('ai', '<span class="typing"><span></span><span></span><span></span></span>', '');

    let html, src, raw;
    try {
      if (hasCfg()) {
        const answer = await aiAnswer(q);
        raw = answer;                       // 保存原始文本，供后续多轮对话使用
        html = mdToHtml(answer);
        src = 'AI · ' + cfg.model;
      } else if (isProfileQuery(q)) {
        // 离线：基于本地学生档案直接回答（不强依赖大模型 / 模型记忆）
        const r = profileQueryAnswer(q);
        raw = r;
        html = mdToHtml(r);
        src = '学习档案';
      } else {
        const r = kbAnswer(q);
        raw = String(r.html || '').replace(/<[^>]*>/g, '');
        html = r.html;
        src = r.src;
      }
    } catch (e) {
      const r = kbAnswer(q);
      raw = String(r.html || '').replace(/<[^>]*>/g, '');
      html = '<div style="color:#d64545;margin-bottom:8px">大模型调用失败：' + esc(e.message) +
        '<br>已自动回退到离线知识库。</div>' + r.html;
      src = '离线兜底';
    }

    typing.querySelector('.msg-body').innerHTML = html + (src ? '<div class="msg-src">' + esc(src) + '</div>' : '');
    // 注意：text 必须是 AI 的回答原文，之前误存成了学生的问题，导致多轮对话错乱
    chatHistory.push({ role: 'ai', text: raw || '', html, src });
    localStorage.setItem(LS.chat, JSON.stringify(chatHistory.slice(-40)));
  }

  $('#btnSend').addEventListener('click', send);
  $('#chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  $('#btnAskCode').addEventListener('click', () => {
    const code = editor.value.trim();
    if (!code) { alert('代码实验室里还没有内容'); return; }
    const ta = $('#chatInput');
    ta.value = (ta.value ? ta.value + '\n\n' : '') + '帮我看看这段代码：\n```python\n' + code + '\n```';
    ta.focus();
  });

  const QUICK = ['Python 学习路线怎么安排？', 'list 和 tuple 有什么区别？', '装饰器怎么理解？', '为什么报 IndentationError？'];
  const quickBox = $('#chatQuick');
  QUICK.forEach((q) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = q;
    b.addEventListener('click', () => { $('#chatInput').value = q; send(); });
    quickBox.appendChild(b);
  });

  /* ---------------- 设置弹窗 ---------------- */
  $('#btnSettings').addEventListener('click', () => {
    $('#cfgBase').value = cfg.base || '';
    $('#cfgKey').value = cfg.key || '';
    $('#cfgModel').value = cfg.model || '';
    $('#modalMask').classList.add('show');
  });
  $('#cfgCancel').addEventListener('click', () => $('#modalMask').classList.remove('show'));
  $('#modalMask').addEventListener('click', (e) => { if (e.target.id === 'modalMask') $('#modalMask').classList.remove('show'); });
  $('#cfgSave').addEventListener('click', () => {
    cfg.base = $('#cfgBase').value.trim();
    cfg.key = $('#cfgKey').value.trim();
    cfg.model = $('#cfgModel').value.trim();
    localStorage.setItem(LS.cfg, JSON.stringify(cfg));
    $('#modalMask').classList.remove('show');
    updateModeTip();
  });
  $('#cfgClear').addEventListener('click', () => {
    cfg.base = cfg.key = cfg.model = '';
    localStorage.setItem(LS.cfg, JSON.stringify(cfg));
    ['#cfgBase', '#cfgKey', '#cfgModel'].forEach((s) => { $(s).value = ''; });
    $('#modalMask').classList.remove('show');
    updateModeTip();
  });

  /* ---------------- 学习路线（渐进式课程） ---------------- */
  // 统计某知识点的掌握状态：已掌握 / 学习中 / 未开始
  function pointState(cat) {
    const mastered = profile.mastered || [];
    if (mastered.indexOf(cat) !== -1) return 'ok';
    const t = (profile.topics || {})[cat];
    if (t && (t.mistakes > 0 || t.ok > 0)) return 'doing';
    return 'todo';
  }

  function renderRoadmap() {
    const box = document.getElementById('roadmapList');
    if (!box || !window.STAGES) return;
    const cur = currentStage();
    const rec = recommendNext();

    const rn = document.getElementById('rmNext');
    if (rn) rn.textContent = rec.name ? (rec.name + ' — ' + rec.reason) : '先做几道题，我来帮你规划 📘';

    let h = '';
    window.STAGES.forEach((st) => {
      const pts = st.points || [];
      const donePts = pts.filter((p) => pointState(p) === 'ok').length;
      const pct = pts.length ? Math.round(donePts / pts.length * 100) : 0;
      const isCur = cur && cur.id === st.id;
      h += '<div class="rm-stage' + (isCur ? ' cur' : '') + (pct === 100 ? ' done' : '') + '">';
      h += '<div class="rm-head"><span class="rm-no">阶段 ' + st.id + '</span>' +
        '<b>' + esc(st.name) + '</b>' +
        (isCur ? '<span class="rm-badge">学习中</span>' : (pct === 100 ? '<span class="rm-badge ok">已完成</span>' : '')) +
        '<span class="rm-pct">' + donePts + '/' + pts.length + '</span></div>';
      h += '<div class="rm-desc">' + esc(st.desc || '') + '</div>';
      h += '<div class="rm-bar"><i style="width:' + pct + '%"></i></div>';
      h += '<div class="rm-points">';
      pts.forEach((p) => {
        const stt = pointState(p);
        const nm = (window.POINTS && window.POINTS[p]) ? window.POINTS[p].name : p;
        const t = (profile.topics || {})[p];
        const wrong = t ? t.mistakes : 0;
        const les = window.lessonOf ? window.lessonOf(p) : null;   // 有课程的知识点
        let mark = stt === 'ok' ? '✅' : (stt === 'doing' ? '📖' : '⬜');
        if (les && stt !== 'ok') mark = lessonReadMap[p] ? '📗' : '📘';
        h += '<button class="rm-pt ' + stt + '" data-cat="' + esc(p) + '" title="' +
          (les ? '有完整课程，点击上课' : '点击去做练习') + '">' + mark + ' ' + esc(nm) +
          (les ? '<u class="rm-les">' + (lessonReadMap[p] ? '已学' : '有课') + '</u>' : '') +
          (wrong ? '<i>错' + wrong + '次</i>' : '') + '</button>';
      });
      h += '</div></div>';
    });
    box.innerHTML = h;

    // 点知识点 → 有课程先进课程页；没有课程则保持原行为（直接进该知识点的第一题）
    box.querySelectorAll('.rm-pt').forEach((b) => {
      b.addEventListener('click', () => {
        const cat = b.dataset.cat;
        if (openLesson(cat)) return;
        gotoFirstExerciseOf(cat);
      });
    });
  }

  /* ---------------- 课程学习（第三阶段） ---------------- */
  // 跳到某知识点的第一道题（原学习路线行为，供无课程知识点使用）
  function gotoFirstExerciseOf(cat) {
    const first = (window.EXERCISES || []).find((e) => e.cat === cat);
    if (first) gotoExerciseById(first.id);
  }

  // 跳到指定题目
  function gotoExerciseById(id) {
    const ex = (window.EXERCISES || []).find((e) => e.id === id);
    if (!ex) return;
    currentEx = ex;
    switchView('exercise');
    renderExList();
    renderExDetail(ex);
  }

  // 知识点的下一个知识点（按阶段顺序）
  function nextPointAfter(topic) {
    const pts = [];
    (window.STAGES || []).forEach((st) => (st.points || []).forEach((p) => pts.push(p)));
    const i = pts.indexOf(topic);
    return (i >= 0 && i < pts.length - 1) ? pts[i + 1] : null;
  }

  function pointNameOf(p) {
    return (window.POINTS && window.POINTS[p]) ? window.POINTS[p].name : p;
  }

  // 打开知识点课程；没有课程返回 false（调用方回退到直接做练习）
  function openLesson(topic) {
    const lesson = window.lessonOf ? window.lessonOf(topic) : null;
    if (!lesson) return false;
    lessonReadMap[topic] = true;
    localStorage.setItem(LS.lesson, JSON.stringify(lessonReadMap));
    renderLesson(lesson);
    switchView('lesson');
    return true;
  }

  function lessonStatusText(lesson) {
    const stt = pointState(lesson.topic);
    const t = (profile.topics || {})[lesson.topic];
    const okN = t ? t.ok : 0, badN = t ? t.mistakes : 0;
    if (stt === 'ok') return '✅ 已掌握这个知识点，太棒了！';
    if (stt === 'doing') return '📖 学习中（练习做对 ' + okN + ' 次，做错 ' + badN + ' 次）';
    return '⬜ 还没开始做练习';
  }

  function renderLesson(lesson) {
    const head = $('#lessonHead');
    if (head) head.textContent = lesson.title;
    const stage = window.stageOf ? window.stageOf(lesson.stage) : null;
    const sttTxt = lessonStatusText(lesson);

    let h = '';
    // ① 知识点名称 + ② 学习目标 + 学习流程
    h += '<div class="ls-hero">' +
      '<div class="ls-hero-top"><span class="tag">阶段' + lesson.stage +
      (stage ? ' · ' + esc(stage.name) : '') + '</span>' +
      '<span class="tag">' + esc(lesson.topicName) + '</span></div>' +
      '<div class="ls-goal"><b>🎯 学习目标</b>' + esc(lesson.summary) + '</div>' +
      '<div class="ls-steps"><span>① 知识讲解</span>→<span>② 简单示例</span>→<span>③ 理解检查</span>' +
      '→<span>④ 练习</span>→<span>⑤ 代码实践</span>→<span>⑥ 完成</span></div></div>';

    // ③ 简单讲解
    h += '<div class="ls-step"><div class="ls-step-title">📖 知识讲解</div>' +
      lesson.content.map((p) => '<p class="ls-para">' + p + '</p>').join('') + '</div>';

    // ④ Python 示例 + ⑤ 运行结果
    h += '<div class="ls-step"><div class="ls-step-title">🐍 简单示例（结果为真实运行输出）</div>';
    lesson.examples.forEach((ex, i) => {
      h += '<div class="ls-demo"><div class="ls-demo-k">示例 ' + (i + 1) + '</div>' +
        '<pre class="ls-code">' + esc(ex.code) + '</pre>' +
        '<div class="ls-out"><span>运行结果</span><pre>' + esc(ex.output) + '</pre></div>' +
        (ex.note ? '<div class="ls-note">💡 ' + ex.note + '</div>' : '') + '</div>';
    });
    h += '</div>';

    // ⑥ 重点总结 + ⑦ 常见错误
    h += '<div class="ls-step"><div class="ls-step-title">⭐ 重点总结</div><ul class="ls-points">' +
      lesson.keyPoints.map((k) => '<li>' + k + '</li>').join('') + '</ul></div>';

    h += '<div class="ls-step"><div class="ls-step-title">⚠️ 常见错误（新手最容易踩的坑）</div>';
    (lesson.tips || []).forEach((tp) => {
      h += '<div class="ls-tip">' +
        '<div class="ls-tip-row"><span class="bad">✗ 错</span><code>' + esc(tp.bad) + '</code></div>' +
        '<div class="ls-tip-row"><span class="good">✓ 对</span><code>' + esc(tp.good) + '</code></div>' +
        '<div class="ls-tip-why">' + tp.why + '</div></div>';
    });
    h += '</div>';

    // 理解检查（内嵌小测，即时反馈；不计入学习档案，正式记录在「练习」环节）
    h += '<div class="ls-step"><div class="ls-step-title">🤔 理解检查（选一选，答错也没关系）</div>';
    (lesson.quizIds || []).forEach((qid) => {
      const q = (window.EXERCISES || []).find((e) => e.id === qid);
      if (!q) return;
      let opts = '';
      if (q.type === 'bool') {
        opts = '<button class="ls-q-opt" data-v="1">正确</button>' +
               '<button class="ls-q-opt" data-v="0">错误</button>';
      } else if (q.type === 'choice') {
        opts = (q.options || []).map((op, i) =>
          '<button class="ls-q-opt" data-v="' + i + '"><b>' + 'ABCD'[i] + '</b> ' + esc(op) + '</button>').join('');
      } else { return; }   // 填空/代码题不放进理解检查
      h += '<div class="ls-quiz" data-qid="' + q.id + '">' +
        '<div class="ls-q-title">' + q.title.replace(/^判断题[:：]\s*/, '') + '</div>' +
        '<div class="ls-q-opts">' + opts + '</div><div class="ls-q-fb"></div></div>';
    });
    h += '</div>';

    // ④ 练习 + ⑤ 代码实践
    h += '<div class="ls-step"><div class="ls-step-title">✍️ 开始练习（会记入学习档案）</div>' +
      '<p class="ls-para">理解检查没问题的话，就来正式做几道题巩固一下。</p>' +
      '<div class="ls-actions"><button class="btn btn-primary" id="lsGoQuiz">去做练习题</button></div>' +
      '<div class="ls-step-title" style="margin-top:18px">💻 代码实践（亲手敲一遍才算学会）</div>' +
      '<div class="ls-actions">' +
      (lesson.codeExerciseIds || []).map((cid, i) => {
        const ce = (window.EXERCISES || []).find((e) => e.id === cid);
        return ce ? '<button class="btn" data-code-id="' + ce.id + '">代码实践 ' + (i + 1) + '：' +
          esc(ce.title) + (doneSet.has(ce.id) ? ' ✓' : '') + '</button>' : '';
      }).join('') + '</div></div>';

    // ⑥ 完成知识点 + 推荐下一课
    const rec = recommendNext();
    const nextTopic = nextPointAfter(lesson.topic);
    h += '<div class="ls-step ls-finish"><div class="ls-step-title">🏁 完成知识点</div>' +
      '<p class="ls-para">当前状态：' + sttTxt + '。把本课的练习题和代码实践都做对，这个知识点就算掌握啦。</p>' +
      (rec.name ? '<p class="ls-para"><b>老师建议：</b>' + esc(rec.name) + ' — ' + esc(rec.reason) + '</p>' : '') +
      '<div class="ls-actions">' +
      (nextTopic ? '<button class="btn btn-primary" id="lsNext">继续下一课：' + esc(pointNameOf(nextTopic)) +
        (window.lessonOf(nextTopic) ? ' 📘' : ' →') + '</button>' : '') +
      '<button class="btn" id="lsBackRoadmap">返回学习路线</button>' +
      '</div></div>';

    $('#lessonBody').innerHTML = h;

    // —— 理解检查：点选项即时反馈，可换答案重试 ——
    $$('#lessonBody .ls-quiz').forEach((box) => {
      const q = (window.EXERCISES || []).find((e) => e.id === box.dataset.qid);
      if (!q) return;
      const right = (q.type === 'bool') ? String(q.answer ? 1 : 0) : String(q.answer);
      box.querySelectorAll('.ls-q-opt').forEach((b) => {
        b.addEventListener('click', () => {
          const isRight = b.dataset.v === right;
          const fb = box.querySelector('.ls-q-fb');
          box.querySelectorAll('.ls-q-opt').forEach((x) => x.classList.remove('right', 'wrong'));
          b.classList.add(isRight ? 'right' : 'wrong');
          fb.innerHTML = (isRight ? '<b class="good">回答正确！🎉</b>' : '<b class="bad">再想想～</b>') +
            (q.explain || '');
          fb.classList.add('show');
        });
      });
    });

    // 开始练习 → 本课第一道练习题
    const gq = $('#lsGoQuiz');
    if (gq) gq.addEventListener('click', () => {
      const qid = (lesson.quizIds || []).find((id) => (window.EXERCISES || []).some((e) => e.id === id));
      if (qid) { gotoExerciseById(qid); return; }
      gotoFirstExerciseOf(lesson.topic);
    });

    // 代码实践按钮
    $$('#lessonBody [data-code-id]').forEach((b) => {
      b.addEventListener('click', () => gotoExerciseById(b.dataset.codeId));
    });

    // 继续下一课：有课程开课程，没课程直接做该知识点练习
    const nb = $('#lsNext');
    if (nb) nb.addEventListener('click', () => {
      if (!openLesson(nextTopic)) gotoFirstExerciseOf(nextTopic);
    });

    const back = $('#lsBackRoadmap');
    if (back) back.addEventListener('click', () => { switchView('roadmap'); renderRoadmap(); });
  }

  /* ---------------- 启动 ---------------- */
  saveProgress();
  renderExList();
  renderProfilePanel();   // 学生成长档案面板
  renderRoadmap();        // 学习路线（渐进式课程）
  updateModeTip();
  restoreChat();
  initPyodide();

  // 课程页「返回学习路线」
  const lessonBack = document.getElementById('btnLessonBack');
  if (lessonBack) lessonBack.addEventListener('click', () => { switchView('roadmap'); renderRoadmap(); });
})();
