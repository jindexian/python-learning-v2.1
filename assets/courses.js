/* ============================================================
 * Python 渐进式学习课程（增量新增，不改动原有 31 道代码题）
 * 1. STAGES：5 个学习阶段 + 高级阶段（原算法/进阶题归入）
 * 2. COURSE_QUIZ：新增的选择题 / 判断题 / 填空题
 *    - 兼容原判题系统：统一挂到 window.EXERCISES
 *    - 新增字段：type(choice/bool/fill)、point(知识点)、stage(阶段)
 * ============================================================ */

/* ---------------- 学习阶段 ---------------- */
window.STAGES = [
  { id: 1, name: 'Python 认识', star: 1, desc: '认识 Python、学会输出、写注释、用变量存东西',
    points: ['pyintro', 'print', 'comment', 'variable', 'datatype'] },
  { id: 2, name: '基础语法', star: 2, desc: '输入、运算、条件判断、两种循环',
    points: ['input', 'operator', 'if', 'while', 'for'] },
  { id: 3, name: '数据结构', star: 3, desc: '列表、元组、字典、集合四种容器',
    points: ['list', 'tuple', 'dict', 'set'] },
  { id: 4, name: '函数', star: 4, desc: '定义函数、传参数、返回结果',
    points: ['def', 'param', 'return'] },
  { id: 5, name: '进阶', star: 5, desc: '类与对象、文件读写、异常处理、模块导入',
    points: ['class', 'file', 'exception', 'module'] },
  { id: 6, name: '高级挑战', star: 5, desc: '装饰器、生成器、闭包、算法等进阶内容（学完前 5 阶段再来）',
    points: ['advanced'] }
];

/* ---------------- 知识点清单 ---------------- */
window.POINTS = {
  pyintro:  { name: 'Python 是什么', stage: 1 },
  print:    { name: 'print 输出',    stage: 1 },
  comment:  { name: '注释',          stage: 1 },
  variable: { name: '变量',          stage: 1 },
  datatype: { name: '数据类型',      stage: 1 },
  input:    { name: 'input 输入',    stage: 2 },
  operator: { name: '运算符',        stage: 2 },
  if:       { name: 'if 判断',       stage: 2 },
  while:    { name: 'while 循环',    stage: 2 },
  for:      { name: 'for 循环',      stage: 2 },
  list:     { name: '列表 list',     stage: 3 },
  tuple:    { name: '元组 tuple',    stage: 3 },
  dict:     { name: '字典 dict',     stage: 3 },
  set:      { name: '集合 set',      stage: 3 },
  def:      { name: '定义函数',      stage: 4 },
  param:    { name: '函数参数',      stage: 4 },
  return:   { name: 'return 返回值', stage: 4 },
  class:    { name: '类与对象',      stage: 5 },
  file:     { name: '文件读写',      stage: 5 },
  exception:{ name: '异常处理',      stage: 5 },
  module:   { name: '模块导入',      stage: 5 },
  advanced: { name: '高级特性',      stage: 6 }
};

/* ---------------- 新增题目 ---------------- */
window.COURSE_QUIZ = [

  /* ========== 阶段 1：Python 认识 ========== */
  // —— Python 是什么 ——
  { id: 'q1_pyintro_c1', type: 'choice', cat: 'pyintro', catName: 'Python 是什么',
    point: 'pyintro', stage: 1, level: 1,
    title: 'Python 是一门什么？',
    desc: '刚接触编程，先搞清楚 Python 到底是什么。',
    options: ['一种编程语言', '一种操作系统', '一种数据库', '一种浏览器'],
    answer: 0,
    explain: 'Python 是一门<b>编程语言</b>，我们用它写代码告诉计算机做什么。它不是操作系统、数据库或浏览器。' },

  { id: 'q1_pyintro_c2', type: 'choice', cat: 'pyintro', catName: 'Python 是什么',
    point: 'pyintro', stage: 1, level: 1,
    title: '下面哪句话是对的？',
    desc: '关于 Python 的特点，选一个正确的说法。',
    options: ['Python 语法接近英语，读起来比较自然',
              'Python 代码必须先编译成可执行文件才能运行',
              'Python 只能用来做网站',
              'Python 是微软开发的'],
    answer: 0,
    explain: 'Python 以<b>语法简洁、接近自然语言</b>著称，适合初学者。它是解释型语言（不用先编译），能做的事也远不止网站。' },

  { id: 'q1_pyintro_b1', type: 'bool', cat: 'pyintro', catName: 'Python 是什么',
    point: 'pyintro', stage: 1, level: 1,
    title: '判断题：学 Python 之前必须先学会 C 语言。',
    desc: '很多新手都会有的疑问。',
    answer: false,
    explain: '<b>错误。</b>Python 本身就是非常适合作为第一门编程语言的，不需要先学 C。' },

  // —— print 输出 ——
  { id: 'q1_print_c1', type: 'choice', cat: 'print', catName: 'print 输出',
    point: 'print', stage: 1, level: 1,
    title: '想在屏幕上显示内容，用哪个函数？',
    desc: '这是你写的第一行代码里一定会用到的函数。',
    options: ['input()', 'print()', 'len()', 'type()'],
    answer: 1,
    explain: '<code>print()</code> 用来<b>输出/显示</b>内容到屏幕。<code>input()</code> 是接收输入，<code>len()</code> 数长度，<code>type()</code> 查类型。' },

  { id: 'q1_print_c2', type: 'choice', cat: 'print', catName: 'print 输出',
    point: 'print', stage: 1, level: 1,
    title: 'print("3 + 5") 的输出结果是？',
    desc: '注意看引号哦，引号里的内容会被原样输出。',
    options: ['8', '3 + 5', '35', '报错'],
    answer: 1,
    explain: '加了引号就是<b>字符串</b>，会原样输出 <code>3 + 5</code>。如果不加引号写成 <code>print(3 + 5)</code>，才会输出 8。' },

  { id: 'q1_print_b1', type: 'bool', cat: 'print', catName: 'print 输出',
    point: 'print', stage: 1, level: 1,
    title: '判断题：print(100) 和 print("100") 的输出看起来是一样的。',
    desc: '想想数字和字符串在屏幕上显示的区别。',
    answer: true,
    explain: '<b>正确。</b>显示在屏幕上都是 100，但它们的<b>类型不同</b>：前者是整数，后者是字符串。类型不同，能做的事也不同。' },

  { id: 'q1_print_f1', type: 'fill', cat: 'print', catName: 'print 输出',
    point: 'print', stage: 1, level: 1,
    title: '填空：让屏幕上显示「你好」',
    desc: '把缺少的函数名补上（只填函数名，不要加括号）。',
    code: '____("你好")',
    answer: ['print'],
    explain: '<code>print("你好")</code> —— print 后面跟括号，括号里放要显示的内容。' },

  // —— 注释 ——
  { id: 'q1_comment_c1', type: 'choice', cat: 'comment', catName: '注释',
    point: 'comment', stage: 1, level: 1,
    title: 'Python 单行注释用什么符号开头？',
    desc: '注释是写给「人」看的说明，Python 不会执行它。',
    options: ['//', '#', '/*', '--'],
    answer: 1,
    explain: 'Python 用 <code>#</code> 开头表示单行注释。<code>//</code> 是 C/Java 的写法，在 Python 里是整除运算符。' },

  { id: 'q1_comment_b1', type: 'bool', cat: 'comment', catName: '注释',
    point: 'comment', stage: 1, level: 1,
    title: '判断题：写注释会让程序运行变慢。',
    desc: '注释到底会不会影响程序？',
    answer: false,
    explain: '<b>错误。</b>Python 执行时会<b>直接跳过注释</b>，不会影响运行速度。多写注释是好习惯。' },

  // —— 变量 ——
  { id: 'q1_variable_c1', type: 'choice', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '下列哪个变量名是合法的？',
    desc: '变量名有一些「规矩」。',
    options: ['my_name', '2name', 'my-name', 'my name'],
    answer: 0,
    explain: '变量名只能由<b>字母、数字、下划线</b>组成，且<b>不能以数字开头</b>。<code>my_name</code> 合法；<code>2name</code> 数字开头，<code>my-name</code> 有减号，<code>my name</code> 有空格，都不行。' },

  { id: 'q1_variable_c2', type: 'choice', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '执行下面代码后，x 的值是多少？',
    desc: '变量是可以被重新赋值的「盒子」。',
    code: 'x = 5\nx = 8\nprint(x)',
    options: ['5', '8', '13', '报错'],
    answer: 1,
    explain: '变量像盒子，<b>后放的会覆盖先放的</b>。先装 5 再装 8，最后是 8。' },

  { id: 'q1_variable_b1', type: 'bool', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '判断题：Python 中使用变量前必须先声明它的类型。',
    desc: '比如必须先写 int x 才能用 x？',
    answer: false,
    explain: '<b>错误。</b>Python 是<b>动态类型</b>语言，直接 <code>x = 10</code> 就能用，不用（也不能）提前声明类型。' },

  { id: 'q1_variable_f1', type: 'fill', cat: 'variable', catName: '变量',
    point: 'variable', stage: 1, level: 1,
    title: '填空：把 10 存进变量 age',
    desc: '只填中间缺少的符号。',
    code: 'age ____ 10',
    answer: ['='],
    explain: '<code>age = 10</code> —— 一个等号是<b>赋值</b>，表示「把右边的 10 放进左边的 age 里」。' },

  // —— 数据类型 ——
  { id: 'q1_datatype_c1', type: 'choice', cat: 'datatype', catName: '数据类型',
    point: 'datatype', stage: 1, level: 1,
    title: '"123" 是什么类型？',
    desc: '注意看有没有引号。',
    options: ['整数 int', '字符串 str', '浮点数 float', '布尔 bool'],
    answer: 1,
    explain: '带引号的就是<b>字符串 str</b>。<code>123</code>（无引号）才是整数。可以用 <code>type()</code> 查看。' },

  { id: 'q1_datatype_c2', type: 'choice', cat: 'datatype', catName: '数据类型',
    point: 'datatype', stage: 1, level: 1,
    title: 'type(3.14) 的结果是？',
    desc: '带小数点的数字属于什么类型？',
    options: ['int', 'float', 'str', 'bool'],
    answer: 1,
    explain: '带小数点的是<b>浮点数 float</b>。整数是 int，字符串是 str，True/False 是 bool。' },

  { id: 'q1_datatype_b1', type: 'bool', cat: 'datatype', catName: '数据类型',
    point: 'datatype', stage: 1, level: 1,
    title: '判断题："10" + "20" 的结果是 30。',
    desc: '两个字符串相加会发生什么？',
    answer: false,
    explain: '<b>错误。</b>字符串相加是<b>拼接</b>，结果是 <code>"1020"</code>。要算数得先转成数字：<code>int("10") + int("20")</code>。' },

  /* ========== 阶段 2：基础语法 ========== */
  // —— input 输入 ——
  { id: 'q2_input_c1', type: 'choice', cat: 'input', catName: 'input 输入',
    point: 'input', stage: 2, level: 1,
    title: 'input() 得到的内容是什么类型？',
    desc: '这是新手最常踩的坑之一。',
    options: ['一定得到字符串 str', '一定得到整数 int', '输入数字就得到 int', '根据输入自动判断'],
    answer: 0,
    explain: '<code>input()</code> <b>永远返回字符串</b>。想当数字用，必须转换：<code>age = int(input())</code>。' },

  { id: 'q2_input_c2', type: 'choice', cat: 'input', catName: 'input 输入',
    point: 'input', stage: 2, level: 1,
    title: '想让用户输入一个整数并存到 n，正确写法是？',
    desc: '需要把字符串转成整数。',
    options: ['n = input()', 'n = int(input())', 'n = str(input())', 'n = float(input())'],
    answer: 1,
    explain: '<code>int(input())</code>：先拿到字符串，再用 <code>int()</code> 转成整数。' },

  { id: 'q2_input_b1', type: 'bool', cat: 'input', catName: 'input 输入',
    point: 'input', stage: 2, level: 1,
    title: '判断题：age = input() 之后，可以直接写 age + 1 来计算年龄加 1。',
    desc: '想一想 input 拿到的是什么类型。',
    answer: false,
    explain: '<b>错误。</b>age 是字符串，字符串不能和数字相加，会报 TypeError。要先 <code>age = int(input())</code>。' },

  // —— 运算符 ——
  { id: 'q2_operator_c1', type: 'choice', cat: 'operator', catName: '运算符',
    point: 'operator', stage: 2, level: 1,
    title: '7 // 2 的结果是？',
    desc: '注意是两个斜杠。',
    options: ['3.5', '3', '1', '4'],
    answer: 1,
    explain: '<code>//</code> 是<b>整除</b>（取商不要余数），结果是 3。<code>/</code> 才是普通除法得 3.5，<code>%</code> 取余数得 1。' },

  { id: 'q2_operator_c2', type: 'choice', cat: 'operator', catName: '运算符',
    point: 'operator', stage: 2, level: 1,
    title: '判断两个值是否相等，应该用？',
    desc: '一个等号和两个等号的区别很重要。',
    options: ['=', '==', '===', '!='],
    answer: 1,
    explain: '<code>==</code> 是「判断是否相等」，<code>=</code> 是「赋值」。两者千万别混淆。' },

  { id: 'q2_operator_b1', type: 'bool', cat: 'operator', catName: '运算符',
    point: 'operator', stage: 2, level: 1,
    title: '判断题："a" * 3 的结果是 "aaa"。',
    desc: '字符串也能做「乘法」吗？',
    answer: true,
    explain: '<b>正确。</b>字符串乘数字表示<b>重复</b>若干次，所以 <code>"a" * 3</code> 得到 <code>"aaa"</code>。' },

  // —— if 判断 ——
  { id: 'q2_if_c1', type: 'choice', cat: 'if', catName: 'if 判断',
    point: 'if', stage: 2, level: 1,
    title: '下面代码的输出是？',
    desc: '注意 if / elif / else 只会走其中一个分支。',
    code: 'score = 85\nif score >= 90:\n    print("优秀")\nelif score >= 60:\n    print("及格")\nelse:\n    print("不及格")',
    options: ['优秀', '及格', '不及格', '什么都不输出'],
    answer: 1,
    explain: '85 不满足 >=90，但满足 >=60，所以走 <code>elif</code>，输出<b>及格</b>。条件是从上往下判断，命中一个就结束。' },

  { id: 'q2_if_b1', type: 'bool', cat: 'if', catName: 'if 判断',
    point: 'if', stage: 2, level: 1,
    title: '判断题：if 后面的条件必须加括号，写成 if (x > 5):',
    desc: 'Python 的 if 需要括号吗？',
    answer: false,
    explain: '<b>错误。</b>Python 的 if <b>不需要</b>括号，直接写 <code>if x > 5:</code> 就行（加了也能跑，但不是 Python 风格）。' },

  { id: 'q2_if_b2', type: 'bool', cat: 'if', catName: 'if 判断',
    point: 'if', stage: 2, level: 1,
    title: '判断题：if 语句下面缩进的代码块，缩进必须一致。',
    desc: 'Python 靠缩进来区分代码块。',
    answer: true,
    explain: '<b>正确。</b>Python 用<b>缩进</b>表示代码层级，同一层必须对齐，否则会报 IndentationError。' },

  { id: 'q2_if_f1', type: 'fill', cat: 'if', catName: 'if 判断',
    point: 'if', stage: 2, level: 1,
    title: '填空：条件不成立时执行的部分',
    desc: '填一个关键字。',
    code: 'if age >= 18:\n    print("成年")\n____:\n    print("未成年")',
    answer: ['else'],
    explain: '<code>else:</code> 表示「否则」，当 if 条件不成立时执行。' },

  // —— while 循环 ——
  { id: 'q2_while_c1', type: 'choice', cat: 'while', catName: 'while 循环',
    point: 'while', stage: 2, level: 2,
    title: '下面代码会打印几次 "hi"？',
    desc: '数一数循环执行了几次。',
    code: 'i = 0\nwhile i < 3:\n    print("hi")\n    i = i + 1',
    options: ['2 次', '3 次', '4 次', '无限次'],
    answer: 1,
    explain: 'i 从 0 开始，i=0、1、2 时条件成立，共 <b>3 次</b>；i 变成 3 时条件不成立，循环结束。' },

  { id: 'q2_while_b1', type: 'bool', cat: 'while', catName: 'while 循环',
    point: 'while', stage: 2, level: 2,
    title: '判断题：while True: 后面如果不写 break，循环会一直执行下去。',
    desc: '这就是常说的「死循环」。',
    answer: true,
    explain: '<b>正确。</b><code>while True</code> 条件永远成立，必须用 <code>break</code> 跳出，否则就是死循环。' },

  // —— for 循环 ——
  { id: 'q2_for_c1', type: 'choice', cat: 'for', catName: 'for 循环',
    point: 'for', stage: 2, level: 2,
    title: 'range(1, 5) 会产生哪些数字？',
    desc: '注意 range 的结束值「取不到」。',
    options: ['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '2, 3, 4'],
    answer: 0,
    explain: '<code>range(1, 5)</code> 从 1 开始，<b>到 5 之前结束</b>，所以是 1、2、3、4。记住「包头不包尾」。' },

  { id: 'q2_for_c2', type: 'choice', cat: 'for', catName: 'for 循环',
    point: 'for', stage: 2, level: 2,
    title: '想打印 1 到 10 的所有偶数，最合适的写法是？',
    desc: 'range 还能设置步长。',
    options: ['range(1, 10)', 'range(2, 11, 2)', 'range(0, 10)', 'range(2, 10)'],
    answer: 1,
    explain: '<code>range(2, 11, 2)</code>：从 2 开始，到 11 之前结束，<b>每次加 2</b> → 2、4、6、8、10。' },

  { id: 'q2_for_b1', type: 'bool', cat: 'for', catName: 'for 循环',
    point: 'for', stage: 2, level: 2,
    title: '判断题：for 循环可以直接遍历字符串里的每个字符。',
    desc: '比如 for ch in "abc":',
    answer: true,
    explain: '<b>正确。</b>字符串也是「可迭代对象」，<code>for ch in "abc":</code> 会依次取出 a、b、c。' },

  /* ========== 阶段 3：数据结构 ========== */
  // —— list 列表 ——
  { id: 'q3_list_c1', type: 'choice', cat: 'list', catName: '列表 list',
    point: 'list', stage: 3, level: 2,
    title: 'a = [10, 20, 30]，a[1] 的值是？',
    desc: '编程世界的下标从 0 开始数。',
    options: ['10', '20', '30', '1'],
    answer: 1,
    explain: '下标<b>从 0 开始</b>：a[0]=10，a[1]=20，a[2]=30。这是新手最容易记混的地方。' },

  { id: 'q3_list_c2', type: 'choice', cat: 'list', catName: '列表 list',
    point: 'list', stage: 3, level: 2,
    title: '想往列表末尾追加一个元素，用哪个方法？',
    desc: '列表最常用的操作之一。',
    options: ['append()', 'add()', 'push()', 'insert()'],
    answer: 0,
    explain: '列表用 <code>append()</code> 追加元素。<code>add()</code> 是集合的方法，<code>push</code> 是其他语言的说法。' },

  { id: 'q3_list_b1', type: 'bool', cat: 'list', catName: '列表 list',
    point: 'list', stage: 3, level: 2,
    title: '判断题：列表创建后，里面的元素不能再修改。',
    desc: '列表是「可变」的还是「不可变」的？',
    answer: false,
    explain: '<b>错误。</b>列表是<b>可变</b>的，可以改元素：<code>a[0] = 99</code>。不可变的是元组 tuple。' },

  { id: 'q3_list_f1', type: 'fill', cat: 'list', catName: '列表 list',
    point: 'list', stage: 3, level: 2,
    title: '填空：取出列表最后一个元素',
    desc: '填下标（负数表示倒数）。',
    code: 'a = [1, 2, 3]\nlast = a[____]',
    answer: ['-1'],
    explain: '<code>a[-1]</code> 表示倒数第一个元素，是 Python 很方便的写法。' },

  // —— tuple 元组 ——
  { id: 'q3_tuple_c1', type: 'choice', cat: 'tuple', catName: '元组 tuple',
    point: 'tuple', stage: 3, level: 2,
    title: '下列哪个是元组？',
    desc: '看括号来区分。',
    options: ['[1, 2, 3]', '(1, 2, 3)', '{1, 2, 3}', '{"a": 1}'],
    answer: 1,
    explain: '圆括号 <code>()</code> 是元组，方括号 <code>[]</code> 是列表，花括号 <code>{}</code> 是集合或字典。' },

  { id: 'q3_tuple_b1', type: 'bool', cat: 'tuple', catName: '元组 tuple',
    point: 'tuple', stage: 3, level: 2,
    title: '判断题：元组里的元素不能被修改。',
    desc: '这是元组和列表最大的区别。',
    answer: true,
    explain: '<b>正确。</b>元组是<b>不可变</b>的，创建后不能增删改元素。适合放不该被改动的数据。' },

  // —— dict 字典 ——
  { id: 'q3_dict_c1', type: 'choice', cat: 'dict', catName: '字典 dict',
    point: 'dict', stage: 3, level: 2,
    title: 'd = {"name": "Tom", "age": 18}，取名字应该写？',
    desc: '字典用「键」来取值。',
    options: ['d["name"]', 'd["Tom"]', 'd.name', 'd[0]'],
    answer: 0,
    explain: '字典用<b>键（key）</b>取值：<code>d["name"]</code> 得到 "Tom"。键是左边的，值是右边的。' },

  { id: 'q3_dict_b1', type: 'bool', cat: 'dict', catName: '字典 dict',
    point: 'dict', stage: 3, level: 2,
    title: '判断题：字典里的键（key）可以重复。',
    desc: '如果有两个一样的 key 会怎样？',
    answer: false,
    explain: '<b>错误。</b>字典的键<b>必须唯一</b>，重复赋值会覆盖前面的值。' },

  { id: 'q3_dict_f1', type: 'fill', cat: 'dict', catName: '字典 dict',
    point: 'dict', stage: 3, level: 2,
    title: '填空：给字典新增一对键值',
    desc: '填一个键名（字符串形式）。',
    code: 'd = {}\nd[____] = 18',
    answer: ['"age"', "'age'"],
    explain: '<code>d["age"] = 18</code> —— 字典用中括号加键名来新增或修改。' },

  // —— set 集合 ——
  { id: 'q3_set_c1', type: 'choice', cat: 'set', catName: '集合 set',
    point: 'set', stage: 3, level: 2,
    title: '集合最大的特点是？',
    desc: '想想什么场景该用集合。',
    options: ['自动去重，元素不重复', '元素按顺序排列', '可以存重复的键', '必须用下标访问'],
    answer: 0,
    explain: '集合<b>自动去重</b>且<b>无序</b>。想去掉列表里的重复值，<code>set(列表)</code> 很方便。' },

  { id: 'q3_set_b1', type: 'bool', cat: 'set', catName: '集合 set',
    point: 'set', stage: 3, level: 2,
    title: '判断题：可以用下标访问集合元素，比如 s[0]。',
    desc: '集合是有序的吗？',
    answer: false,
    explain: '<b>错误。</b>集合是<b>无序</b>的，没有下标概念，<code>s[0]</code> 会报 TypeError。' },

  /* ========== 阶段 4：函数 ========== */
  // —— 定义函数 ——
  { id: 'q4_def_c1', type: 'choice', cat: 'def', catName: '定义函数',
    point: 'def', stage: 4, level: 2,
    title: 'Python 中定义函数用哪个关键字？',
    desc: '函数就是把一段代码打包起来重复用。',
    options: ['function', 'def', 'define', 'func'],
    answer: 1,
    explain: 'Python 用 <code>def</code> 定义函数，例如 <code>def hello():</code>。<code>function</code> 是 JavaScript 的写法。' },

  { id: 'q4_def_b1', type: 'bool', cat: 'def', catName: '定义函数',
    point: 'def', stage: 4, level: 2,
    title: '判断题：函数定义后，不调用就不会执行里面的代码。',
    desc: 'def 只是「准备好」，还是要「用起来」？',
    answer: true,
    explain: '<b>正确。</b><code>def</code> 只是<b>定义</b>（登记这个函数），必须<b>调用</b>它，比如 <code>hello()</code>，里面的代码才会执行。' },

  { id: 'q4_def_f1', type: 'fill', cat: 'def', catName: '定义函数',
    point: 'def', stage: 4, level: 2,
    title: '填空：定义一个名为 greet 的函数',
    desc: '填关键字。',
    code: '____ greet():\n    print("你好")',
    answer: ['def'],
    explain: '<code>def greet():</code> —— def + 函数名 + 括号 + 冒号。' },

  // —— 参数 ——
  { id: 'q4_param_c1', type: 'choice', cat: 'param', catName: '函数参数',
    point: 'param', stage: 4, level: 2,
    title: 'def add(a, b) 里的 a、b 叫做什么？',
    desc: '括号里这些名字的学名。',
    options: ['参数（形参）', '返回值', '全局变量', '关键字'],
    answer: 0,
    explain: '函数定义时括号里的叫<b>参数（形参）</b>；调用时传进去的具体值叫<b>实参</b>。' },

  { id: 'q4_param_c2', type: 'choice', cat: 'param', catName: '函数参数',
    point: 'param', stage: 4, level: 2,
    title: 'def hi(name="小明") 这样写表示？',
    desc: '等号在这里的作用。',
    options: ['name 有默认值"小明"，调用时可省略', 'name 必须传值', '会报错', 'name 是全局变量'],
    answer: 0,
    explain: '这是<b>默认参数</b>：调用 <code>hi()</code> 时 name 自动是 "小明"，写 <code>hi("小红")</code> 就覆盖它。' },

  { id: 'q4_param_b1', type: 'bool', cat: 'param', catName: '函数参数',
    point: 'param', stage: 4, level: 2,
    title: '判断题：函数内部定义的变量，在函数外面也能直接使用。',
    desc: '这涉及「作用域」的概念。',
    answer: false,
    explain: '<b>错误。</b>函数内的变量是<b>局部变量</b>，只在函数内部有效，外面用会报 NameError。' },

  // —— return ——
  { id: 'q4_return_c1', type: 'choice', cat: 'return', catName: 'return 返回值',
    point: 'return', stage: 4, level: 2,
    title: '函数执行到 return 之后会怎样？',
    desc: 'return 还有一个重要的作用。',
    options: ['立即结束函数，并把值返回给调用者', '继续执行后面的代码', '重新开始执行函数', '没有任何作用'],
    answer: 0,
    explain: '<code>return</code> 会<b>立刻结束函数</b>并把结果交回去。所以 return 后面的代码不会执行。' },

  { id: 'q4_return_c2', type: 'choice', cat: 'return', catName: 'return 返回值',
    point: 'return', stage: 4, level: 2,
    title: 'print() 和 return 的区别是？',
    desc: '新手最容易混淆的一组概念。',
    options: ['print 只是显示给人看，return 是把结果交给代码继续用',
              '两者完全一样',
              'return 会显示到屏幕',
              'print 比 return 更快'],
    answer: 0,
    explain: '<b>print 是「显示」</b>（给人看），<b>return 是「交出结果」</b>（给代码用）。想拿计算结果继续算，必须用 return。' },

  { id: 'q4_return_b1', type: 'bool', cat: 'return', catName: 'return 返回值',
    point: 'return', stage: 4, level: 2,
    title: '判断题：函数没有写 return 时，调用它得到的是 None。',
    desc: 'Python 里「没有返回值」用什么表示？',
    answer: true,
    explain: '<b>正确。</b>没写 return（或只写 return）的函数，默认返回 <code>None</code>。' },

  /* ========== 阶段 5：进阶 ========== */
  // —— 类与对象 ——
  { id: 'q5_class_c1', type: 'choice', cat: 'class', catName: '类与对象',
    point: 'class', stage: 5, level: 3,
    title: '类中表示「自己」的参数通常叫什么？',
    desc: '写方法时第一个参数的名字。',
    options: ['self', 'this', 'me', 'obj'],
    answer: 0,
    explain: 'Python 约定用 <code>self</code> 表示对象自身（<code>this</code> 是其他语言的叫法）。名字其实可改，但强烈建议用 self。' },

  { id: 'q5_class_c2', type: 'choice', cat: 'class', catName: '类与对象',
    point: 'class', stage: 5, level: 3,
    title: '创建对象（实例）的正确写法是？',
    desc: '类定义好后怎么「造」一个出来。',
    options: ['Dog()', 'new Dog()', 'Dog.create()', 'class Dog()'],
    answer: 0,
    explain: '直接 <code>类名()</code> 即可，例如 <code>d = Dog()</code>。Python 不需要 <code>new</code> 关键字。' },

  { id: 'q5_class_b1', type: 'bool', cat: 'class', catName: '类与对象',
    point: 'class', stage: 5, level: 3,
    title: '判断题：类的 __init__ 方法会在创建对象时自动调用。',
    desc: '这个方法也叫构造方法。',
    answer: true,
    explain: '<b>正确。</b><code>__init__</code> 是<b>初始化方法</b>，写 <code>Dog()</code> 时会自动执行，常用来设置初始属性。' },

  // —— 文件读写 ——
  { id: 'q5_file_c1', type: 'choice', cat: 'file', catName: '文件读写',
    point: 'file', stage: 5, level: 3,
    title: '推荐的文件打开方式是？',
    desc: '哪种写法不用手动关文件？',
    options: ['with open("a.txt") as f:', 'open("a.txt")', 'file.open("a.txt")', 'read("a.txt")'],
    answer: 0,
    explain: '用 <code>with open(...) as f:</code> 会<b>自动关闭文件</b>，是最推荐、最安全的写法。' },

  { id: 'q5_file_b1', type: 'bool', cat: 'file', catName: '文件读写',
    point: 'file', stage: 5, level: 3,
    title: '判断题：以 "w" 模式打开已存在的文件，会清空原内容。',
    desc: '写入模式的一个「危险」特性。',
    answer: true,
    explain: '<b>正确。</b><code>"w"</code> 是覆盖写入，会<b>清空原文件</b>。想追加内容要用 <code>"a"</code> 模式。' },

  // —— 异常处理 ——
  { id: 'q5_exception_c1', type: 'choice', cat: 'exception', catName: '异常处理',
    point: 'exception', stage: 5, level: 3,
    title: '捕获异常用哪组关键字？',
    desc: '让程序出错时不崩溃的写法。',
    options: ['try / except', 'if / else', 'for / in', 'do / catch'],
    answer: 0,
    explain: '<code>try:</code> 放可能出错的代码，<code>except:</code> 放出错后的处理。' },

  { id: 'q5_exception_b1', type: 'bool', cat: 'exception', catName: '异常处理',
    point: 'exception', stage: 5, level: 3,
    title: '判断题：即使 try 里的代码出错，程序也不会崩溃，会继续执行 except 之后的代码。',
    desc: '这就是异常处理的意义。',
    answer: true,
    explain: '<b>正确。</b>异常被 <code>except</code> 捕获后，程序会继续正常往下执行，不会中断。' },

  // —— 模块导入 ——
  { id: 'q5_module_c1', type: 'choice', cat: 'module', catName: '模块导入',
    point: 'module', stage: 5, level: 3,
    title: '只想用 math 模块里的 sqrt 函数，可以这样写？',
    desc: '有几种导入方式，选最精确的一种。',
    options: ['from math import sqrt', 'import sqrt', 'include math', 'using math'],
    answer: 0,
    explain: '<code>from math import sqrt</code> 只导入需要的函数，用的时候直接写 <code>sqrt(4)</code>，不用加前缀。' },

  { id: 'q5_module_b1', type: 'bool', cat: 'module', catName: '模块导入',
    point: 'module', stage: 5, level: 3,
    title: '判断题：import random 之后，需要用 random.randint(1, 10) 这样带前缀地调用。',
    desc: '整体导入时的调用方式。',
    answer: true,
    explain: '<b>正确。</b>整体导入模块后，要用 <code>模块名.函数名()</code> 的形式调用。' }
];

/* ---------------- 把新增题目合并进主题库（不覆盖原有题目） ---------------- */
window.EXERCISES = (window.EXERCISES || []).concat(window.COURSE_QUIZ);

/* 原 31 道代码题归入「高级挑战」阶段（装饰器/生成器/算法等） */
window.EXERCISES.forEach((e) => {
  if (!e.stage) {
    const map = { basics: 2, data: 3, func: 4, oop: 5, adv: 6, algo: 6 };
    e.stage = map[e.cat] || 6;
    e.type = e.type || 'code';
    e.point = e.point || e.cat;
  }
});

/* 每个阶段包含哪些知识点（用于学习路线展示） */
window.stageOf = function (n) {
  return (window.STAGES || []).find((s) => s.id === n) || null;
};
