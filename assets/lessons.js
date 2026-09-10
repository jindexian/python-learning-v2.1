/* ============================================================
 * 课程学习系统（第三阶段增量）
 * - 每个「知识点」可对应一节完整课程；暂无课程的知识点保持原行为（直接进练习）
 * - 学习流程：知识讲解 → 简单示例 → 理解检查 → 练习 → 代码实践 → 完成知识点 → 推荐下一课
 * - quizIds / codeExerciseIds 引用现有题库（window.EXERCISES）的题目 id，
 *   不复制题目数据，避免与 courses.js / basic-code.js 重复
 * - 课程正文面向零基础学生：短句、多例子、少术语
 * ============================================================ */

window.LESSONS = [

  /* ================= 第 1 课：Python 是什么 ================= */
  {
    id: 'lesson_pyintro',
    stage: 1,
    topic: 'pyintro',
    topicName: 'Python 是什么',
    title: '第 1 课 · Python 是什么',
    summary: '学完这节课，你会知道：Python 是什么、它能做什么，以及怎么写下你的第一行代码。',

    content: [
      '欢迎来到编程世界！先回答一个最基本的问题：<b>Python 是什么？</b>',
      '简单说：Python 是一门<b>编程语言</b>——一种人类和计算机「说话」的方式。你写下指令，计算机就照着做。',
      '打个比方：计算机像一个<b>特别听话但特别较真</b>的助手。你说「帮我显示一行字」，它就一字不差地做；但你说得含糊，它就听不懂。学编程，就是学着把话说得准确。',
      'Python 能做什么？写小游戏、做网站、处理表格、做人工智能……它是世界上最流行的编程语言之一。',
      '为什么推荐初学者学它？因为 Python 的代码读起来接近英语，比如 <code>print("你好")</code> 就是「把你好显示出来」，几乎不用解释。',
      '这个网站里就有一个真正的 Python 运行环境，你写的代码都会被真的运行。<b>别怕写错</b>——写错、看懂提示、改对，这就是学编程的日常。'
    ],

    examples: [
      {
        code: 'print("Hello Python")',
        output: 'Hello Python',
        note: '这就是一个完整的 Python 程序：让计算机在屏幕上显示 Hello Python。'
      },
      {
        code: 'print("我今年 12 岁")\nprint("我喜欢编程")',
        output: '我今年 12 岁\n我喜欢编程',
        note: '程序从上到下，一行一行执行。'
      }
    ],

    keyPoints: [
      'Python 是一门编程语言，用来给计算机下指令',
      '程序从上到下，一行一行执行',
      '<code>print()</code> 可以把内容显示到屏幕上',
      '写错了没关系：看懂报错提示，改一下就好'
    ],

    tips: [
      { bad: 'print(你好)', good: 'print("你好")',
        why: '文字必须放在英文引号里，否则 Python 不认识它。' },
      { bad: 'print（“你好”）', good: 'print("你好")',
        why: '括号和引号都必须是<b>英文符号</b>，中文的（）“”会直接报错。' }
    ],

    quizIds: ['q1_pyintro_c1', 'q1_pyintro_b1'],
    codeExerciseIds: ['q1_pyintro_k1']
  },

  /* ================= 第 2 课：print() ================= */
  {
    id: 'lesson_print',
    stage: 1,
    topic: 'print',
    topicName: 'print 输出',
    title: '第 2 课 · print()：让 Python 说话',
    summary: '学完这节课，你会：用 print() 输出文字和数字，明白引号的作用，还能一次输出多行。',

    content: [
      '<code>print()</code> 的作用很简单：<b>把内容显示到屏幕上</b>。你可以把它理解成 Python 的「说话工具」。',
      '想让它说一句话，就把那句话用<b>英文引号</b>包起来，放进括号里：',
      '引号里的内容叫<b>字符串</b>，就是「一串文字」。记住一个关键区别：<b>加引号 = 原样显示；数字不加引号 = 先计算再显示</b>。',
      '每调用一次 <code>print()</code>，就输出一行，输出完自动换行。想输出两行？写两个 print 就行。',
      '括号里也可以放算式。Python 会先算出结果，再把结果显示出来。'
    ],

    examples: [
      {
        code: 'print("Hello Python")',
        output: 'Hello Python',
        note: '文字（字符串）要放在英文双引号或单引号里。'
      },
      {
        code: 'print(2 + 3)',
        output: '5',
        note: '数字不加引号：Python 先算出 5，再显示 5。'
      },
      {
        code: 'print("2 + 3")',
        output: '2 + 3',
        note: '加了引号，它就变成「一串文字」，原样显示，不会被计算。'
      },
      {
        code: 'print("第一行")\nprint("第二行")',
        output: '第一行\n第二行',
        note: '两个 print()，输出两行。'
      }
    ],

    keyPoints: [
      '<code>print()</code> = 把括号里的内容显示到屏幕上',
      '文字（字符串）必须放在<b>英文</b>引号里',
      '数字加引号原样显示；不加引号先计算再显示',
      '一个 print() 输出一行，输出完自动换行'
    ],

    tips: [
      { bad: 'Print("你好")', good: 'print("你好")',
        why: 'Python 区分大小写，函数名必须是小写的 <code>print</code>。' },
      { bad: 'print("你好）', good: 'print("你好")',
        why: '引号必须<b>成对</b>出现，少一边就会报错（提示往往是 SyntaxError）。' },
      { bad: 'print（"你好"）', good: 'print("你好")',
        why: '括号也要用英文的 ( )，中文括号（ ）Python 不认识。' }
    ],

    quizIds: ['q1_print_c1', 'q1_print_c2', 'q1_print_b1'],
    codeExerciseIds: ['q1_print_k1', 'q1_print_k2']
  },

  /* ================= 第 3 课：变量 ================= */
  {
    id: 'lesson_variable',
    stage: 1,
    topic: 'variable',
    topicName: '变量',
    title: '第 3 课 · 变量：给数据贴个标签',
    summary: '学完这节课，你会：创建变量、给变量放值、用 print 输出变量的值，理解变量就是「贴了标签的盒子」。',

    content: [
      '<b>变量，就是一个贴了标签的盒子</b>：标签是变量名，盒子里放的是值。',
      '写法：<code>name = "小明"</code>。读作：把「小明」放进名叫 name 的盒子里。',
      '注意：这里的 <code>=</code> 不是「相等」，而是<b>赋值</b>——「放进去」的意思。',
      '放进去之后，随时可以用名字把值取出来：<code>print(name)</code>。',
      '盒子里的东西可以换：先 <code>score = 10</code>，再 <code>score = 20</code>，盒子里就是 20 了。<b>新值会覆盖旧值</b>。',
      '盒子既能放文字，也能放数字：<code>age = 12</code>（数字不用引号）。',
      '为什么要用变量？把数据存起来、起个看得懂的名字，代码就好读、好改、可以反复使用。'
    ],

    examples: [
      {
        code: 'name = "小明"\nprint(name)',
        output: '小明',
        note: '把 "小明" 存进变量 name，再用 print 取出来显示。'
      },
      {
        code: 'age = 12\nprint(age)',
        output: '12',
        note: '数字不用引号。print 的括号里写 age（不加引号），显示的才是盒子里的值。'
      },
      {
        code: 'score = 10\nscore = 20\nprint(score)',
        output: '20',
        note: '第二次赋值覆盖了第一次，所以显示 20。'
      },
      {
        code: 'city = "北京"\nprint("我喜欢" + city)',
        output: '我喜欢北京',
        note: '字符串可以用 + 拼接起来一起输出。'
      }
    ],

    keyPoints: [
      '变量 = 贴了标签的盒子：<code>name = "小明"</code> 是放进去，<code>print(name)</code> 是取出来',
      '<code>=</code> 是赋值（放进去），不是「相等」',
      '输出变量时变量名<b>不要</b>加引号，加了引号输出的只是名字本身',
      '重新赋值会覆盖旧值；数字不用引号，文字要用引号'
    ],

    tips: [
      { bad: 'print("name")', good: 'print(name)',
        why: '想输出变量却给它加了引号，屏幕上只会出现 name 这四个字母。' },
      { bad: 'name = 小明', good: 'name = "小明"',
        why: '文字不加引号，Python 会把它当成一个变量名去找，找不到就报错。' },
      { bad: '12age = 12', good: 'age = 12',
        why: '变量名不能以数字开头，也不能有空格；建议用有意义的英文单词。' }
    ],

    quizIds: ['q1_variable_c1', 'q1_variable_c2', 'q1_variable_b1'],
    codeExerciseIds: ['q1_variable_k1', 'q1_variable_k2', 'q1_variable_k3']
  },

  /* ================= 第 4 课：注释 ================= */
  {
    id: 'lesson_comment',
    stage: 1,
    topic: 'comment',
    topicName: '注释',
    title: '第 4 课 · 注释：给代码写便条',
    summary: '学完这节课，你会给代码写「人看的说明」：Python 会自动跳过注释，只执行真正的代码。',

    content: [
      '代码一多，过两天连自己都可能看不懂「这行是干嘛的」。注释就是解决这个问题的：写给人看的说明文字，Python 看到会<b>直接跳过</b>。',
      'Python 里注释用 <code>#</code> 开头。<code>#</code> 后面到行尾的内容，计算机完全不理会——就像用荧光笔在书页边上写字，不影响书本身的内容。',
      '注释可以<b>单独占一行</b>，也可以<b>放在一行代码的后面</b>，两种都很常用。',
      '注释有两个大用处：① 给未来的自己（和别人）解释这行代码想干什么；② 临时让某行代码「失效」——在前面加个 <code>#</code>，这行就不执行了，想恢复时把 <code>#</code> 删掉即可。这招叫「注释掉」，调试代码时特别好用。',
      '注意：<code>#</code> 必须是<b>英文符号</b>。中文输入法打出来的＃号，Python 是不认识的。',
      '放心写注释：Python 执行时会直接跳过它们，<b>不会让程序变慢</b>。多写注释是好习惯。'
    ],

    examples: [
      {
        code: '# 这是我写的第一个注释\nprint("你好")',
        output: '你好',
        note: '第一行以 # 开头，Python 直接跳过，只有第二行真正执行了。'
      },
      {
        code: 'print("你好")  # 输出一句问候',
        output: '你好',
        note: '注释写在代码后面也行：# 右边的内容不影响这行代码。'
      },
      {
        code: '# print("这行被注释掉了")\nprint("这行会执行")',
        output: '这行会执行',
        note: '在代码前面加上 #，这行代码就暂时「不生效」了——这就是「注释掉」。'
      }
    ],

    keyPoints: [
      '注释用 <code>#</code> 开头，写给人看，Python 会跳过',
      '<code>#</code> 后面到行尾都是注释；单独一行或放代码后面都可以',
      '给代码行加上 <code>#</code> 可以让它暂时不执行',
      '注释不影响程序运行速度，多写是好习惯'
    ],

    tips: [
      { bad: '＃ 这是注释', good: '# 这是注释',
        why: '<code>#</code> 必须是英文符号。中文输入法的＃号 Python 不认识，会当成错误内容。' },
      { bad: 'print("你好")  // 这是注释', good: 'print("你好")  # 这是注释',
        why: '<code>//</code> 是 C、Java 等语言的注释符号；在 Python 里 <code>//</code> 是整除运算符，写在代码后面会报错。' }
    ],

    quizIds: ['q1_comment_c1', 'q1_comment_b1'],
    codeExerciseIds: []
  },

  /* ================= 第 5 课：数据类型（含字符串） ================= */
  {
    id: 'lesson_datatype',
    stage: 1,
    topic: 'datatype',
    topicName: '数据类型',
    title: '第 5 课 · 数据类型：数字和文字不是一回事',
    summary: '学完这节课，你会认识 Python 最常用的几种数据类型：字符串、整数、小数、真假值，还会明白为什么 18 和 "18" 不是一回事。',

    content: [
      '你已经在用变量存东西了，但有没有想过：存的东西其实分好几种「种类」？就像抽屉里分文具、衣服、玩具一样，Python 里的数据也分类型。这节课认识最常用的四种。',
      '先认识<b>字符串（str）</b>：一串文字，必须放在引号里。<code>"小明"</code>、<code>"Hello Python"</code>、<code>"123"</code> 都是字符串。引号用单引号或双引号都行，但前后要配对。为什么文字要加引号？因为不加引号，Python 会把它当成变量名去找，找不到就报错——引号是在告诉 Python：「这是文字本身，别多想」。',
      '再认识<b>整数（int）</b>和<b>小数（float）</b>：<code>18</code>、<code>-5</code>、<code>0</code> 是整数；<code>1.75</code>、<code>3.14</code> 是小数。它们不带引号，可以直接做数学运算。',
      '还有<b>布尔值（bool）</b>：只有 <code>True</code> 和 <code>False</code> 两个值（首字母要大写），表示「真」和「假」。下一阶段学 if 判断时天天用到它。',
      '最容易搞混的是：<code>18</code> 和 <code>"18"</code>。18 是数字，能加减乘除；"18" 是字符串，只是长得像数字的文字。想知道一个数据是什么类型，可以用 <code>type()</code> 看一眼（简单了解即可）。',
      '字符串之间可以用 <code>+</code> 拼接：<code>"Hello " + "Python"</code> 会拼成 Hello Python。但字符串和数字不能直接用 <code>+</code>——文字和数字「相加」是什么意思？Python 也想不通，所以它会报错。'
    ],

    examples: [
      {
        code: 'name = "小明"\nprint(name)',
        output: '小明',
        note: 'name 里存的是字符串。print 一个变量时不用加引号。'
      },
      {
        code: 'print("Hello " + "Python")',
        output: 'Hello Python',
        note: '字符串 + 字符串 = 拼在一起。注意 "Hello " 末尾有个空格，所以两个词中间隔开了。'
      },
      {
        code: 'age = 18\nheight = 1.75\nis_student = True\nprint(age)\nprint(height)\nprint(is_student)',
        output: '18\n1.75\nTrue',
        note: '整数、小数、布尔值都不用引号；True 首字母大写。'
      },
      {
        code: 'print(18 + 2)\nprint("18" + "2")',
        output: '20\n182',
        note: '关键区别！数字相加是算数（20），字符串相加是拼接（182）。'
      }
    ],

    keyPoints: [
      '字符串（str）是文字，必须放在引号里，单引号双引号都行',
      '整数 int 没有小数点，小数 float 带小数点，都能直接做数学运算',
      '布尔值 bool 只有 True 和 False，首字母要大写',
      '18 是数字，"18" 是字符串——它们不是一回事',
      '字符串 + 字符串是拼接；字符串 + 数字会报错',
      '用 <code>type(数据)</code> 可以查看类型'
    ],

    tips: [
      { bad: 'name = 小明', good: 'name = "小明"',
        why: '文字不加引号，Python 会把它当成变量名去找，找不到就报 NameError。' },
      { bad: 'print("18" + 2)', good: 'print("18" + "2")  # 拼接 → 182\nprint(int("18") + 2)  # 转数字 → 20',
        why: '字符串和数字不能直接相加，会报 TypeError。想拼接就都用字符串，想算数就都用数字——<code>int()</code> 能把文字转成数字。' },
      { bad: 'age = "十八"', good: 'age = 18',
        why: '存数字做运算时不要加引号，加了引号就变成字符串，没法正常算数。' }
    ],

    quizIds: ['q1_datatype_c1', 'q1_datatype_c2', 'q1_datatype_b1'],
    codeExerciseIds: ['q1_datatype_k1', 'q1_datatype_k2', 'q2_datatype_k1']
  },

  /* ================= 第 6 课：input() ================= */
  {
    id: 'lesson_input',
    stage: 2,
    topic: 'input',
    topicName: 'input 输入',
    title: '第 6 课 · input()：让程序听你说话',
    summary: '学完这节课，你会用 input() 让程序停下来等用户打字，把输入存进变量，还会明白为什么输入的数字其实是「字符串」。',

    content: [
      '到现在为止，程序输出什么都是你提前写好的。想让程序「活」起来，就得让它能接收使用者现场输入的内容——这就是 <code>input()</code> 的作用。',
      '程序运行到 <code>input()</code> 时会<b>停下来等你</b>：屏幕上显示一句提示，光标一闪一闪，等你打字并按回车。你输入的内容，就是 input() 的结果。',
      '<code>input()</code> 括号里的文字是<b>提示语</b>，比如 <code>input("请输入你的名字：")</code>。它只是显示出来给用户看的，不会改变输入的内容。',
      '输入的内容通常要<b>存进变量</b>：<code>name = input("请输入你的名字：")</code>。之后就可以像用普通变量一样使用 name。',
      '有个大坑要记住：<b>input() 得到的永远是字符串</b>。哪怕你输入的是 12，程序拿到的也是 "12"——是「长得像数字的文字」。所以想拿它做算术，要先用 <code>int()</code> 把它变成数字：<code>age = int(input("请输入年龄："))</code>。',
      '记住这套组合拳：<code>input()</code> 负责「收」，<code>int()</code> 负责「把文字变数字」，<code>print()</code> 负责「说」。'
    ],

    examples: [
      {
        code: 'name = input("请输入你的名字：")\nprint(name)',
        output: '请输入你的名字：小明\n小明',
        note: '第一行是提示语，「小明」是你输入并按回车的内容；第二行的「小明」是 print 显示出来的。'
      },
      {
        code: 'age = input("请输入你的年龄：")\nprint(age)',
        output: '请输入你的年龄：12\n12',
        note: '屏幕上出现了 12，看起来像数字——但它其实是字符串 "12"。'
      },
      {
        code: 'age = int(input("请输入你的年龄："))\nprint(age + 1)',
        output: '请输入你的年龄：12\n13',
        note: '你输入 12，先用 int() 把 "12" 变成数字 12，print(age + 1) 就显示 13。如果不加 int()，"12" + 1 会直接报错。'
      }
    ],

    keyPoints: [
      '<code>input()</code> 让程序暂停，等用户输入并按回车',
      '括号里的文字是提示语，只是显示给用户看',
      '输入的内容一般用 <code>=</code> 存进变量',
      'input() 得到的永远是字符串："12" 不是 12',
      '要做数学运算，先用 <code>int()</code> 把字符串转成数字'
    ],

    tips: [
      { bad: 'age = input("请输入年龄：")\nprint(age + 1)', good: 'age = int(input("请输入年龄："))\nprint(age + 1)',
        why: 'input() 得到的是字符串，字符串不能和数字相加，会报 TypeError。先用 int() 转换再算。' },
      { bad: 'name = input(请输入名字：)', good: 'name = input("请输入名字：")',
        why: '提示语是字符串，必须加引号；不加引号 Python 会把它当成变量名，报 NameError。' }
    ],

    quizIds: ['q2_input_c1', 'q2_input_c2', 'q2_input_b1'],
    codeExerciseIds: ['q2_input_k1', 'q2_input_k2']
  },

  /* ================= 第 7 课：基本运算 ================= */
  {
    id: 'lesson_operator',
    stage: 2,
    topic: 'operator',
    topicName: '运算符',
    title: '第 7 课 · 基本运算：让 Python 帮你算数',
    summary: '学完这节课，你会用 Python 做加、减、乘、除，还会认识两个新朋友：整除 // 和取余 %。',

    content: [
      'Python 本身就是一个超级计算器。加 <code>+</code>、减 <code>-</code>、乘 <code>*</code>、除 <code>/</code>，直接写算式就能算，结果用 print 显示出来。',
      '注意两个和数学课不一样的写法：乘号是 <code>*</code>（不是 ×），除号是 <code>/</code>（不是 ÷）——键盘上找不到 × 和 ÷，Python 就用这两个代替。',
      '除法有个小意外：<code>10 / 2</code> 的结果是 <b>5.0</b> 而不是 5。只要用了 /，Python 就给出带小数点的结果——这是它的习惯，记住了就不会慌。',
      '新朋友一：<b>整除 <code>//</code></b>。<code>10 // 3</code> 的结果是 3——只保留商，不要余数。比如 10 个苹果分给 3 个人，每人分 3 个。',
      '新朋友二：<b>取余 <code>%</code></b>。<code>10 % 3</code> 的结果是 1——10 除以 3 商 3 余 1，% 给你的就是那个<b>余数</b>。分苹果剩下的拿不走，就是 1 个。',
      '取余特别好用：判断一个数是奇数还是偶数，只要看它 <code>% 2</code> 的结果是 1 还是 0。另外还有乘方 <code>**</code>：<code>2 ** 3</code> 就是 2×2×2 = 8，先混个脸熟。'
    ],

    examples: [
      {
        code: 'print(2 + 3)\nprint(10 - 3)\nprint(4 * 5)',
        output: '5\n7\n20',
        note: '加、减、乘和数学课一样，只是乘号要写成 *。'
      },
      {
        code: 'print(10 / 2)\nprint(7 / 2)',
        output: '5.0\n3.5',
        note: '除法的结果总带小数点：10 / 2 是 5.0，除不尽就是 3.5。'
      },
      {
        code: 'print(10 // 3)\nprint(10 % 3)',
        output: '3\n1',
        note: '10 ÷ 3 = 商 3 余 1。// 只取商 3，% 只取余数 1。'
      },
      {
        code: 'print(2 ** 3)\nprint(8 % 2)',
        output: '8\n0',
        note: '2 ** 3 是 2 的 3 次方；8 % 2 是 0，说明 8 能被 2 整除——8 是偶数。'
      }
    ],

    keyPoints: [
      '乘号写 <code>*</code>，除号写 <code>/</code>',
      '用 <code>/</code> 做除法，结果总带小数点（10 / 2 是 5.0）',
      '<code>//</code> 整除：只要商，不要余数',
      '<code>%</code> 取余：只要除法剩下的余数',
      '<code>a % 2</code> 是 0 就是偶数，是 1 就是奇数',
      '<code>**</code> 是乘方：2 ** 3 = 8'
    ],

    tips: [
      { bad: 'print(10 ÷ 2)\nprint(4 × 5)', good: 'print(10 / 2)\nprint(4 * 5)',
        why: 'Python 只认键盘上有的符号：/ 和 *。× 和 ÷ 会直接报语法错误。' },
      { bad: 'print("10" + 5)', good: 'print(10 + 5)',
        why: '带引号的 "10" 是字符串不是数字。文字和数字不能相加，要先转换或去掉引号。' }
    ],

    quizIds: ['q2_operator_c1', 'q2_operator_c2', 'q2_operator_b1'],
    codeExerciseIds: ['q2_operator_k1', 'q2_operator_k2']
  },

  /* ================= 第 8 课：if 判断 ================= */
  {
    id: 'lesson_if',
    stage: 2,
    topic: 'if',
    topicName: 'if 判断',
    title: '第 8 课 · if 判断：让程序学会做选择',
    summary: '学完这节课，你会用 if / else 让程序根据条件做不同的事，还会掌握 Python 新手最容易出错的两件小事：冒号和缩进。',

    content: [
      '生活中你每天都在做判断：如果下雨就带伞，否则不带。程序的 <code>if</code> 就是干这个的：条件成立做这件事，不成立就做另一件事（或者什么都不做）。',
      '基本样子是 <code>if 条件:</code> ——<b>冒号非常重要</b>！它表示「条件说完了，下面开始是要做的事」。条件成立时才执行的那些代码，必须<b>缩进</b>：在行首空 4 个空格。',
      '缩进就是 Python 的「分段方式」：同一层级的代码必须对齐。别的语言用大括号 { } 圈住代码，Python 直接看缩进。缩进错了或忘了，程序立刻报错。',
      '想加一个「否则」？用 <code>else:</code>——它后面同样要冒号，下面的代码同样要缩进。if 和 else 只会走其中一个：条件成立走 if，不成立走 else。',
      '条件怎么写？大于 <code>&gt;</code>、小于 <code>&lt;</code>、大于等于 <code>&gt;=</code>、小于等于 <code>&lt;=</code>、等于 <code>==</code>（要写两个等号！）。单个 = 是「把值存进变量」，两个 == 才是「判断是否相等」——这是新手第一大坑。',
      '学好 if 和 else 这一课就够了。练习题里还会见到 <code>elif</code>（「否则如果」，用来连着判断多种情况），能看懂它的意思就行。'
    ],

    examples: [
      {
        code: 'age = 18\nif age >= 18:\n    print("可以进入")\nelse:\n    print("不能进入")',
        output: '可以进入',
        note: 'age 是 18，满足 >= 18，走 if 那一支；else 的部分被跳过。'
      },
      {
        code: 'num = 5\nif num > 0:\n    print("这是正数")\nprint("程序结束")',
        output: '这是正数\n程序结束',
        note: '缩进的 print 只在条件成立时执行；没缩进的 print 不受 if 管辖，永远执行。'
      },
      {
        code: 'score = 59\nif score >= 60:\n    print("及格啦")\nelse:\n    print("下次加油")',
        output: '下次加油',
        note: '59 不满足 >= 60，if 里的代码被跳过，走 else。'
      }
    ],

    keyPoints: [
      '<code>if 条件:</code> 后面的英文冒号不能少',
      '条件成立时执行的代码要缩进（4 个空格）',
      '<code>else:</code> 处理「条件不成立」的情况，同样要冒号和缩进',
      'if 和 else 只会走其中一个分支',
      '判断相等用 <code>==</code>（两个等号）；一个 = 是赋值',
      '大于等于写 <code>&gt;=</code>，不要写成 =&gt;'
    ],

    tips: [
      { bad: 'if age >= 18\n    print("成年")', good: 'if age >= 18:\n    print("成年")',
        why: 'if 条件后面必须有英文冒号 :，少了它会报 SyntaxError。' },
      { bad: 'if age >= 18:\nprint("成年")', good: 'if age >= 18:\n    print("成年")',
        why: 'if 下面的代码必须缩进，顶格写会报 IndentationError。' },
      { bad: 'if age = 18:\n    print("成年")', good: 'if age == 18:\n    print("成年")',
        why: '一个 = 是「存值」，两个 == 才是「比较」。判断相等要写 ==。' }
    ],

    quizIds: ['q2_if_c1', 'q2_if_b1', 'q2_if_b2'],
    codeExerciseIds: ['q2_if_k1', 'q2_if_k2']
  },

  /* ================= 第 9 课：while 循环 ================= */
  {
    id: 'lesson_while',
    stage: 2,
    topic: 'while',
    topicName: 'while 循环',
    title: '第 9 课 · while 循环：条件满足就继续',
    summary: '学完这节课，你会用 while 让计算机反复干活：只要条件成立就一直做，还会躲开它最大的陷阱——死循环。',

    content: [
      '想让计算机把一句话说 100 遍，总不能复制粘贴 100 行吧？循环就是解决「重复」的。<code>while</code> 的意思是「只要……就继续」：只要条件成立，就一遍遍执行下面的代码。',
      '标准套路分三步：<b>第一步</b>，循环前给一个计数变量，比如 <code>i = 1</code>；<b>第二步</b>，<code>while i <= 3:</code> 判断要不要继续；<b>第三步</b>，在循环体里干完活后<b>改变 i</b>（比如 <code>i += 1</code>）。三步缺一不可。',
      '<code>i += 1</code> 是 <code>i = i + 1</code> 的简写，两者完全一样。读一遍：「把 i 现在的值加 1，再存回 i 里」——计数器就这样往前走一步。',
      '跟着代码走一遍：i 是 1，输出 1，变成 2；输出 2，变成 3；输出 3，变成 4——4 &lt;= 3 不成立，循环结束。所以一共输出 3 行。',
      '最大的陷阱：<b>死循环</b>。如果忘了在循环体里改变 i，条件永远成立，程序就永远停不下来。写 while 时先问自己一句：「我的循环变量，在循环体里变了吗？」',
      '万一真写出了死循环也不用怕：在这个网站里，运行超时的代码会被自动中断并给出提示。不过先学会躲开它，比学会逃出来更重要。'
    ],

    examples: [
      {
        code: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
        output: '1\n2\n3',
        note: 'i 从 1 长到 4，4 <= 3 不成立，循环结束，一共输出 3 行。'
      },
      {
        code: 'count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("发射！")',
        output: '3\n2\n1\n发射！',
        note: '倒着数也行！count 从 3 减到 0，0 > 0 不成立才结束。最后的「发射！」没有缩进，不属于循环，只在结束后执行一次。'
      }
    ],

    keyPoints: [
      '<code>while 条件:</code> 条件成立就一直重复执行下面的缩进代码',
      '套路三步：先设初始值 → while 判断 → 循环体里改变变量',
      '<code>i += 1</code> 等于 <code>i = i + 1</code>，都是让计数器加 1',
      '忘了改变循环变量 = 死循环，程序永远停不下来',
      'while 和 if 一样，条件后面必须有冒号，下面必须缩进'
    ],

    tips: [
      { bad: 'i = 1\nwhile i <= 3:\n    print(i)', good: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
        why: '循环体里没改变 i，条件永远成立——典型的死循环，程序会一直打印 1 停不下来。' },
      { bad: 'while i <= 3\n    print(i)', good: 'while i <= 3:\n    print(i)',
        why: 'while 和 if 一样，条件后面必须有英文冒号，下面的代码必须缩进。' }
    ],

    quizIds: ['q2_while_c1', 'q2_while_b1'],
    codeExerciseIds: ['q2_while_k1']
  },

  /* ================= 第 10 课：for 循环 ================= */
  {
    id: 'lesson_for',
    stage: 2,
    topic: 'for',
    topicName: 'for 循环',
    title: '第 10 课 · for 循环：按次数重复',
    summary: '学完这节课，你会用 for + range() 让程序按次数重复，弄明白 range(3) 为什么输出 0、1、2，还会看到 for 比 while 省事的地方。',

    content: [
      '上一课 while 要三步走：设初值、判条件、改变量。但如果只是想「固定重复 3 次」，有个更省事的写法——<code>for</code> 循环。',
      '<code>for i in range(3):</code> 一句话把三步全包了：i 会自动从 0 数到 2，每数一个数，就执行一遍循环体。这里的 i 叫<b>循环变量</b>，<code>range(3)</code> 负责「生成 0、1、2 这三个数」。',
      '为什么是 0、1、2 而不是 1、2、3？因为 <b>range 从 0 开始数</b>，range(3) 的意思是「总共 3 个数」：0、1、2。从 0 开始计数是程序员世界的通用习惯，慢慢就适应了。',
      '想从 1 开始数怎么办？用 <code>range(1, 4)</code>：从 1 开始，到 4 之前结束——也就是 1、2、3。记住口诀：<b>包头不包尾</b>，逗号后面那个数永远取不到。想数到 3，就得写 4。',
      'range 还能加第三个数表示<b>步长</b>：<code>range(2, 11, 2)</code> 是 2、4、6、8、10——从 2 开始，每次加 2。练习题里会见到它，先会认就行。',
      '什么时候用哪个？知道要重复几次，用 for 更简洁；只知道「满足条件就继续」，用 while。两种循环都能解决问题，选顺手的就好。'
    ],

    examples: [
      {
        code: 'for i in range(3):\n    print(i)',
        output: '0\n1\n2',
        note: 'range(3) 生成 0、1、2 三个数，i 依次取它们。想输出 1、2、3，看下一个例子。'
      },
      {
        code: 'for i in range(1, 4):\n    print(i)',
        output: '1\n2\n3',
        note: 'range(1, 4) 从 1 开始、到 4 之前结束——包头不包尾，所以是 1、2、3。'
      },
      {
        code: 'for i in range(3):\n    print("Hello Python")',
        output: 'Hello Python\nHello Python\nHello Python',
        note: '循环体里不用 i 也没关系——这种情况就是单纯地「重复 3 次」。'
      }
    ],

    keyPoints: [
      '<code>for i in range(3):</code> 会自动重复 3 次，不用自己改变量',
      '<code>range(3)</code> 生成 0、1、2——从 0 开始，总共 3 个',
      '<code>range(1, 4)</code> 生成 1、2、3——包头不包尾',
      '<code>range(2, 11, 2)</code> 生成 2、4、6、8、10——第三个数是步长',
      'for 和 while 一样：冒号不能少，下面要缩进'
    ],

    tips: [
      { bad: 'for i in range(3):\nprint(i)', good: 'for i in range(3):\n    print(i)',
        why: 'for 下面的代码必须缩进，顶格写会报 IndentationError。' },
      { bad: 'for i in range(1, 3):\n    print(i)  # 想输出 1、2、3', good: 'for i in range(1, 4):\n    print(i)',
        why: 'range 包头不包尾：range(1, 3) 只有 1、2。想数到 3，结尾要写 4。' }
    ],

    quizIds: ['q2_for_c1', 'q2_for_c2', 'q2_for_b1'],
    codeExerciseIds: ['q2_for_k1', 'q2_for_k2']
  },

  /* ================= 第 11 课：列表 list ================= */
  {
    id: 'lesson_list',
    stage: 3,
    topic: 'list',
    topicName: '列表 list',
    title: '第 11 课 · 列表：一个装很多东西的盒子',
    summary: '学完这节课，你会用列表把一堆数据装在一起：创建、按下标读取、修改、添加、删除，还会用 len() 数个数。',

    content: [
      '一个变量只能存一个值。要存全班 40 个名字，写 40 个变量？太傻了。列表（list）就是解决这个问题的：<b>一个可以装很多东西的盒子</b>，东西按顺序排好。',
      '创建列表用<b>方括号 []</b>，元素之间用英文逗号隔开：<code>numbers = [1, 2, 3]</code>、<code>names = ["小明", "小红"]</code>。列表里可以放数字、字符串，甚至别的列表（以后会讲）。',
      '怎么拿出盒子里第几个东西？用<b>下标</b>：<code>names[0]</code> 是第一个，<code>names[1]</code> 是第二个——<b>下标从 0 开始数</b>！这是所有程序员都踩过的坑，现在记住，以后就不慌。',
      'Python 还支持<b>倒着数</b>：<code>names[-1]</code> 是最后一个，<code>names[-2]</code> 是倒数第二个。',
      '列表是<b>可变</b>的：可以改 <code>names[0] = "小刚"</code>；可以加 <code>names.append("小美")</code>（加到末尾）；也可以删 <code>del names[1]</code>（按下标删）或 <code>names.remove("小红")</code>（按值删）。用 <code>len(names)</code> 数里面有几个元素。',
      'for 循环和列表是好朋友：<code>for name in names:</code> 会依次取出每个元素——你在第 10 课学的「可迭代」，就是为这一刻准备的。'
    ],

    examples: [
      {
        code: 'numbers = [1, 2, 3]\nnames = ["小明", "小红"]\nprint(numbers)\nprint(names)',
        output: "[1, 2, 3]\n['小明', '小红']",
        note: 'print 列表会原样显示整个盒子，注意字符串会带引号显示。'
      },
      {
        code: 'names = ["小明", "小红", "小刚"]\nprint(names[0])\nprint(names[2])\nprint(names[-1])',
        output: '小明\n小刚\n小刚',
        note: '下标从 0 开始：names[0] 是第一个、names[2] 是第三个；names[-1] 是最后一个。'
      },
      {
        code: 'names = ["小明", "小红"]\nnames[0] = "小刚"\nnames.append("小美")\nprint(names)\nprint(len(names))',
        output: "['小刚', '小红', '小美']\n3",
        note: '改第 1 个元素、往末尾追加一个之后，盒子里有 3 个元素了。'
      },
      {
        code: 'numbers = [10, 20, 30, 40]\ndel numbers[1]\nprint(numbers)',
        output: '[10, 30, 40]',
        note: 'del 按下标删除：删掉 20 后，后面的元素往前补位。'
      }
    ],

    keyPoints: [
      '列表用方括号 <code>[]</code> 创建，元素用逗号隔开，按顺序存放',
      '下标从 0 开始：a[0] 是第一个元素',
      '<code>a[-1]</code> 是最后一个元素，负数表示倒数',
      '<code>append()</code> 往末尾添加；<code>del a[下标]</code> 或 <code>remove(值)</code> 删除',
      '<code>len(列表)</code> 数元素个数',
      '<code>for x in 列表:</code> 依次取出每个元素'
    ],

    tips: [
      { bad: 'names = ["小明", "小红"]\nprint(names[2])', good: 'names = ["小明", "小红"]\nprint(names[1])',
        why: '两个元素的下标只有 0 和 1，取 names[2] 会报 IndexError（下标越界）。' },
      { bad: 'a = [1, 2, 3]\na.add(4)', good: 'a = [1, 2, 3]\na.append(4)',
        why: '列表没有 add() 方法（那是集合的），列表追加用 append()。' },
      { bad: 'names = ["小明"， "小红"]', good: 'names = ["小明", "小红"]',
        why: '逗号必须是英文的，中文逗号会让 Python 把前后内容看成一项，直接报错。' }
    ],

    quizIds: ['q3_list_c1', 'q3_list_c2', 'q3_list_b1'],
    codeExerciseIds: ['q3_list_k1', 'q3_list_k2']
  },

  /* ================= 第 12 课：元组 tuple ================= */
  {
    id: 'lesson_tuple',
    stage: 3,
    topic: 'tuple',
    topicName: '元组 tuple',
    title: '第 12 课 · 元组：创建后就不能改的盒子',
    summary: '学完这节课，你会创建元组，并明白它和列表最大的区别：元组创建后不能修改，适合放「不该被改动」的数据。',

    content: [
      '列表是个可以随时打开改的盒子。但有些数据不希望被改：比如一年的 12 个月、星期一到星期日。Python 为此准备了另一种盒子——<b>元组（tuple）</b>，它创建之后就「焊死」了。',
      '创建元组用<b>圆括号 ()</b>：<code>numbers = (1, 2, 3)</code>。和列表只差一个括号：方括号 [] 是列表，圆括号 () 是元组，花括号 {} 是集合或字典——三种括号别记混。',
      '读取方式和列表<b>完全一样</b>：下标、负下标、len()、for 循环遍历，全都照用。',
      '最大的区别：<b>元组不能改</b>。<code>numbers[0] = 99</code> 会立刻报 TypeError，append、del 这些修改操作也统统没有。程序在这里「及时报错」其实是好事——防止你误改重要数据。',
      '什么时候用哪个？<b>会变的用列表，不该变的用元组</b>。比如坐标 (3, 5)、一年的四季，用元组就特别合适。'
    ],

    examples: [
      {
        code: 'months = ("一月", "二月", "三月")\nprint(months[0])\nprint(months[-1])\nprint(len(months))',
        output: '一月\n三月\n3',
        note: '读取和列表一模一样：下标、负下标、len() 都能用。'
      },
      {
        code: 'point = (3, 5)\nx, y = point\nprint(x)\nprint(y)',
        output: '3\n5',
        note: '小技巧：可以一次把元组里的值赋给多个变量（叫「解包」），坐标这类「成对」的数据特别适合。'
      }
    ],

    keyPoints: [
      '元组用圆括号 <code>()</code> 创建：numbers = (1, 2, 3)',
      '读取方式和列表相同：下标、len()、for 遍历都行',
      '元组<b>不可变</b>：不能改、不能加、不能删',
      '试图修改会报 TypeError——这是保护，不是麻烦',
      '该变的用列表，不该变的用元组'
    ],

    tips: [
      { bad: 'numbers = (1, 2, 3)\nnumbers[0] = 99', good: 'numbers = [1, 2, 3]\nnumbers[0] = 99',
        why: '元组不可变，想修改元素就改用列表。' },
      { bad: 'numbers = (1, 2, 3)\nnumbers.append(4)', good: 'numbers = [1, 2, 3]\nnumbers.append(4)',
        why: '元组没有 append 方法，报 AttributeError。需要增删元素，说明该用列表。' }
    ],

    quizIds: ['q3_tuple_c1', 'q3_tuple_b1'],
    codeExerciseIds: ['q3_tuple_k1', 'q3_tuple_k2']
  },

  /* ================= 第 13 课：字典 dict ================= */
  {
    id: 'lesson_dict',
    stage: 3,
    topic: 'dict',
    topicName: '字典 dict',
    title: '第 13 课 · 字典：通过名字找东西',
    summary: '学完这节课，你会用字典「通过名字找东西」：用键存值、取值、改值、添加和删除键值对，还会用 get() 安全取值。',

    content: [
      '列表靠下标找东西——第 0 个、第 1 个。但下标是数字，不好记。想存一个学生的信息，用 0 代表名字、1 代表年龄？过两天自己都忘了。字典（dict）是另一种找东西的方式：<b>通过名字找</b>。',
      '字典用<b>花括号 {}</b> 创建，每一项都是「键: 值」的组合。<code>student = {"name": "小明", "age": 18}</code> 里，"name" 和 "age" 叫<b>键（key）</b>，"小明" 和 18 叫<b>值（value）</b>。',
      '取值用中括号加键名：<code>student["name"]</code> 得到 "小明"。注意中括号里放的是<b>键</b>，不是值——你不能拿 "小明" 去反查 "name"。',
      '修改和添加是<b>同一个写法</b>：<code>student["age"] = 19</code>（键已存在就是修改），<code>student["city"] = "北京"</code>（键不存在就是添加）。删除用 <code>del student["city"]</code>。',
      '拿不准键在不在？用 <code>get()</code>：<code>student.get("phone")</code> 不存在时返回 None 而不报错，还能给默认值 <code>student.get("phone", "没填")</code>。',
      '键必须<b>唯一</b>——写两个相同的键，后面的会覆盖前面的。for 循环可以遍历字典的键。'
    ],

    examples: [
      {
        code: 'student = {"name": "小明", "age": 18}\nprint(student["name"])\nprint(student["age"])',
        output: '小明\n18',
        note: '用键取值。键是左边的名字，值是右边的内容。'
      },
      {
        code: 'student = {"name": "小明", "age": 18}\nstudent["age"] = 19\nstudent["city"] = "北京"\nprint(student)',
        output: "{'name': '小明', 'age': 19, 'city': '北京'}",
        note: '键已存在就是修改，不存在就是新增——同一个写法，Python 自动判断。'
      },
      {
        code: 'student = {"name": "小明"}\nprint(student.get("phone"))\nprint(student.get("phone", "没填"))',
        output: 'None\n没填',
        note: 'get() 找不到键不报错，返回 None；第二个参数是找不到时给的默认值。'
      }
    ],

    keyPoints: [
      '字典用花括号 <code>{}</code>，每项是「键: 值」，用逗号隔开',
      '取值用 <code>d["键名"]</code>——通过名字找东西',
      '<code>d["键"] = 值</code>：键存在是修改，不存在是添加',
      '<code>del d["键"]</code> 删除一对键值',
      '<code>get()</code> 找不到不报错，可给默认值',
      '键必须唯一，重复会覆盖'
    ],

    tips: [
      { bad: 'print(student[name])', good: 'print(student["name"])',
        why: '键是字符串要加引号；不加引号 Python 会把 name 当变量名，报 NameError。' },
      { bad: 'print(student["小明"])', good: 'print(student["name"])',
        why: '中括号里放的是键（名字），不是值。"小明" 是值，用它找不到东西。' },
      { bad: 'student = {"name": "小明", "name": "小红"}', good: 'student = {"name": "小明", "friend": "小红"}',
        why: '键重复时后面的覆盖前面的，"小红" 会把 "小明" 顶掉。' }
    ],

    quizIds: ['q3_dict_c1', 'q3_dict_b1'],
    codeExerciseIds: ['q3_dict_k1', 'q3_dict_k2']
  },

  /* ================= 第 14 课：集合 set ================= */
  {
    id: 'lesson_set',
    stage: 3,
    topic: 'set',
    topicName: '集合 set',
    title: '第 14 课 · 集合：只保存不重复的数据',
    summary: '学完这节课，你会用集合保存「不重复」的数据：自动去重、添加、删除，还会用它给列表去掉重复项。',

    content: [
      '想记录今天哪些同学来过教室，名字可能记重了。有没有一种盒子能自动「只留一份」？有——<b>集合（set）</b>，它的核心本领就是：保存不重复的数据。',
      '集合用<b>花括号</b>创建：<code>numbers = {1, 2, 3}</code>。看起来和字典一样是花括号，但里面只有值、没有「键: 值」配对。',
      '最重要的特性：<b>自动去重</b>。写 <code>{1, 2, 2, 3}</code>，Python 会自动去掉重复的 2，只剩 {1, 2, 3}。所以想去掉列表里的重复项，<code>set(列表)</code> 一下就行。',
      '集合是<b>无序</b>的：没有下标，<code>s[0]</code> 会报错——因为「第 0 个」这个概念在无序的盒子里不存在。想逐个访问就用 for 遍历。',
      '添加用 <code>s.add(4)</code>；删除用 <code>s.remove(3)</code>（不存在会报错）或 <code>s.discard(3)</code>（不存在也不吭声）。判断在不在用 <code>in</code>：<code>2 in numbers</code>。'
    ],

    examples: [
      {
        code: 'numbers = {1, 2, 2, 3, 3, 3}\nprint(numbers)',
        output: '{1, 2, 3}',
        note: '重复的元素自动被去掉，每个值只保留一份。'
      },
      {
        code: 'nums = [1, 2, 2, 3, 1]\nunique = set(nums)\nprint(unique)\nprint(len(unique))',
        output: '{1, 2, 3}\n3',
        note: 'set(列表) 是去重的常用招数：5 个元素去重后剩 3 个。'
      },
      {
        code: 'nums = {1, 2, 3}\nnums.add(4)\nnums.discard(2)\nprint(nums)\nprint(4 in nums)',
        output: '{1, 3, 4}\nTrue',
        note: 'add() 添加、discard() 删除；in 判断元素在不在集合里。'
      }
    ],

    keyPoints: [
      '集合用花括号 <code>{}</code> 创建，元素不重复',
      '自动去重：{1, 2, 2, 3} 就是 {1, 2, 3}',
      '<code>set(列表)</code> 可以给列表去重',
      '集合无序，不能用下标访问',
      '<code>add()</code> 添加、<code>remove()/discard()</code> 删除、<code>in</code> 判断'
    ],

    tips: [
      { bad: 's = {1, 2, 3}\nprint(s[0])', good: 's = {1, 2, 3}\nfor x in s:\n    print(x)',
        why: '集合无序，没有下标，s[0] 报 TypeError。想逐个访问就用 for 遍历。' },
      { bad: 's = {}\nprint(type(s))', good: 's = set()\nprint(type(s))',
        why: '空的花括号 {} 是空字典不是空集合！创建空集合要写 set()。' }
    ],

    quizIds: ['q3_set_c1', 'q3_set_b1'],
    codeExerciseIds: ['q3_set_k1', 'q3_set_k2']
  },

  /* ================= 第 15 课：定义函数 def ================= */
  {
    id: 'lesson_def',
    stage: 4,
    topic: 'def',
    topicName: '定义函数',
    title: '第 15 课 · 定义函数：把代码打包成小机器',
    summary: '学完这节课，你会用 def 定义自己的函数：把一段代码打包取名，随时调用，让代码不再重复。',

    content: [
      '同一句「打印欢迎语」的代码要在 5 个地方用，复制粘贴 5 遍？以后改一个字就得改 5 处。函数（function）就是解决这个问题的：把一段代码<b>打包取名</b>，想用的时候叫一声它的名字。',
      '函数就像一台<b>小机器</b>：你把东西放进去，它帮你处理，然后把结果拿出来。Python 里定义函数用 <code>def</code>：<code>def greet():</code> 冒号回车，缩进的代码就是机器内部的活儿。',
      '关键理解：def 只是「登记」这台机器，里面的代码<b>不会立刻执行</b>。只有调用它——写 <code>greet()</code>——机器才转起来。',
      '函数名和变量名规则一样：用小写英文加下划线，见名知意，比如 print_welcome、calc_price。别起名叫 a、b、c——三个月后你自己都不知道它是干嘛的。',
      '函数最大的好处是<b>复用</b>：定义一次，到处调用；要改逻辑，只改函数里那一处。代码更短，出错的机会也更少。'
    ],

    examples: [
      {
        code: 'def greet():\n    print("你好！欢迎学习 Python")\n\ngreet()',
        output: '你好！欢迎学习 Python',
        note: 'def 只是把代码打包登记；最后一行 greet() 才是真正调用它。'
      },
      {
        code: 'def greet():\n    print("你好！")\n\ngreet()\ngreet()\ngreet()',
        output: '你好！\n你好！\n你好！',
        note: '定义一次，调用三次——这就是「复用」。想改问候语，只改函数里那一行就行。'
      }
    ],

    keyPoints: [
      '用 <code>def 函数名():</code> 定义函数，下面缩进的部分是函数体',
      '定义不会执行，调用（函数名加括号）才会执行',
      '函数可以反复调用，代码只写一遍',
      '函数名和变量名规则相同，见名知意'
    ],

    tips: [
      { bad: 'def greet():\nprint("你好")', good: 'def greet():\n    print("你好")',
        why: '函数体必须缩进——你在 if、while、for 里已经见过这条规则了。' },
      { bad: 'def greet():\n    print("你好")\n\ngreet', good: 'def greet():\n    print("你好")\n\ngreet()',
        why: '只写函数名是「提到它」，加括号才是「调用它」。忘记括号，机器不会转。' }
    ],

    quizIds: ['q4_def_c1', 'q4_def_b1'],
    codeExerciseIds: ['q4_def_k1', 'q4_def_k2']
  },

  /* ================= 第 16 课：函数参数 param ================= */
  {
    id: 'lesson_param',
    stage: 4,
    topic: 'param',
    topicName: '函数参数',
    title: '第 16 课 · 函数参数：给机器开个进料口',
    summary: '学完这节课，你会用参数把数据传进函数，会用默认参数让调用更省事，还会分清局部变量和全局变量。',

    content: [
      '上节课的 greet() 只会说同一句话。想让它对小明说「你好，小明」、对小红说「你好，小红」呢？给机器开个「进料口」——<b>参数</b>。',
      '<code>def greet(name):</code> 括号里的 name 就是参数，像贴了标签的空盒子。调用 <code>greet("小明")</code> 时，"小明" 被装进 name 这个盒子，函数里就能用 name 了。',
      '可以有多个参数，逗号隔开：<code>def add(a, b):</code>。调用时按顺序传：<code>add(2, 3)</code> 里 a 是 2、b 是 3。定义时括号里的叫<b>参数（形参）</b>，调用时传的具体值叫<b>实参</b>。',
      '参数可以设<b>默认值</b>：<code>def greet(name="朋友"):</code>。调用 greet() 不传就自动用 "朋友"，传了 greet("小明") 就用你给的。适合「大多数情况一个样，偶尔变一变」的场景。',
      '一个重要概念：<b>作用域</b>。函数内部定义的变量是<b>局部变量</b>，只在函数里有意义，出了函数就「消失」；在函数外面定义的才是<b>全局变量</b>。两边各过各的日子，互不打扰。'
    ],

    examples: [
      {
        code: 'def greet(name):\n    print("你好，" + name + "！")\n\ngreet("小明")\ngreet("小红")',
        output: '你好，小明！\n你好，小红！',
        note: '同一个函数，传不同的值，得到不同的问候。'
      },
      {
        code: 'def add(a, b):\n    print(a + b)\n\nadd(2, 3)\nadd(10, 20)',
        output: '5\n30',
        note: '两个参数按顺序对应：第一次 a=2、b=3，所以是 5。'
      },
      {
        code: 'def greet(name="朋友"):\n    print("你好，" + name + "！")\n\ngreet()\ngreet("小明")',
        output: '你好，朋友！\n你好，小明！',
        note: '不传参就用默认值 "朋友"；传了就用传入的值。'
      },
      {
        code: 'def power(base, times=2):\n    print(base ** times)\n\npower(3)\npower(2, 3)',
        output: '9\n8',
        note: 'base ** times 是乘方（第 7 课见过）。times 不传默认是 2：3 的平方是 9；传 3 就是 2 的 3 次方 8。'
      }
    ],

    keyPoints: [
      '参数写在 def 的括号里，像贴了标签的空盒子',
      '调用时按顺序传值：add(2, 3) 里 a=2、b=3',
      '<code>def hi(name="默认值"):</code> 是默认参数，不传就用默认值',
      '函数内的变量是局部变量，出了函数就不存在',
      '在函数外定义的才是全局变量'
    ],

    tips: [
      { bad: 'def test():\n    x = 10\n\ntest()\nprint(x)', good: 'x = 10\n\ndef test():\n    print(x)\n\ntest()\nprint(x)',
        why: '函数内的 x 是局部变量，函数外面不存在，print(x) 会报 NameError。想在外面用，就在外面定义（全局变量），或用 return 把值交出来（下一课）。' },
      { bad: 'def add(a, b)\n    print(a + b)', good: 'def add(a, b):\n    print(a + b)',
        why: 'def 那一行结尾要有冒号——和 if、for 一样的老规矩。' }
    ],

    quizIds: ['q4_param_c1', 'q4_param_c2', 'q4_param_b1'],
    codeExerciseIds: ['q4_param_k1', 'q4_param_k2']
  },

  /* ================= 第 17 课：return 返回值 ================= */
  {
    id: 'lesson_return',
    stage: 4,
    topic: 'return',
    topicName: 'return 返回值',
    title: '第 17 课 · return：让函数把结果交出来',
    summary: '学完这节课，你会用 return 让函数把结果交回给代码继续用，还会分清 print 和 return 这对新手最容易混淆的概念。',

    content: [
      '函数处理完，结果怎么拿出来？用 <code>return</code>。return 就是机器的「出料口」：<code>add(2, 3)</code> 处理完，把 5 交回给调用它的地方。',
      '<code>result = add(2, 3)</code> 这行干了什么：右边先调用函数、拿到返回的 5，再存进 result。之后 result 就能随便用——继续加减、放进列表、再传给别的函数。',
      '<code>print</code> 和 <code>return</code> 是两回事：<b>print 是显示给人看的</b>，屏幕上有、代码里没有；<b>return 是把结果交给代码用的</b>，屏幕上什么都没有、但代码能接着用。只有 print 没有 return 的函数，就像只念答案不交卷——别人没法用它的结果。',
      '函数执行到 return <b>立刻结束</b>，后面即使还有代码也不执行了。没写 return 的函数返回 <code>None</code>——Python 表示「这里没有东西」的值。',
      'return 还能一次交出多个值（用元组打包），以后会遇到；现在先掌握「return 一个值」。'
    ],

    examples: [
      {
        code: 'def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)\nprint(add(10, 20) * 2)',
        output: '5\n60',
        note: 'add(2,3) 把 5 交回来存进 result；add(10,20) 的返回值 30 还能直接继续乘 2。'
      },
      {
        code: 'def show(a, b):\n    print(a + b)\n\nx = show(2, 3)\nprint(x)',
        output: '5\nNone',
        note: 'show 只有 print 没有 return，所以 x 收到的是 None——屏幕上的 5 只是「念」了一遍，没交出结果。'
      },
      {
        code: 'def check(n):\n    if n > 0:\n        return "正数"\n    return "不是正数"\n\nprint(check(5))\nprint(check(-3))',
        output: '正数\n不是正数',
        note: '执行到 return 立刻结束——第一个 return 执行后，函数就不再往下走了。'
      }
    ],

    keyPoints: [
      '<code>return</code> 把结果交回给调用它的地方',
      '<code>result = 函数(实参)</code>：先执行函数拿到返回值，再存进变量',
      'print 是显示给人看；return 是交给代码用',
      '执行到 return 立刻结束函数',
      '没写 return 的函数返回 None'
    ],

    tips: [
      { bad: 'def add(a, b):\n    print(a + b)\n\nresult = add(2, 3)\nprint(result + 10)', good: 'def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result + 10)',
        why: 'print 版本的 result 是 None，None + 10 会报 TypeError。要拿结果继续算，必须用 return。' },
      { bad: 'def add(a, b):\n    return a + b\n    print("算完了")', good: 'def add(a, b):\n    return a + b',
        why: 'return 后面的代码永远不会执行——函数在 return 那一刻就结束了。' }
    ],

    quizIds: ['q4_return_c1', 'q4_return_c2', 'q4_return_b1'],
    codeExerciseIds: ['q4_return_k1', 'q4_return_k2']
  },

  /* ================= 第 18 课：类与对象 class ================= */
  {
    id: 'lesson_class',
    stage: 5,
    topic: 'class',
    topicName: '类与对象',
    title: '第 18 课 · 类与对象：图纸和照图纸造的东西',
    summary: '学完这节课，你会迈出「面向对象」的第一步：用 class 画出图纸、创建对象，给对象装上属性和方法。',

    content: [
      '前面学过的变量和函数是散着放的：名字一个变量、年龄一个变量、打招呼一个函数。想管理一条「狗」的信息——名字、年龄、会叫——有没有办法把它们<b>打包在一起</b>？这就是「面向对象」。',
      '先认识两个词：<b>类（class）是图纸</b>，<b>对象（object）是照着图纸造出来的东西</b>。类定义「狗有名字、会叫」，对象是「叫旺财的 2 岁的狗」——图纸一张，狗可以照着造许多条。',
      '用 <code>class</code> 定义类：<code>class Dog:</code> 冒号缩进（类名习惯首字母大写）。里面的 <code>def __init__(self, name, age):</code> 是<b>初始化方法</b>——每次创建对象时自动执行，负责给这条狗装上名字和年龄。self 指的是「这只狗自己」。',
      '创建对象<b>不用 new</b>，直接 <code>Dog("旺财", 2)</code>——像调函数一样调用类名。之后 <code>d.name</code> 能拿出这只狗的名字，<code>d.bark()</code> 能让它叫。',
      '类里定义的函数叫<b>方法</b>，第一个参数固定写 self；通过「对象.方法()」调用。属性（数据）和方法（行为）都挂在对象身上——这就是「打包」的含义。'
    ],

    examples: [
      {
        code: 'class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nd = Dog("旺财", 2)\nprint(d.name)\nprint(d.age)',
        output: '旺财\n2',
        note: 'Dog("旺财", 2) 创建对象时自动执行 __init__，把名字和年龄装到这只狗身上。'
      },
      {
        code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(self.name + "：汪汪！")\n\nd = Dog("旺财")\nd.bark()',
        output: '旺财：汪汪！',
        note: 'bark 是方法，调用用 d.bark()。方法里的 self.name 就是这只狗自己的名字。'
      },
      {
        code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(self.name + "：汪汪！")\n\nd1 = Dog("旺财")\nd2 = Dog("小黑")\nd1.bark()\nd2.bark()',
        output: '旺财：汪汪！\n小黑：汪汪！',
        note: '一张图纸，两条狗。每个对象的 name 各是各的，互不影响。'
      }
    ],

    keyPoints: [
      '类是图纸，对象是照图纸造出来的具体东西',
      '用 <code>class 类名:</code> 定义类，类名习惯首字母大写',
      '<code>__init__</code> 在创建对象时自动执行，用来设置初始属性',
      '<code>self</code> 表示对象自己，方法的第一个参数固定是 self',
      '创建对象直接写 <code>类名()</code>，不需要 new',
      '<code>对象.属性</code> 取数据，<code>对象.方法()</code> 干活'
    ],

    tips: [
      { bad: 'def __init__(name, age):', good: 'def __init__(self, name, age):',
        why: '方法第一个参数必须是 self。忘了它，你传的 "旺财" 会被当成 self，报错还很难看懂。' },
      { bad: 'd = new Dog("旺财")', good: 'd = Dog("旺财")',
        why: 'Python 创建对象不需要 new 关键字，直接类名加括号调用。' }
    ],

    quizIds: ['q5_class_c1', 'q5_class_c2', 'q5_class_b1'],
    codeExerciseIds: ['q5_class_k1', 'q5_class_k2']
  },

  /* ================= 第 19 课：文件读写 file ================= */
  {
    id: 'lesson_file',
    stage: 5,
    topic: 'file',
    topicName: '文件读写',
    title: '第 19 课 · 文件读写：让数据活过程序运行',
    summary: '学完这节课，你会用 with open() 把数据存进文件、再读出来，还会明白 "w" 和 "a" 两种模式天差地别。',

    content: [
      '到现在为止，程序一结束，变量就全没了。想让数据「活过」程序运行——比如记住用户的最高分——就得写到<b>文件</b>里。文件放在硬盘上，关机也不会丢。',
      '读写文件的标准姿势是 <code>with open("文件名", "模式") as f:</code>。with 的好处：代码块结束<b>自动关文件</b>，不怕忘记。模式最常用的有两种："w" 写入、"r" 读取。',
      '<b>大坑预警</b>："w" 是<b>覆盖写入</b>——打开的一瞬间原文件就被清空了！想在文件末尾「追加」，用 "a" 模式。这个差别能造成数据事故，务必记牢。',
      '<code>f.write("内容")</code> 写入的内容<b>不会自动换行</b>，想换行要在结尾加 <code>\\n</code>。<code>f.read()</code> 一次读出全部内容；<code>f.readlines()</code> 按行读成列表。',
      '在这个网站的沙箱里也能体验文件读写（写在沙箱的临时空间里，不会动你电脑上的文件）。'
    ],

    examples: [
      {
        code: 'with open("demo.txt", "w", encoding="utf-8") as f:\n    f.write("第一行\\n")\n    f.write("第二行\\n")\n\nwith open("demo.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
        output: '第一行\n第二行',
        note: '先写入两行，再用 "r" 模式读出来。\\n 是换行符——write 不会自动换行。'
      },
      {
        code: 'with open("demo.txt", "a", encoding="utf-8") as f:\n    f.write("追加的一行\\n")\n\nwith open("demo.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
        output: '第一行\n第二行\n追加的一行',
        note: '"a" 模式在末尾追加，原有内容完好无损。'
      },
      {
        code: 'with open("demo.txt", "w", encoding="utf-8") as f:\n    f.write("重新来")\n\nwith open("demo.txt", "r", encoding="utf-8") as f:\n    print(f.read())',
        output: '重新来',
        note: '再用 "w" 打开，之前的内容全部被清空——这就是覆盖写入的威力。'
      }
    ],

    keyPoints: [
      '<code>with open("文件", "模式") as f:</code> 是推荐写法，自动关文件',
      '"w" 写入会<b>清空</b>原文件；"a" 追加不清空；"r" 读取',
      '<code>write()</code> 不自动换行，需要换行就写 <code>\\n</code>',
      '<code>read()</code> 读全部内容，<code>readlines()</code> 按行读成列表'
    ],

    tips: [
      { bad: 'f = open("a.txt", "w")\nf.write("内容")', good: 'with open("a.txt", "w") as f:\n    f.write("内容")',
        why: '不用 with 就要记得手动 f.close()，忘了会导致内容没真正写进去。with 自动帮你关。' },
      { bad: 'with open("a.txt", "w") as f:  # 想保留旧数据', good: 'with open("a.txt", "a") as f:  # 想保留旧数据',
        why: '"w" 会先清空整个文件再写！想在末尾续写必须用 "a" 模式。' }
    ],

    quizIds: ['q5_file_c1', 'q5_file_b1'],
    codeExerciseIds: ['q5_file_k1', 'q5_file_k2']
  },

  /* ================= 第 20 课：异常处理 exception ================= */
  {
    id: 'lesson_exception',
    stage: 5,
    topic: 'exception',
    topicName: '异常处理',
    title: '第 20 课 · 异常处理：给程序装一张安全网',
    summary: '学完这节课，你会用 try / except 接住程序错误：出错时不再崩溃，而是走你准备好的后路。',

    content: [
      '程序出错时会发生什么？你已经见过：一片报错，后面的代码全不执行。但有些错误不是 bug——比如用户把年龄输成了「abc」，或者文件恰好不存在。这类「预料之中可能发生的错」，可以用<b>异常处理</b>接住。',
      '写法：<code>try:</code> 里放<b>可能出错</b>的代码；<code>except:</code> 里放<b>出错之后</b>怎么办。try 里的代码一旦报错，立刻跳进 except，程序继续正常往下走，<b>不会崩溃</b>。',
      '打个比方：try 是「走钢丝」，except 是下面的安全网。正常情况走钢丝；摔下来也不摔死，落在网上继续演出。',
      'except 还能按错误类型分别接：<code>except ValueError:</code> 只接值错误，<code>except ZeroDivisionError:</code> 只接除零错误。还有 else（没出错时执行）和 finally（无论出没出错都执行）——先掌握基本的 try / except 就够。',
      '马上能用的场景：<code>int(input(...))</code> 怕用户输的不是数字，用 try 包住它，except 里提示「请输入数字」。'
    ],

    examples: [
      {
        code: 'try:\n    n = int("abc")\n    print("转换成功")\nexcept:\n    print("出错了：abc 不是数字")\n\nprint("程序还在运行")',
        output: '出错了：abc 不是数字\n程序还在运行',
        note: 'int("abc") 报 ValueError，被 except 接住；程序没有崩溃，最后一行照常执行。'
      },
      {
        code: 'try:\n    print(10 / 0)\n    print("这行不会执行")\nexcept:\n    print("除数不能为 0！")',
        output: '除数不能为 0！',
        note: '出错后，try 里剩下的代码直接跳过——「这行不会执行」真的没执行。'
      },
      {
        code: 'try:\n    n = int("123")\n    print("你输入的是", n)\nexcept:\n    print("请输入数字")',
        output: '你输入的是 123',
        note: '没出错时 except 完全不执行——安全网只接住摔下来的人。'
      }
    ],

    keyPoints: [
      '<code>try:</code> 放可能出错的代码，<code>except:</code> 放出错后的处理',
      'try 里一出错，立刻跳进 except，程序不崩溃',
      '出错后 try 里剩下的代码不再执行',
      '没出错时 except 不执行',
      '可以按错误类型分别捕获（except ValueError: 等）'
    ],

    tips: [
      { bad: 'try\n    n = int(input())', good: 'try:\n    n = int(input())',
        why: 'try 后面要冒号，except 后面也要——还是那条冒号规则。' },
      { bad: 'try:\n    n = int("abc")\nprint("处理完")', good: 'try:\n    n = int("abc")\nexcept:\n    print("出错了")',
        why: 'try 不能单独使用，必须配 except，否则报 SyntaxError。' }
    ],

    quizIds: ['q5_exception_c1', 'q5_exception_b1'],
    codeExerciseIds: ['q5_exception_k1', 'q5_exception_k2']
  },

  /* ================= 第 21 课：模块导入 module ================= */
  {
    id: 'lesson_module',
    stage: 5,
    topic: 'module',
    topicName: '模块导入',
    title: '第 21 课 · 模块导入：借用 Python 自带的工具箱',
    summary: '学完这节课，你会用 import 借用 Python 自带的工具箱：整体导入和按需导入两种方式，还会试试随机数和数学函数。',

    content: [
      'Python 自带一个巨大的「工具仓库」——标准库：生成随机数、算平方根、处理时间……这些不用你写，<b>import 一下就能用</b>。每一个仓库叫一个<b>模块（module）</b>。',
      '两种借法。<b>整体导入</b>：<code>import random</code>，之后用 <code>random.randint(1, 10)</code>——带模块名前缀调用。<b>按需导入</b>：<code>from math import sqrt</code>，只拿 sqrt 一件工具，之后直接写 <code>sqrt(4)</code>，不用前缀。',
      '前缀就像快递柜地址：random.randint 意思是「random 柜子里的 randint」。按需导入相当于把工具直接揣兜里，方便，但要当心不同模块的同名工具「撞衫」——初学阶段整体导入更稳妥。',
      '认识两个马上能玩的模块：<b>random</b>（随机数，randint(a, b) 生成 a 到 b 的随机整数）和 <b>math</b>（数学，sqrt 开平方、pi 是圆周率、floor 向下取整）。',
      '第三方模块（requests、numpy 这些）要用 pip 安装后才能 import——那是以后的事，今天先用自带的。'
    ],

    examples: [
      {
        code: 'import random\n\nrandom.seed(1)\nn = random.randint(1, 6)\nprint("骰子掷出了：" + str(n))',
        output: '骰子掷出了：2',
        note: 'randint(1, 6) 掷出一个 1 到 6 的随机整数。seed(1) 是固定随机起点，为了让示例输出稳定；平时用不用它都行。'
      },
      {
        code: 'from math import sqrt, pi\n\nprint(sqrt(16))\nprint(pi)',
        output: '4.0\n3.141592653589793',
        note: '按需导入后不用加前缀。sqrt 开平方（结果带小数点，还记得第 7 课的除法吗），pi 是圆周率。'
      },
      {
        code: 'import math\n\nprint(math.sqrt(25))\nprint(math.floor(3.9))',
        output: '5.0\n3',
        note: '整体导入要带前缀 math.sqrt。floor 是向下取整：3.9 取成 3。'
      }
    ],

    keyPoints: [
      '<code>import 模块名</code>：整体导入，调用时带前缀（random.randint）',
      '<code>from 模块 import 工具</code>：按需导入，直接用不用前缀',
      '<code>randint(1, 6)</code> 生成 1~6 的随机整数（random 模块）',
      '<code>sqrt()</code> 开平方、<code>pi</code> 圆周率、<code>floor()</code> 向下取整（math 模块）',
      '标准库自带，第三方模块需要 pip 安装'
    ],

    tips: [
      { bad: 'import random\nprint(randint(1, 6))', good: 'import random\nprint(random.randint(1, 6))',
        why: '整体导入后必须带模块名前缀，直接写 randint 会报 NameError。' },
      { bad: 'import sqrt', good: 'from math import sqrt',
        why: 'sqrt 是 math 模块里的函数，不能直接 import 函数名；要么 from math import sqrt，要么 import math 后用 math.sqrt。' }
    ],

    quizIds: ['q5_module_c1', 'q5_module_b1'],
    codeExerciseIds: ['q5_module_k1', 'q5_module_k2']
  }
];

/* ---------------- 查询工具 ---------------- */
// 按知识点取课程（没有返回 null，页面保持原「直接进练习」行为）
window.lessonOf = function (topic) {
  return (window.LESSONS || []).find((l) => l.topic === topic) || null;
};
