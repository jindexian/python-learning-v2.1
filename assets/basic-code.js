/* ============================================================
 * 阶段 1～2 零基础代码练习（增量新增）
 * 目标：让完全不会 Python 的学生第一次成功运行自己的代码
 * 规则：
 *   - 不涉及 递归 / 装饰器 / 生成器 / 闭包 / 类 / 对象 / 算法
 *   - 阶段 1 全部 level = 1；阶段 2 主要 level = 1，少量 level = 2
 *   - 完全兼容现有判题系统：
 *       无输入题 → stdinTests（stdin 为空字符串）
 *       有输入题 → stdinTests（喂入 stdin，比对标准输出）
 *   - 兼容现有学习档案：字段 cat / catName 与知识点 key 保持一致
 *   - hints：渐进式提示数组（第 1 次轻提示 → 越挫败越具体 → 最后给完整写法）
 * ============================================================ */

window.BASIC_CODE = [

  /* ============ 阶段 1：Python 认识（全部 level 1）============ */

  // —— Python 是什么 / 第一行代码 ——
  {
    id: 'q1_pyintro_k1', type: 'code', cat: 'pyintro', catName: 'Python 是什么',
    point: 'pyintro', stage: 1, level: 1,
    title: '第一行代码：输出 Hello Python',
    desc: '使用 <code>print()</code> 在屏幕上输出一行：<code>Hello Python</code>。<br>写好后可以先点「运行看看」，再点「提交判题」。',
    io: [['输出', 'Hello Python']],
    starter: '# 用 print() 输出：Hello Python\nprint("Hello")\n',
    stdinTests: [{ name: '输出 Hello Python', stdin: '', expect: 'Hello Python' }],
    hints: [
      '已经用上 <code>print()</code> 了，很棒！不过输出内容和题目要求不完全一样，再检查一下引号里的文字。',
      '题目要求输出的是 <code>Hello Python</code>：注意中间的空格、大小写，文字要放在英文双引号里。',
      '完整写法：<code>print("Hello Python")</code>'
    ],
    explanation: '<code>print()</code> 会把括号里的内容显示到屏幕上；文字（字符串）必须用<b>英文引号</b>包起来。'
  },

  // —— print 输出 ——
  {
    id: 'q1_print_k1', type: 'code', cat: 'print', catName: 'print 输出',
    point: 'print', stage: 1, level: 1,
    title: '输出两行文字',
    desc: '使用 <b>两个</b> <code>print()</code>，分两行输出：<br>第一行：<code>Python</code><br>第二行：<code>你好</code>',
    io: [['输出', '第一行 Python，第二行 你好']],
    starter: '# 写两行 print，第一行输出 Python，第二行输出 你好\nprint("第一行")\n',
    stdinTests: [{ name: '输出两行', stdin: '', expect: 'Python\n你好' }],
    hints: [
      '每写一次 <code>print()</code> 就输出一行，所以要写两次。',
      '第一行 <code>print("Python")</code>，第二行 <code>print("你好")</code>。',
      '完整写法：<br><code>print("Python")</code><br><code>print("你好")</code>'
    ],
    explanation: '每一次 <code>print()</code> 输出一行内容，输出完自动换行。'
  },
  {
    id: 'q1_print_k2', type: 'code', cat: 'print', catName: 'print 输出',
    point: 'print', stage: 1, level: 1,
    title: '输出计算结果',
    desc: '用 <code>print()</code> 输出 2 + 3 的结果，也就是 <code>5</code>。<br>注意：数字<b>不要</b>加引号。',
    io: [['输出', '5']],
    starter: '# 数字不加引号，才会做加法\nprint("2 + 3")\n',
    stdinTests: [{ name: '输出 2+3 的结果', stdin: '', expect: '5' }],
    hints: [
      '如果屏幕上出现的是 <code>2 + 3</code> 这串字符，说明数字被引号包起来了。',
      '去掉引号，直接写 <code>print(2 + 3)</code>，Python 会先算出结果再输出。',
      '完整写法：<code>print(2 + 3)</code>'
    ],
    explanation: '加了引号的是<b>字符串</b>，会原样输出；不加引号的数字会<b>先计算</b>再输出。'
  },

  // —— 变量 ——
  {
    id: 'q1_variable_k1', type: 'code', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '用变量保存名字',
    desc: '创建变量 <code>name</code>，把字符串 <code>"小明"</code> 存进去，然后输出这个变量。',
    io: [['输出', '小明']],
    starter: '# 1. 创建变量 name，存进 "小明"\n# 2. 用 print 输出它\n',
    stdinTests: [{ name: '输出变量 name', stdin: '', expect: '小明' }],
    hints: [
      '分两步：先 <code>name = "小明"</code> 存起来，再 <code>print(name)</code> 输出。',
      '输出变量时，变量名<b>不能</b>加引号，否则屏幕上出现的只是 name 这个单词。',
      '完整写法：<br><code>name = "小明"</code><br><code>print(name)</code>'
    ],
    explanation: '变量就像一个贴了标签的盒子：<code>name = "小明"</code> 把值放进去，<code>print(name)</code> 用名字把它取出来。'
  },
  {
    id: 'q1_variable_k2', type: 'code', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '用变量保存年龄',
    desc: '创建变量 <code>age</code>，存入数字 <code>12</code>，然后输出它。',
    io: [['输出', '12']],
    starter: '# 存一个数字到 age 里，再输出\n',
    stdinTests: [{ name: '输出变量 age', stdin: '', expect: '12' }],
    hints: [
      '数字不用加引号：<code>age = 12</code>。',
      '然后用 <code>print(age)</code> 输出，同样不要给 age 加引号。',
      '完整写法：<br><code>age = 12</code><br><code>print(age)</code>'
    ],
    explanation: '变量可以存文字，也可以存数字。存数字时<b>不要</b>加引号，加了引号就变成字符串了。'
  },
  {
    id: 'q1_variable_k3', type: 'code', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '变量可以重新赋值',
    desc: '先让 <code>score = 10</code>，再重新给它赋值 <code>20</code>，最后输出 <code>score</code>。',
    io: [['输出', '20']],
    starter: 'score = 10\n# 在这里重新给 score 赋值 20\n# 然后输出 score\n',
    stdinTests: [{ name: '输出重新赋值后的 score', stdin: '', expect: '20' }],
    hints: [
      '变量里的值会被<b>最后一次</b>赋值覆盖。',
      '加上一行 <code>score = 20</code>，再写 <code>print(score)</code>。',
      '完整写法：<br><code>score = 10</code><br><code>score = 20</code><br><code>print(score)</code>'
    ],
    explanation: '同一个变量可以被多次赋值，<b>后写的值会覆盖前面的值</b>。'
  },

  // —— 数据类型 / 字符串 / 数字 ——
  {
    id: 'q1_datatype_k1', type: 'code', cat: 'datatype', catName: '数据类型',
    point: 'datatype', stage: 1, level: 1,
    title: '字符串拼接',
    desc: '已知 <code>city = "北京"</code>，用 <code>+</code> 把「我喜欢」和城市拼起来，输出：<code>我喜欢北京</code>',
    io: [['输出', '我喜欢北京']],
    starter: 'city = "北京"\n# 用 + 把两段文字接起来，再输出\n',
    stdinTests: [{ name: '拼接输出', stdin: '', expect: '我喜欢北京' }],
    hints: [
      '字符串可以用 <code>+</code> 连接：<code>"我喜欢" + city</code>。',
      '把拼接的结果放进 print：<code>print("我喜欢" + city)</code>。',
      '完整写法：<br><code>city = "北京"</code><br><code>print("我喜欢" + city)</code>'
    ],
    explanation: '两个<b>字符串</b>用 <code>+</code> 会<b>拼接</b>成一个更长的字符串（数字用 + 才是相加）。'
  },
  {
    id: 'q1_datatype_k2', type: 'code', cat: 'datatype', catName: '数据类型',
    point: 'datatype', stage: 1, level: 1,
    title: '用 f-string 拼一句话',
    desc: '已知 <code>name = "小明"</code>、<code>age = 12</code>，输出：<code>小明今年12岁</code>',
    io: [['输出', '小明今年12岁']],
    starter: 'name = "小明"\nage = 12\n# 试试在字符串前加 f，用 {变量} 把值放进去\n',
    stdinTests: [{ name: 'f-string 输出', stdin: '', expect: '小明今年12岁' }],
    hints: [
      '在字符串前面加一个小写 <code>f</code>，再把变量放进 <code>{}</code> 里，例如 <code>f"{name}你好"</code>。',
      '题目里「今年」和「岁」是普通文字，直接写在引号里就行，只有 name 和 age 放在花括号里。',
      '完整写法：<code>print(f"{name}今年{age}岁")</code>'
    ],
    explanation: 'f-string：字符串前加 <code>f</code>，花括号 <code>{}</code> 里写变量，Python 会自动替换成它的值。'
  },


  /* ============ 阶段 2：基础语法（主要 level 1，少量 level 2）============ */

  // —— 变量 ——
  {
    id: 'q2_variable_k1', type: 'code', cat: 'variable', catName: '变量',
    point: 'variable', stage: 2, level: 1,
    title: '把计算结果存进变量',
    desc: '读入一个整数 <code>n</code>，把它加上 10 的结果存到变量 <code>total</code> 里，最后输出 <code>total</code>。',
    io: [['输入 5', '输出 15'], ['输入 100', '输出 110']],
    starter: 'n = int(input())\n# 把 n + 10 存到 total，再输出\n',
    stdinTests: [
      { name: '输入 5 → 输出 15', stdin: '5', expect: '15' },
      { name: '输入 100 → 输出 110', stdin: '100', expect: '110' }
    ],
    hints: [
      '<code>input()</code> 读到的是字符串，要用 <code>int()</code> 转成整数才能做加法。',
      '先 <code>total = n + 10</code> 保存结果，再 <code>print(total)</code> 输出。',
      '完整写法：<br><code>n = int(input())</code><br><code>total = n + 10</code><br><code>print(total)</code>'
    ],
    explanation: '变量可以保存计算的中间结果，这样后面想用几次就用几次。'
  },

  // —— input 输入 ——
  {
    id: 'q2_input_k1', type: 'code', cat: 'input', catName: 'input 输入',
    point: 'input', stage: 2, level: 1,
    title: '读取名字并打招呼',
    desc: '用 <code>input()</code> 读入一个名字，输出：<code>你好，XXX！</code>（XXX 换成读入的名字）。',
    io: [['输入 小明', '输出 你好，小明！'], ['输入 李雷', '输出 你好，李雷！']],
    starter: 'name = input()\n# 输出：你好，XXX！\n',
    stdinTests: [
      { name: '输入：小明', stdin: '小明', expect: '你好，小明！' },
      { name: '输入：李雷', stdin: '李雷', expect: '你好，李雷！' }
    ],
    hints: [
      '先把输入存到变量里：<code>name = input()</code>。',
      '再用 f-string 拼起来：<code>print(f"你好，{name}！")</code>。',
      '完整写法：<br><code>name = input()</code><br><code>print(f"你好，{name}！")</code>'
    ],
    explanation: '<code>input()</code> 会读取用户输入的一行文字，返回值是<b>字符串</b>，可以直接放进 f-string。'
  },
  {
    id: 'q2_input_k2', type: 'code', cat: 'input', catName: 'input 输入',
    point: 'input', stage: 2, level: 1,
    title: '读入数字并输出它的两倍',
    desc: '用 <code>input()</code> 读入一个整数，输出它的 2 倍。<br>提示：<code>input()</code> 得到的是字符串，要用 <code>int()</code> 转换。',
    io: [['输入 7', '输出 14'], ['输入 -3', '输出 -6']],
    starter: 'n = input()\n# 先把 n 转成整数，再乘 2\n',
    stdinTests: [
      { name: '输入 7 → 输出 14', stdin: '7', expect: '14' },
      { name: '输入 0 → 输出 0', stdin: '0', expect: '0' },
      { name: '输入 -3 → 输出 -6', stdin: '-3', expect: '-6' }
    ],
    hints: [
      '如果输出了 <code>77</code>，说明字符串被重复了两次——要先转成整数。',
      '写成 <code>n = int(input())</code>，再 <code>print(n * 2)</code>。',
      '完整写法：<br><code>n = int(input())</code><br><code>print(n * 2)</code>'
    ],
    explanation: '<code>input()</code> 返回的永远是<b>字符串</b>；做数学运算前要用 <code>int()</code> 或 <code>float()</code> 转换。'
  },

  // —— 运算符 ——
  {
    id: 'q2_operator_k1', type: 'code', cat: 'operator', catName: '运算符',
    point: 'operator', stage: 2, level: 1,
    title: '两个数的和、差、积',
    desc: '读入两个整数 a、b，<b>分三行</b>依次输出：a + b、a - b、a * b。',
    io: [['输入 10 和 3', '输出 13 / 7 / 30']],
    starter: 'a = int(input())\nb = int(input())\n# 分三行输出 和、差、积\n',
    stdinTests: [
      { name: '10 和 3 → 13/7/30', stdin: '10\n3', expect: '13\n7\n30' },
      { name: '5 和 5 → 10/0/25', stdin: '5\n5', expect: '10\n0\n25' }
    ],
    hints: [
      '三个结果要<b>分三行</b>输出，所以要写三个 <code>print()</code>。',
      '<code>print(a + b)</code>、<code>print(a - b)</code>、<code>print(a * b)</code>。',
      '完整写法：读两个数后，依次 print 出 和、差、积。'
    ],
    explanation: '<code>+ - *</code> 分别求 和、差、积；每个 <code>print()</code> 输出一行。'
  },
  {
    id: 'q2_operator_k2', type: 'code', cat: 'operator', catName: '运算符',
    point: 'operator', stage: 2, level: 2,
    title: '整除与取余',
    desc: '读入两个整数 a、b，<b>分两行</b>输出：a 除以 b 的<b>整数商</b>（<code>//</code>）和<b>余数</b>（<code>%</code>）。',
    io: [['输入 17 和 5', '输出 3 和 2']],
    starter: 'a = int(input())\nb = int(input())\n# 第一行输出 a // b，第二行输出 a % b\n',
    stdinTests: [
      { name: '17 和 5 → 3/2', stdin: '17\n5', expect: '3\n2' },
      { name: '10 和 2 → 5/0', stdin: '10\n2', expect: '5\n0' }
    ],
    hints: [
      '<code>//</code> 是整除（只要商），<code>%</code> 是取余（只要余数）。',
      '第一行 <code>print(a // b)</code>，第二行 <code>print(a % b)</code>。',
      '完整写法：<br><code>print(a // b)</code><br><code>print(a % b)</code>'
    ],
    explanation: '17 // 5 = 3（商），17 % 5 = 2（余数）。这两个运算符经常成对出现。'
  },

  // —— 数据类型 ——
  {
    id: 'q2_datatype_k1', type: 'code', cat: 'datatype', catName: '数据类型',
    point: 'datatype', stage: 2, level: 2,
    title: '字符串相加 vs 数字相加',
    desc: '读入两行内容（例如 12 和 34），<b>分两行</b>输出：<br>第一行：当作<b>文字</b>拼接（1234）<br>第二行：当作<b>数字</b>相加（46）',
    io: [['输入 12 和 34', '输出 1234 和 46']],
    starter: 'a = input()\nb = input()\n# 第一行：直接用 + 拼接\n# 第二行：转成整数后相加\n',
    stdinTests: [
      { name: '12 和 34 → 1234/46', stdin: '12\n34', expect: '1234\n46' },
      { name: '5 和 6 → 56/11', stdin: '5\n6', expect: '56\n11' }
    ],
    hints: [
      '<code>input()</code> 读到的是字符串，直接 <code>a + b</code> 就是拼接。',
      '第二行要先用 <code>int()</code> 把两边转成整数再相加。',
      '完整写法：<br><code>print(a + b)</code><br><code>print(int(a) + int(b))</code>'
    ],
    explanation: '同样是 <code>+</code>，作用在<b>字符串</b>上是拼接，作用在<b>数字</b>上才是相加——这就是数据类型的重要性。'
  },

  // —— if 判断 ——
  {
    id: 'q2_if_k1', type: 'code', cat: 'if', catName: 'if 判断',
    point: 'if', stage: 2, level: 1,
    title: '判断是不是正数',
    desc: '读入一个整数，如果它 <b>大于 0</b> 就输出 <code>正数</code>，否则输出 <code>不是正数</code>。',
    io: [['输入 5', '输出 正数'], ['输入 -3', '输出 不是正数']],
    starter: 'n = int(input())\n# 用 if ... else ... 判断\n',
    stdinTests: [
      { name: '输入 5 → 正数', stdin: '5', expect: '正数' },
      { name: '输入 -3 → 不是正数', stdin: '-3', expect: '不是正数' },
      { name: '输入 0 → 不是正数', stdin: '0', expect: '不是正数' }
    ],
    hints: [
      '判断大小写 <code>if n > 0:</code>，注意结尾的<b>冒号</b>不能少。',
      '<code>if</code> 下面的输出要<b>缩进 4 个空格</b>，否则 Python 会报错。',
      '完整写法：<br><code>if n > 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("正数")</code><br><code>else:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("不是正数")</code>'
    ],
    explanation: '<code>if 条件:</code> 条件成立时执行缩进块，否则执行 <code>else:</code> 的缩进块。<b>冒号和缩进都不能少</b>。'
  },
  {
    id: 'q2_if_k2', type: 'code', cat: 'if', catName: 'if 判断',
    point: 'if', stage: 2, level: 1,
    title: '判断奇数还是偶数',
    desc: '读入一个整数，如果是偶数输出 <code>偶数</code>，否则输出 <code>奇数</code>。',
    io: [['输入 4', '输出 偶数'], ['输入 7', '输出 奇数']],
    starter: 'n = int(input())\n# 用 % 2 判断能不能被 2 整除\n',
    stdinTests: [
      { name: '输入 4 → 偶数', stdin: '4', expect: '偶数' },
      { name: '输入 7 → 奇数', stdin: '7', expect: '奇数' },
      { name: '输入 0 → 偶数', stdin: '0', expect: '偶数' }
    ],
    hints: [
      '能被 2 整除就是偶数：<code>n % 2 == 0</code>。',
      '注意用的是<b>两个等号</b> <code>==</code>（判断是否相等），一个等号是赋值。',
      '完整写法：<br><code>if n % 2 == 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("偶数")</code><br><code>else:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("奇数")</code>'
    ],
    explanation: '<code>%</code> 取余：余数为 0 说明能被整除。<code>==</code> 判断相等，<code>=</code> 才是赋值。'
  },

  // —— for 循环 ——
  {
    id: 'q2_for_k1', type: 'code', cat: 'for', catName: 'for 循环',
    point: 'for', stage: 2, level: 1,
    title: '用 for 输出 1 2 3',
    desc: '用 <code>for</code> 循环和 <code>range()</code>，<b>分三行</b>输出 1、2、3。',
    io: [['输出', '1 / 2 / 3 各占一行']],
    starter: '# 用 for i in range(1, 4):\n',
    stdinTests: [{ name: '输出 1 2 3', stdin: '', expect: '1\n2\n3' }],
    hints: [
      '<code>range(1, 4)</code> 会产生 1、2、3（<b>不含</b>结束值 4）。',
      '<code>for i in range(1, 4):</code> 下面缩进写 <code>print(i)</code>。',
      '完整写法：<br><code>for i in range(1, 4):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(i)</code>'
    ],
    explanation: '<code>range(a, b)</code> 生成 a 到 b-1 的整数；循环体必须缩进。'
  },
  {
    id: 'q2_for_k2', type: 'code', cat: 'for', catName: 'for 循环',
    point: 'for', stage: 2, level: 2,
    title: '用 for 输出 1~5 的平方',
    desc: '用 <code>for</code> 循环，<b>分五行</b>输出 1 到 5 每个数的平方：1、4、9、16、25。',
    io: [['输出', '1 / 4 / 9 / 16 / 25 各占一行']],
    starter: '# 循环 1~5，输出 i * i\n',
    stdinTests: [{ name: '输出 1~5 的平方', stdin: '', expect: '1\n4\n9\n16\n25' }],
    hints: [
      '<code>range(1, 6)</code> 才能取到 1、2、3、4、5。',
      'Python 里没有 <code>i²</code> 这种写法，用 <code>i * i</code> 表示平方。',
      '完整写法：<br><code>for i in range(1, 6):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(i * i)</code>'
    ],
    explanation: '循环变量 i 依次取 1~5，每次输出 <code>i * i</code>。'
  },

  // —— while 循环 ——
  {
    id: 'q2_while_k1', type: 'code', cat: 'while', catName: 'while 循环',
    point: 'while', stage: 2, level: 2,
    title: '用 while 输出 1 2 3',
    desc: '用 <code>while</code> 循环，<b>分三行</b>输出 1、2、3。做法：先 <code>i = 1</code>，每次循环输出 i 后执行 <code>i = i + 1</code>。',
    io: [['输出', '1 / 2 / 3 各占一行']],
    starter: 'i = 1\n# 用 while i <= 3: 循环，记得让 i 变大\n',
    stdinTests: [{ name: '输出 1 2 3', stdin: '', expect: '1\n2\n3' }],
    hints: [
      '<code>while</code> 要自己维护计数变量，所以开头写 <code>i = 1</code>。',
      '循环体里<b>一定记得</b>写 <code>i = i + 1</code>，否则会一直循环停不下来。',
      '完整写法：<br><code>i = 1</code><br><code>while i <= 3:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(i)</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>i = i + 1</code>'
    ],
    explanation: '<code>while</code> 在条件成立时反复执行；如果忘了让 i 变大就会变成死循环（本系统会自动帮你中断）。'
  },

  /* ============================================================
   * 阶段 3～5 基础代码练习（第四阶段增量，2026-09-09）
   * 规则：
   *   - 每个知识点 2 道：k1 检查基本语法（level 1），k2 稍作变化（level 2）
   *   - 只考察对应课程刚教过的内容，不含算法 / 递归 / 复杂特性
   *   - file 题统一「先 w 写再读」，重复提交结果不变（w 会清空重来）
   * ============================================================ */

  /* ============ 阶段 3：数据结构 ============ */

  // —— 列表 ——
  {
    id: 'q3_list_k1', type: 'code', cat: 'list', catName: '列表 list',
    point: 'list', stage: 3, level: 1,
    title: '输出列表里的元素',
    desc: '创建列表 <code>nums = [10, 20, 30]</code>，用下标输出它的<b>第一个</b>元素（也就是 <code>10</code>）。',
    io: [['输出', '10']],
    starter: 'nums = [10, 20, 30]\n# 输出第一个元素，提示：下标从 0 开始\n',
    stdinTests: [{ name: '输出第一个元素', stdin: '', expect: '10' }],
    hints: [
      '列表的下标从 <b>0</b> 开始：第一个元素是 <code>nums[0]</code>，不是 <code>nums[1]</code>。',
      '输出用 <code>print(nums[0])</code>——注意方括号里写 0。',
      '完整写法：<br><code>nums = [10, 20, 30]</code><br><code>print(nums[0])</code>'
    ],
    explanation: '列表用方括号创建，元素之间用逗号隔开；下标从 0 开始数，<code>nums[0]</code> 是第一个元素。'
  },
  {
    id: 'q3_list_k2', type: 'code', cat: 'list', catName: '列表 list',
    point: 'list', stage: 3, level: 2,
    title: '修改列表里的元素',
    desc: '已有列表 <code>fruits = ["苹果", "香蕉", "橘子"]</code>。请把第二个元素改成 <code>"葡萄"</code>，然后输出整个列表。',
    io: [['输出', "['苹果', '葡萄', '橘子']"]],
    starter: 'fruits = ["苹果", "香蕉", "橘子"]\n# 1. 把第二个元素（下标 1）改成 "葡萄"\n# 2. 输出整个列表\n',
    stdinTests: [{ name: '修改后输出列表', stdin: '', expect: "['苹果', '葡萄', '橘子']" }],
    hints: [
      '修改列表元素用赋值：<code>fruits[1] = "葡萄"</code>——注意第二个元素的下标是 1。',
      '输出整个列表时直接 <code>print(fruits)</code>，不要加引号。',
      '完整写法：<br><code>fruits = ["苹果", "香蕉", "橘子"]</code><br><code>fruits[1] = "葡萄"</code><br><code>print(fruits)</code>'
    ],
    explanation: '列表创建后还能修改：<code>fruits[1] = "葡萄"</code> 会把下标 1 上的元素换掉。直接 <code>print(列表)</code> 会用方括号的形式把所有元素显示出来。'
  },

  // —— 元组 ——
  {
    id: 'q3_tuple_k1', type: 'code', cat: 'tuple', catName: '元组 tuple',
    point: 'tuple', stage: 3, level: 1,
    title: '创建元组并输出',
    desc: '创建元组 <code>point = (3, 5)</code>。<br>第一行输出整个元组，第二行用下标输出它的第一个元素。',
    io: [['输出', '第一行 (3, 5)，第二行 3']],
    starter: 'point = (3, 5)\n# 输出整个元组，再输出 point[0]\n',
    stdinTests: [{ name: '输出元组和首元素', stdin: '', expect: '(3, 5)\n3' }],
    hints: [
      '元组用<b>圆括号</b>创建：<code>point = (3, 5)</code>。',
      '输出整个元组直接 <code>print(point)</code>；输出第一个元素是 <code>print(point[0])</code>。',
      '完整写法：<br><code>point = (3, 5)</code><br><code>print(point)</code><br><code>print(point[0])</code>'
    ],
    explanation: '元组和列表很像，读取方式也一样用下标，区别是元组用圆括号、创建后不能修改。'
  },
  {
    id: 'q3_tuple_k2', type: 'code', cat: 'tuple', catName: '元组 tuple',
    point: 'tuple', stage: 3, level: 2,
    title: '元组的长度和最后一个元素',
    desc: '已有元组 <code>colors = ("红", "绿", "蓝")</code>。<br>第一行输出它的长度，第二行输出<b>最后一个</b>元素（提示：下标 2，或者用 <code>colors[-1]</code>）。',
    io: [['输出', '第一行 3，第二行 蓝']],
    starter: 'colors = ("红", "绿", "蓝")\n# 1. 输出 len(colors)\n# 2. 输出最后一个元素\n',
    stdinTests: [{ name: '输出长度和末元素', stdin: '', expect: '3\n蓝' }],
    hints: [
      '个数用 <code>len(colors)</code> 得到，别忘了放进 <code>print()</code> 里。',
      '最后一个元素下标是 2（三个元素：0、1、2），写成 <code>colors[2]</code>；<code>colors[-1]</code> 也行。',
      '完整写法：<br><code>colors = ("红", "绿", "蓝")</code><br><code>print(len(colors))</code><br><code>print(colors[2])</code>'
    ],
    explanation: '<code>len()</code> 告诉你元组里有几个元素；<code>colors[2]</code> 是最后一个（下标 0、1、2），<code>colors[-1]</code> 表示"倒数第一个"。'
  },

  // —— 字典 ——
  {
    id: 'q3_dict_k1', type: 'code', cat: 'dict', catName: '字典 dict',
    point: 'dict', stage: 3, level: 1,
    title: '从字典里找信息',
    desc: '已有字典 <code>student = {"name": "小明", "age": 12}</code>。<br>用键 <code>"name"</code> 输出学生的名字。',
    io: [['输出', '小明']],
    starter: 'student = {"name": "小明", "age": 12}\n# 用 student["键名"] 找到对应的值\n',
    stdinTests: [{ name: '输出 name 的值', stdin: '', expect: '小明' }],
    hints: [
      '字典通过<b>键</b>找<b>值</b>：方括号里放键名 <code>student["name"]</code>。',
      '注意键是字符串，要带引号：<code>print(student["name"])</code>。',
      '完整写法：<br><code>student = {"name": "小明", "age": 12}</code><br><code>print(student["name"])</code>'
    ],
    explanation: '字典用花括号创建，每项是「键: 值」。取值用 <code>字典[键]</code>，就像"通过名字找东西"。'
  },
  {
    id: 'q3_dict_k2', type: 'code', cat: 'dict', catName: '字典 dict',
    point: 'dict', stage: 3, level: 2,
    title: '修改并新增键值对',
    desc: '已有字典 <code>student = {"name": "小明", "age": 12}</code>。<br>① 把 <code>age</code> 改成 <code>13</code>；② 新增一个键值对 <code>"city": "北京"</code>；③ 输出整个字典。',
    io: [['输出', "{'name': '小明', 'age': 13, 'city': '北京'}"]],
    starter: 'student = {"name": "小明", "age": 12}\n# 1. student["age"] 改成 13\n# 2. 新增 student["city"] = "北京"\n# 3. 输出整个字典\n',
    stdinTests: [{ name: '修改新增后输出', stdin: '', expect: "{'name': '小明', 'age': 13, 'city': '北京'}" }],
    hints: [
      '修改和新增写法一样：<code>student["age"] = 13</code>、<code>student["city"] = "北京"</code>。键不存在时就会新增。',
      '输出整个字典：<code>print(student)</code>。',
      '完整写法：<br><code>student = {"name": "小明", "age": 12}</code><br><code>student["age"] = 13</code><br><code>student["city"] = "北京"</code><br><code>print(student)</code>'
    ],
    explanation: '<code>字典[键] = 值</code>：键已存在就是修改，不存在就是新增。直接 <code>print(字典)</code> 会按花括号形式显示全部内容。'
  },

  // —— 集合 ——
  {
    id: 'q3_set_k1', type: 'code', cat: 'set', catName: '集合 set',
    point: 'set', stage: 3, level: 1,
    title: '集合自动去重',
    desc: '创建集合 <code>nums = {1, 2, 2, 3}</code>（注意里面写了两个 2）。<br>第一行输出 <code>len(nums)</code>，第二行输出 <code>2 in nums</code> 的结果。',
    io: [['输出', '第一行 3，第二行 True']],
    starter: 'nums = {1, 2, 2, 3}\n# 1. 输出集合里有几个元素\n# 2. 输出 2 in nums\n',
    stdinTests: [{ name: '输出去重后的长度', stdin: '', expect: '3\nTrue' }],
    hints: [
      '集合会自动去掉重复的：两个 2 只留一个，所以只剩 1、2、3 三个元素。',
      '<code>len(nums)</code> 是 3；<code>2 in nums</code> 是"2 在不在里面"，结果是 True，直接 <code>print(2 in nums)</code>。',
      '完整写法：<br><code>nums = {1, 2, 2, 3}</code><br><code>print(len(nums))</code><br><code>print(2 in nums)</code>'
    ],
    explanation: '集合用花括号创建，核心本领是<b>去重</b>——重复的元素只保留一份。<code>x in 集合</code> 用来判断"在不在"，结果是 True 或 False。'
  },
  {
    id: 'q3_set_k2', type: 'code', cat: 'set', catName: '集合 set',
    point: 'set', stage: 3, level: 2,
    title: '往集合里加东西、删东西',
    desc: '已有集合 <code>s = {1, 2, 3}</code>。<br>① 用 <code>add()</code> 加入 <code>4</code>；② 用 <code>discard()</code> 删掉 <code>2</code>；然后分三行输出：<code>len(s)</code>、<code>2 in s</code>、<code>4 in s</code>。',
    io: [['输出', '3 / False / True 各占一行']],
    starter: 's = {1, 2, 3}\n# 1. add(4) 加进 4\n# 2. discard(2) 删掉 2\n# 3. 分三行输出 len(s)、2 in s、4 in s\n',
    stdinTests: [{ name: '增删后检查集合', stdin: '', expect: '3\nFalse\nTrue' }],
    hints: [
      '加入用 <code>s.add(4)</code>，删除用 <code>s.discard(2)</code>——都是用点号挂在集合后面。',
      '三行输出就是三个 <code>print()</code>：分别输出 <code>len(s)</code>、<code>2 in s</code>、<code>4 in s</code>。',
      '完整写法：<br><code>s = {1, 2, 3}</code><br><code>s.add(4)</code><br><code>s.discard(2)</code><br><code>print(len(s))</code><br><code>print(2 in s)</code><br><code>print(4 in s)</code>'
    ],
    explanation: '<code>add()</code> 往集合加元素，<code>discard()</code> 删元素（元素不存在也不报错）。删掉 2 加进 4 后，集合变成 {1, 3, 4}，长度还是 3。'
  },

  /* ============ 阶段 4：函数 ============ */

  // —— 定义函数 ——
  {
    id: 'q4_def_k1', type: 'code', cat: 'def', catName: '定义函数',
    point: 'def', stage: 4, level: 1,
    title: '定义你的第一个函数',
    desc: '定义一个函数 <code>say_hi()</code>，它被调用时输出：<code>你好，Python！</code><br>定义好之后，<b>调用它两次</b>（屏幕上会出现两行）。',
    io: [['输出', '两行 你好，Python！']],
    starter: '# 1. 用 def 定义 say_hi 函数\n# 2. 调用两次\ndef say_hi():\n    pass\n',
    stdinTests: [{ name: '调用两次输出两行', stdin: '', expect: '你好，Python！\n你好，Python！' }],
    hints: [
      '定义函数：<code>def say_hi():</code> 冒号不能少，函数体要<b>缩进</b>；函数体里写 <code>print("你好，Python！")</code>（记得把 starter 里的 pass 删掉）。',
      '定义好之后，<b>调用</b>才有输出：<code>say_hi()</code>，写两次就是调用两次。',
      '完整写法：<br><code>def say_hi():</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("你好，Python！")</code><br><code>say_hi()</code><br><code>say_hi()</code>'
    ],
    explanation: '<code>def 函数名():</code> 定义函数，函数体缩进；定义只是"打包"，<b>调用</b>（函数名加括号）才会真正执行。调用两次就执行两次。'
  },
  {
    id: 'q4_def_k2', type: 'code', cat: 'def', catName: '定义函数',
    point: 'def', stage: 4, level: 2,
    title: '会打招呼的函数',
    desc: '定义函数 <code>greet(name)</code>，它接收一个名字，输出：<code>你好，XXX！</code>（XXX 是传入的名字）。<br>然后调用 <code>greet("小明")</code> 和 <code>greet("小红")</code>。',
    io: [['输出', '你好，小明！ / 你好，小红！ 各占一行']],
    starter: '# 定义带一个参数的 greet 函数，然后调用两次\ndef greet(name):\n    pass\n',
    stdinTests: [{ name: '打招呼两次', stdin: '', expect: '你好，小明！\n你好，小红！' }],
    hints: [
      '函数体里用 f-string 拼句子：<code>print(f"你好，{name}！")</code>。',
      '调用时把名字放进括号：<code>greet("小明")</code>——传进去的值就叫参数。',
      '完整写法：<br><code>def greet(name):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(f"你好，{name}！")</code><br><code>greet("小明")</code><br><code>greet("小红")</code>'
    ],
    explanation: '参数就像机器的"进料口"：<code>greet("小明")</code> 把 "小明" 传给 name，函数里就能用 <code>{name}</code> 拿到它。同一个函数可以用不同的值反复调用。'
  },

  // —— 函数参数 ——
  {
    id: 'q4_param_k1', type: 'code', cat: 'param', catName: '函数参数',
    point: 'param', stage: 4, level: 1,
    title: '两个参数的加法机器',
    desc: '定义函数 <code>add(a, b)</code>，接收<b>两个</b>参数，直接输出它们的和。<br>然后调用 <code>add(2, 3)</code> 和 <code>add(10, 5)</code>。',
    io: [['输出', '5 / 15 各占一行']],
    starter: '# 定义有两个参数的 add 函数，函数体里输出 a + b\ndef add(a, b):\n    pass\n',
    stdinTests: [{ name: '两组加法', stdin: '', expect: '5\n15' }],
    hints: [
      '两个参数用逗号隔开：<code>def add(a, b):</code>——顺序要对应。',
      '函数体里 <code>print(a + b)</code>；调用时 <code>add(2, 3)</code> 会把 2 给 a、3 给 b。',
      '完整写法：<br><code>def add(a, b):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(a + b)</code><br><code>add(2, 3)</code><br><code>add(10, 5)</code>'
    ],
    explanation: '参数可以有多个，用逗号隔开。调用时按顺序传入：<code>add(2, 3)</code> 里 2 对应 a、3 对应 b，所以输出 5。'
  },
  {
    id: 'q4_param_k2', type: 'code', cat: 'param', catName: '函数参数',
    point: 'param', stage: 4, level: 2,
    title: '带默认值的参数',
    desc: '定义函数 <code>greet(name, word="你好")</code>，输出：<code>XXX，YYY！</code>（word 在前，name 在后，如 <code>你好，小明！</code>）。<br>调用 <code>greet("小明")</code>（不传 word，用默认值）和 <code>greet("小红", "早上好")</code>。',
    io: [['输出', '你好，小明！ / 早上好，小红！ 各占一行']],
    starter: '# word 有默认值 "你好"，不传时就用它\ndef greet(name, word="你好"):\n    pass\n',
    stdinTests: [{ name: '默认值与覆盖默认值', stdin: '', expect: '你好，小明！\n早上好，小红！' }],
    hints: [
      '默认值写在参数后面：<code>def greet(name, word="你好"):</code>——不传 word 时自动用 "你好"。',
      '函数体：<code>print(f"{word}，{name}！")</code>——注意 word 在前。',
      '完整写法：<br><code>def greet(name, word="你好"):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(f"{word}，{name}！")</code><br><code>greet("小明")</code><br><code>greet("小红", "早上好")</code>'
    ],
    explanation: '参数可以带<b>默认值</b>：<code>word="你好"</code> 表示不传就用 "你好"；传了（如 "早上好"）就覆盖默认值。'
  },

  // —— return 返回值 ——
  {
    id: 'q4_return_k1', type: 'code', cat: 'return', catName: 'return 返回值',
    point: 'return', stage: 4, level: 1,
    title: '把结果交出来',
    desc: '定义函数 <code>add(a, b)</code>，用 <code>return</code> 返回 <code>a + b</code>（注意：函数体里<b>不要</b> print）。<br>然后：<code>result = add(2, 3)</code>，输出 <code>result</code>；再直接输出 <code>add(10, 20)</code>。',
    io: [['输出', '5 / 30 各占一行']],
    starter: '# 1. 定义 add，用 return 返回 a + b\n# 2. result = add(2, 3)，输出 result\n# 3. 直接输出 add(10, 20)\ndef add(a, b):\n    pass\n',
    stdinTests: [{ name: 'return 两次求和', stdin: '', expect: '5\n30' }],
    hints: [
      '函数体里写 <code>return a + b</code>——return 是把结果<b>交出来</b>，不是打印。',
      '调用后用变量接住：<code>result = add(2, 3)</code>，再 <code>print(result)</code>。',
      '完整写法：<br><code>def add(a, b):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>return a + b</code><br><code>result = add(2, 3)</code><br><code>print(result)</code><br><code>print(add(10, 20))</code>'
    ],
    explanation: '<code>return</code> 把函数算的结果交还给调用处：可以用变量接住（<code>result = add(2, 3)</code>），也可以直接放进 <code>print()</code> 里。print 是"显示"，return 是"交付"。'
  },
  {
    id: 'q4_return_k2', type: 'code', cat: 'return', catName: 'return 返回值',
    point: 'return', stage: 4, level: 2,
    title: '返回值可以接着用',
    desc: '定义函数 <code>double(n)</code>，用 <code>return</code> 返回 <code>n * 2</code>。<br>输出 <code>double(4)</code>；再输出 <code>double(double(3))</code>（套两层，想想为什么是这个结果）。',
    io: [['输出', '8 / 12 各占一行']],
    starter: '# double 返回 n * 2；套两层调用想想执行顺序\ndef double(n):\n    pass\n',
    stdinTests: [{ name: '单层与嵌套调用', stdin: '', expect: '8\n12' }],
    hints: [
      '函数体就一句：<code>return n * 2</code>。',
      '<code>double(double(3))</code> 先算里面的：double(3) 返回 6，再算外面的 double(6)，返回 12。',
      '完整写法：<br><code>def double(n):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>return n * 2</code><br><code>print(double(4))</code><br><code>print(double(double(3)))</code>'
    ],
    explanation: 'return 交回来的结果还能继续当输入用：<code>double(double(3))</code> 里层先算出 6，外层再把 6 翻倍成 12。这就是 return 和 print 的区别——返回值可以<b>接着参与计算</b>。'
  },

  /* ============ 阶段 5：进阶 ============ */

  // —— 类与对象 ——
  {
    id: 'q5_class_k1', type: 'code', cat: 'class', catName: '类与对象',
    point: 'class', stage: 5, level: 1,
    title: '第一只小狗',
    desc: '定义类 <code>Dog</code>，它有一个方法 <code>bark</code>，被调用时输出：<code>汪汪！</code><br>然后用 <code>Dog()</code> 创建一只小狗，让它在屏幕上叫一声。',
    io: [['输出', '汪汪！']],
    starter: 'class Dog:\n    def bark(self):\n        pass\n\n# 1. 创建对象：d = Dog()\n# 2. 调用 d.bark()\n',
    stdinTests: [{ name: '小狗叫一声', stdin: '', expect: '汪汪！' }],
    hints: [
      'starter 已给出类的骨架——把 <code>pass</code> 换成 <code>print("汪汪！")</code>。方法里的 <code>self</code> 别删。',
      '创建对象用<b>类名加括号</b>：<code>d = Dog()</code>；调用方法用点号：<code>d.bark()</code>——注意也要带括号。',
      '完整写法：<br><code>class Dog:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>def bark(self):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>print("汪汪！")</code><br><code>d = Dog()</code><br><code>d.bark()</code>'
    ],
    explanation: '类是"图纸"，对象是照图纸造出来的东西：<code>Dog()</code> 造一只狗，<code>d.bark()</code> 让它叫。方法第一个参数固定写 <code>self</code>，调用时不用传。'
  },
  {
    id: 'q5_class_k2', type: 'code', cat: 'class', catName: '类与对象',
    point: 'class', stage: 5, level: 2,
    title: '会自我介绍的学生',
    desc: '定义类 <code>Student</code>：<br>① <code>__init__</code> 方法接收 <code>name</code>，存成 <code>self.name</code>；② 方法 <code>introduce</code> 输出：<code>我是XXX</code>。<br>然后创建 <code>Student("小明")</code> 并调用 <code>introduce()</code>。',
    io: [['输出', '我是小明']],
    starter: 'class Student:\n    def __init__(self, name):\n        pass\n\n    def introduce(self):\n        pass\n\n# 创建 s = Student("小明")，再调用 s.introduce()\n',
    stdinTests: [{ name: '学生自我介绍', stdin: '', expect: '我是小明' }],
    hints: [
      '<code>__init__</code> 里存名字：<code>self.name = name</code>——把传进来的 name 贴到对象身上。',
      '<code>introduce</code> 里用 f-string 取出来：<code>print(f"我是{self.name}")</code>——注意要写 <code>self.name</code>。',
      '完整写法：<br><code>class Student:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>def __init__(self, name):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>self.name = name</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>def introduce(self):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>print(f"我是{self.name}")</code><br><code>s = Student("小明")</code><br><code>s.introduce()</code>'
    ],
    explanation: '<code>__init__</code> 在创建对象时自动执行：<code>Student("小明")</code> 会把 "小明" 传给 name，存成 <code>self.name</code>。之后对象的方法里都能用 <code>self.name</code> 拿到它——这就是<b>实例属性</b>。'
  },

  // —— 文件读写 ——
  {
    id: 'q5_file_k1', type: 'code', cat: 'file', catName: '文件读写',
    point: 'file', stage: 5, level: 1,
    title: '把话写进文件再读出来',
    desc: '① 用 <code>"w"</code> 模式打开 <code>hello.txt</code>，写入 <code>Hello Python</code>，然后关闭；② 再用 <code>"r"</code> 模式打开它，读出内容并输出。',
    io: [['输出', 'Hello Python']],
    starter: '# 1. w 模式打开 hello.txt，写入 Hello Python，关闭\n# 2. r 模式打开，read() 读出并 print\n',
    stdinTests: [{ name: '写入再读出', stdin: '', expect: 'Hello Python' }],
    hints: [
      '写入三步：<code>f = open("hello.txt", "w")</code> → <code>f.write("Hello Python")</code> → <code>f.close()</code>。',
      '读取三步：<code>f = open("hello.txt")</code>（不写模式默认就是 "r"）→ <code>print(f.read())</code> → <code>f.close()</code>。',
      '完整写法：<br><code>f = open("hello.txt", "w")</code><br><code>f.write("Hello Python")</code><br><code>f.close()</code><br><code>f = open("hello.txt")</code><br><code>print(f.read())</code><br><code>f.close()</code>'
    ],
    explanation: '<code>"w"</code> 是写模式（会覆盖原内容），<code>write()</code> 写入，<code>close()</code> 收尾；再打开时用 <code>read()</code> 一次读出全部内容。写完记得 close，数据才真正落盘。'
  },
  {
    id: 'q5_file_k2', type: 'code', cat: 'file', catName: '文件读写',
    point: 'file', stage: 5, level: 2,
    title: '追加写入',
    desc: '① 用 <code>"w"</code> 模式打开 <code>log.txt</code>，写入一行 <code>第一行</code>（记得带 <code>\\n</code>），关闭；② 用 <code>"a"</code> 追加模式打开，写入一行 <code>第二行</code>，关闭；③ 读出整个文件并输出（应该有两行）。',
    io: [['输出', '第一行 / 第二行 各占一行']],
    starter: '# 1. w 模式写入 第一行\\n\n# 2. a 模式追加 第二行\\n\n# 3. 读出全部内容并输出\n',
    stdinTests: [{ name: '追加后读出两行', stdin: '', expect: '第一行\n第二行' }],
    hints: [
      '写入的字符串末尾带换行符：<code>f.write("第一行\\n")</code>、<code>f.write("第二行\\n")</code>——不加 \\n 两行会挤在一起。',
      '追加模式是 <code>"a"</code>：不会清空文件，接着末尾往后写。',
      '完整写法：<br><code>f = open("log.txt", "w")</code><br><code>f.write("第一行\\n")</code><br><code>f.close()</code><br><code>f = open("log.txt", "a")</code><br><code>f.write("第二行\\n")</code><br><code>f.close()</code><br><code>f = open("log.txt")</code><br><code>print(f.read())</code><br><code>f.close()</code>'
    ],
    explanation: '<code>"a"</code> 是追加模式：在文件末尾接着写，不清空原内容（区别于 "w" 的覆盖）。读回来时 <code>read()</code> 会把换行符也读出来，所以正好两行。'
  },

  // —— 异常处理 ——
  {
    id: 'q5_exception_k1', type: 'code', cat: 'exception', catName: '异常处理',
    point: 'exception', stage: 5, level: 1,
    title: '接住除零错误',
    desc: '程序直接计算 <code>10 / 0</code> 会崩溃。请用 <code>try / except</code> 接住 <code>ZeroDivisionError</code>，出错时输出：<code>不能除以零</code>。',
    io: [['输出', '不能除以零']],
    starter: 'try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    pass\n',
    stdinTests: [{ name: '捕获除零', stdin: '', expect: '不能除以零' }],
    hints: [
      'starter 的骨架已经写好——把 <code>pass</code> 换成 <code>print("不能除以零")</code>（记得缩进）。',
      'try 里放"可能出错的代码"，except 后面写错误类型；出错时 Python 会自动跳到 except 里执行。',
      '完整写法：<br><code>try:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>x = 10 / 0</code><br><code>except ZeroDivisionError:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("不能除以零")</code>'
    ],
    explanation: '<code>try</code> 里放可能出错的代码；一旦真的出错，程序不会崩溃，而是跳进对应的 <code>except</code> 里执行——就像走钢丝下面张着安全网。'
  },
  {
    id: 'q5_exception_k2', type: 'code', cat: 'exception', catName: '异常处理',
    point: 'exception', stage: 5, level: 2,
    title: '输入不是数字也不怕',
    desc: '用 <code>input()</code> 读入一行，尝试 <code>int()</code> 转成整数：<br>① 转换成功就输出它的 2 倍；② 如果输入的不是数字，<code>int()</code> 会抛 <code>ValueError</code>——用 try / except 接住，输出：<code>输入的不是数字</code>。',
    io: [['输入 abc', '输出 输入的不是数字'], ['输入 6', '输出 12']],
    starter: 'try:\n    n = int(input())\n    pass\nexcept ValueError:\n    pass\n',
    stdinTests: [
      { name: '输入 abc', stdin: 'abc', expect: '输入的不是数字' },
      { name: '输入 6', stdin: '6', expect: '12' }
    ],
    hints: [
      'try 里的顺序：先转 <code>n = int(input())</code>，成功接着 <code>print(n * 2)</code>（把 starter 里的两个 pass 换掉）。',
      '输入不是数字时 <code>int()</code> 会抛 <code>ValueError</code>，程序跳到 except——这时就不会输出 2 倍了。',
      '完整写法：<br><code>try:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>n = int(input())</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(n * 2)</code><br><code>except ValueError:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("输入的不是数字")</code>'
    ],
    explanation: '<code>int("abc")</code> 会抛 <code>ValueError</code>。try 里出错时，后面的代码不再执行，直接跳到 except——所以错误输入只会看到提示，不会看到报错崩溃。'
  },

  // —— 模块导入 ——
  {
    id: 'q5_module_k1', type: 'code', cat: 'module', catName: '模块导入',
    point: 'module', stage: 5, level: 1,
    title: '借用 math 工具箱',
    desc: '导入 <code>math</code> 模块：第一行输出 <code>math.sqrt(16)</code>（开平方），第二行输出 <code>math.floor(3.9)</code>（向下取整）。',
    io: [['输出', '第一行 4.0，第二行 3']],
    starter: '# 1. import math\n# 2. 输出 math.sqrt(16)\n# 3. 输出 math.floor(3.9)\n',
    stdinTests: [{ name: 'math 开方与取整', stdin: '', expect: '4.0\n3' }],
    hints: [
      '导入写在最上面：<code>import math</code>。',
      '用点号使用工具：<code>print(math.sqrt(16))</code>、<code>print(math.floor(3.9))</code>。开平方的结果是 4.0（小数），向下取整是 3。',
      '完整写法：<br><code>import math</code><br><code>print(math.sqrt(16))</code><br><code>print(math.floor(3.9))</code>'
    ],
    explanation: '模块就是 Python 自带的工具箱：<code>import math</code> 之后就能用 <code>math.工具名()</code>。<code>sqrt</code> 是开平方（16 的平方根是 4.0），<code>floor</code> 是向下取整（3.9 → 3）。'
  },
  {
    id: 'q5_module_k2', type: 'code', cat: 'module', catName: '模块导入',
    point: 'module', stage: 5, level: 2,
    title: '固定种子的骰子',
    desc: '随机数本来每次都不一样，但设定<b>种子</b>后结果就固定了。<br>读入一个整数作为种子：<code>s = int(input())</code>，然后 <code>random.seed(s)</code>，最后输出 <code>random.randint(1, 6)</code>。',
    io: [['输入 1', '输出 2'], ['输入 2', '输出 1'], ['输入 7', '输出 3']],
    starter: '# 1. import random\n# 2. s = int(input())，random.seed(s)\n# 3. 输出 random.randint(1, 6)\n',
    stdinTests: [
      { name: '种子 1', stdin: '1', expect: '2' },
      { name: '种子 2', stdin: '2', expect: '1' },
      { name: '种子 7', stdin: '7', expect: '3' }
    ],
    hints: [
      '顺序很重要：先 <code>random.seed(s)</code> 再 <code>random.randint(1, 6)</code>——种子决定后面随机数走哪条路。',
      '种子相同，<code>randint(1, 6)</code> 的结果就相同：种子 1 得 2、种子 2 得 1、种子 7 得 3。',
      '完整写法：<br><code>import random</code><br><code>s = int(input())</code><br><code>random.seed(s)</code><br><code>print(random.randint(1, 6))</code>'
    ],
    explanation: '<code>random.seed(s)</code> 给随机数设定起点：种子一样，后面产生的"随机"数就完全一样。这个技巧叫"可复现的随机"，写游戏和做实验时特别有用。'
  }
];

/* ---------------- 参考答案（自检脚本 / 后续「查看参考答案」使用） ---------------- */
(function () {
  const A = {
    'q1_pyintro_k1': 'print("Hello Python")',
    'q1_print_k1': 'print("Python")\nprint("你好")',
    'q1_print_k2': 'print(2 + 3)',
    'q1_variable_k1': 'name = "小明"\nprint(name)',
    'q1_variable_k2': 'age = 12\nprint(age)',
    'q1_variable_k3': 'score = 10\nscore = 20\nprint(score)',
    'q1_datatype_k1': 'city = "北京"\nprint("我喜欢" + city)',
    'q1_datatype_k2': 'name = "小明"\nage = 12\nprint(f"{name}今年{age}岁")',
    'q2_variable_k1': 'n = int(input())\ntotal = n + 10\nprint(total)',
    'q2_input_k1': 'name = input()\nprint(f"你好，{name}！")',
    'q2_input_k2': 'n = int(input())\nprint(n * 2)',
    'q2_operator_k1': 'a = int(input())\nb = int(input())\nprint(a + b)\nprint(a - b)\nprint(a * b)',
    'q2_operator_k2': 'a = int(input())\nb = int(input())\nprint(a // b)\nprint(a % b)',
    'q2_datatype_k1': 'a = input()\nb = input()\nprint(a + b)\nprint(int(a) + int(b))',
    'q2_if_k1': 'n = int(input())\nif n > 0:\n    print("正数")\nelse:\n    print("不是正数")',
    'q2_if_k2': 'n = int(input())\nif n % 2 == 0:\n    print("偶数")\nelse:\n    print("奇数")',
    'q2_for_k1': 'for i in range(1, 4):\n    print(i)',
    'q2_for_k2': 'for i in range(1, 6):\n    print(i * i)',
    'q2_while_k1': 'i = 1\nwhile i <= 3:\n    print(i)\n    i = i + 1',
    'q3_list_k1': 'nums = [10, 20, 30]\nprint(nums[0])',
    'q3_list_k2': 'fruits = ["苹果", "香蕉", "橘子"]\nfruits[1] = "葡萄"\nprint(fruits)',
    'q3_tuple_k1': 'point = (3, 5)\nprint(point)\nprint(point[0])',
    'q3_tuple_k2': 'colors = ("红", "绿", "蓝")\nprint(len(colors))\nprint(colors[2])',
    'q3_dict_k1': 'student = {"name": "小明", "age": 12}\nprint(student["name"])',
    'q3_dict_k2': 'student = {"name": "小明", "age": 12}\nstudent["age"] = 13\nstudent["city"] = "北京"\nprint(student)',
    'q3_set_k1': 'nums = {1, 2, 2, 3}\nprint(len(nums))\nprint(2 in nums)',
    'q3_set_k2': 's = {1, 2, 3}\ns.add(4)\ns.discard(2)\nprint(len(s))\nprint(2 in s)\nprint(4 in s)',
    'q4_def_k1': 'def say_hi():\n    print("你好，Python！")\nsay_hi()\nsay_hi()',
    'q4_def_k2': 'def greet(name):\n    print(f"你好，{name}！")\ngreet("小明")\ngreet("小红")',
    'q4_param_k1': 'def add(a, b):\n    print(a + b)\nadd(2, 3)\nadd(10, 5)',
    'q4_param_k2': 'def greet(name, word="你好"):\n    print(f"{word}，{name}！")\ngreet("小明")\ngreet("小红", "早上好")',
    'q4_return_k1': 'def add(a, b):\n    return a + b\nresult = add(2, 3)\nprint(result)\nprint(add(10, 20))',
    'q4_return_k2': 'def double(n):\n    return n * 2\nprint(double(4))\nprint(double(double(3)))',
    'q5_class_k1': 'class Dog:\n    def bark(self):\n        print("汪汪！")\nd = Dog()\nd.bark()',
    'q5_class_k2': 'class Student:\n    def __init__(self, name):\n        self.name = name\n    def introduce(self):\n        print(f"我是{self.name}")\ns = Student("小明")\ns.introduce()',
    'q5_file_k1': 'f = open("hello.txt", "w")\nf.write("Hello Python")\nf.close()\nf = open("hello.txt")\nprint(f.read())\nf.close()',
    'q5_file_k2': 'f = open("log.txt", "w")\nf.write("第一行\\n")\nf.close()\nf = open("log.txt", "a")\nf.write("第二行\\n")\nf.close()\nf = open("log.txt")\nprint(f.read())\nf.close()',
    'q5_exception_k1': 'try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("不能除以零")',
    'q5_exception_k2': 'try:\n    n = int(input())\n    print(n * 2)\nexcept ValueError:\n    print("输入的不是数字")',
    'q5_module_k1': 'import math\nprint(math.sqrt(16))\nprint(math.floor(3.9))',
    'q5_module_k2': 'import random\ns = int(input())\nrandom.seed(s)\nprint(random.randint(1, 6))'
  };
  (window.BASIC_CODE || []).forEach((e) => { if (A[e.id]) { e.answer = A[e.id]; } });
})();

/* ---------------- 合并进总题库（不覆盖、不删除任何旧题） ---------------- */
window.EXERCISES = (window.EXERCISES || []).concat(window.BASIC_CODE);
