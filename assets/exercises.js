/* ============================================================
 * 练习题库
 * tests 支持三种类型：
 *   {type:'call',  call:'f(1)', expect:3}         —— 求值并比对返回值
 *   {type:'stdout',code:'print(f(3))', expect:'x'} —— 比对标准输出
 *   {type:'true',  call:'isinstance(x,list)'}      —— 求值为真即通过
 * ============================================================ */
window.EXERCISES = [

/* ---------------- 基础语法 ---------------- */
{
  id:'b1', cat:'basics', catName:'基础语法', level:1,
  title:'打招呼函数',
  desc:'写一个函数 <code>greet(name)</code>，返回字符串 <code>Hello, {name}!</code>。',
  io:[['示例', "greet('Tom') → 'Hello, Tom!'"]],
  starter:'def greet(name):\n    # 在这里返回问候语\n    pass\n',
  hint:'用 f-string：<code>return f"Hello, {name}!"</code>',
  tests:[
    {name:"greet('Tom')", type:'call', call:"greet('Tom')", expect:'Hello, Tom!'},
    {name:"greet('世界')", type:'call', call:"greet('世界')", expect:'Hello, 世界!'},
    {name:'返回值是字符串', type:'true', call:"isinstance(greet('a'), str)"}
  ]
},
{
  id:'b2', cat:'basics', catName:'基础语法', level:1,
  title:'判断奇数',
  desc:'写 <code>is_odd(n)</code>，当 n 为奇数时返回 <code>True</code>，否则返回 <code>False</code>。',
  io:[['示例', 'is_odd(3) → True，is_odd(4) → False']],
  starter:'def is_odd(n):\n    pass\n',
  hint:'取模运算：<code>return n % 2 == 1</code>',
  tests:[
    {name:'is_odd(3)', type:'call', call:'is_odd(3)', expect:true},
    {name:'is_odd(4)', type:'call', call:'is_odd(4)', expect:false},
    {name:'is_odd(0)', type:'call', call:'is_odd(0)', expect:false},
    {name:'is_odd(-7)', type:'call', call:'is_odd(-7)', expect:true}
  ]
},
{
  id:'b3', cat:'basics', catName:'基础语法', level:1,
  title:'累加求和',
  desc:'写 <code>sum_to(n)</code>，返回 1 到 n 所有整数之和（不用 <code>sum()</code> 也行，但建议先手写循环）。',
  io:[['示例', 'sum_to(100) → 5050']],
  starter:'def sum_to(n):\n    total = 0\n    # 补全循环\n    return total\n',
  hint:'<code>for i in range(1, n+1): total += i</code>',
  tests:[
    {name:'sum_to(10)', type:'call', call:'sum_to(10)', expect:55},
    {name:'sum_to(100)', type:'call', call:'sum_to(100)', expect:5050},
    {name:'sum_to(1)', type:'call', call:'sum_to(1)', expect:1},
    {name:'sum_to(0)', type:'call', call:'sum_to(0)', expect:0}
  ]
},
{
  id:'b4', cat:'basics', catName:'基础语法', level:2,
  title:'FizzBuzz',
  desc:'写 <code>fizzbuzz(n)</code>，返回一个列表：3 的倍数用 <code>"Fizz"</code>，5 的倍数用 <code>"Buzz"</code>，同时是 3 和 5 的倍数用 <code>"FizzBuzz"</code>，其余用数字本身。',
  io:[['示例', 'fizzbuzz(5) → [1, 2, \'Fizz\', 4, \'Buzz\']']],
  starter:'def fizzbuzz(n):\n    result = []\n    for i in range(1, n + 1):\n        pass\n    return result\n',
  hint:'先判断 <code>i % 15 == 0</code>，再判断 3 和 5，顺序不能反。',
  tests:[
    {name:'fizzbuzz(5)', type:'call', call:'fizzbuzz(5)', expect:[1,2,'Fizz',4,'Buzz']},
    {name:'fizzbuzz(15) 含 FizzBuzz', type:'call', call:'fizzbuzz(15)[14]', expect:'FizzBuzz'},
    {name:'fizzbuzz(3)', type:'call', call:'fizzbuzz(3)', expect:[1,2,'Fizz']}
  ]
},
{
  id:'b5', cat:'basics', catName:'基础语法', level:1,
  title:'温度转换',
  desc:'写 <code>c_to_f(c)</code>，把摄氏度转华氏度：F = C × 9/5 + 32，结果保留 1 位小数。',
  io:[['示例', 'c_to_f(100) → 212.0']],
  starter:'def c_to_f(c):\n    pass\n',
  hint:'<code>return round(c * 9 / 5 + 32, 1)</code>',
  tests:[
    {name:'c_to_f(0)', type:'call', call:'c_to_f(0)', expect:32.0},
    {name:'c_to_f(100)', type:'call', call:'c_to_f(100)', expect:212.0},
    {name:'c_to_f(37)', type:'call', call:'c_to_f(37)', expect:98.6}
  ]
},
{
  id:'b6', cat:'basics', catName:'基础语法', level:2,
  title:'读取输入并输出',
  desc:'读取两个整数 a、b（用 <code>input()</code>），输出它们的和。本题用标准输出判题。',
  io:[['输入', '3\\n5'], ['输出', '8']],
  starter:'a = int(input())\nb = int(input())\n# 输出 a + b\n',
  hint:'<code>print(a + b)</code>',
  tests:[],
  stdinTests:[
    {name:'3 + 5 = 8', stdin:'3\n5', expect:'8'},
    {name:'10 + 20 = 30', stdin:'10\n20', expect:'30'},
    {name:'-1 + 1 = 0', stdin:'-1\n1', expect:'0'}
  ]
},

/* ---------------- 数据结构 ---------------- */
{
  id:'d1', cat:'data', catName:'数据结构', level:2,
  title:'列表去重保序',
  desc:'写 <code>dedupe(lst)</code>，去掉列表中的重复元素，并保持原有顺序。',
  io:[['示例', 'dedupe([3,1,3,2,1]) → [3,1,2]']],
  starter:'def dedupe(lst):\n    result = []\n    for x in lst:\n        pass\n    return result\n',
  hint:'用 <code>if x not in result: result.append(x)</code>（<code>set()</code> 会打乱顺序）。',
  tests:[
    {name:'dedupe([3,1,3,2,1])', type:'call', call:'dedupe([3,1,3,2,1])', expect:[3,1,2]},
    {name:'dedupe([]) → []', type:'call', call:'dedupe([])', expect:[]},
    {name:'字符串也适用', type:'call', call:"dedupe(['a','b','a'])", expect:['a','b']}
  ]
},
{
  id:'d2', cat:'data', catName:'数据结构', level:2,
  title:'字符频次统计',
  desc:'写 <code>char_count(s)</code>，统计字符串中每个字符出现的次数，返回字典（忽略空格）。',
  io:[['示例', "char_count('aab c') → {'a':2,'b':1,'c':1}"]],
  starter:'def char_count(s):\n    counts = {}\n    for ch in s:\n        pass\n    return counts\n',
  hint:'<code>counts[ch] = counts.get(ch, 0) + 1</code>，记得 <code>if ch != " "</code>。',
  tests:[
    {name:"char_count('aab')", type:'call', call:"char_count('aab')", expect:{a:2,b:1}},
    {name:"忽略空格", type:'call', call:"char_count('a b')", expect:{a:1,b:1}},
    {name:'空字符串', type:'call', call:"char_count('')", expect:{}}
  ]
},
{
  id:'d3', cat:'data', catName:'数据结构', level:1,
  title:'列表推导式：平方表',
  desc:'用一行列表推导式实现 <code>squares(n)</code>，返回 1 到 n 的平方列表。',
  io:[['示例', 'squares(4) → [1, 4, 9, 16]']],
  starter:'def squares(n):\n    return []\n',
  hint:'<code>return [i * i for i in range(1, n + 1)]</code>',
  tests:[
    {name:'squares(4)', type:'call', call:'squares(4)', expect:[1,4,9,16]},
    {name:'squares(1)', type:'call', call:'squares(1)', expect:[1]},
    {name:'squares(0)', type:'call', call:'squares(0)', expect:[]}
  ]
},
{
  id:'d4', cat:'data', catName:'数据结构', level:2,
  title:'找出值最大的键',
  desc:'写 <code>max_key(d)</code>，返回字典中值最大的那个键。',
  io:[['示例', "max_key({'a':3,'b':9,'c':1}) → 'b'"]],
  starter:'def max_key(d):\n    pass\n',
  hint:'<code>return max(d, key=d.get)</code>',
  tests:[
    {name:'基础用例', type:'call', call:"max_key({'a':3,'b':9,'c':1})", expect:'b'},
    {name:'负值', type:'call', call:"max_key({'x':-5,'y':-1})", expect:'y'}
  ]
},
{
  id:'d5', cat:'data', catName:'数据结构', level:2,
  title:'反转单词顺序',
  desc:'写 <code>reverse_words(s)</code>，把句子里的单词顺序反转（单词内部不变）。',
  io:[['示例', "reverse_words('I love Python') → 'Python love I'"]],
  starter:'def reverse_words(s):\n    pass\n',
  hint:'<code>return " ".join(s.split()[::-1])</code>',
  tests:[
    {name:'三个单词', type:'call', call:"reverse_words('I love Python')", expect:'Python love I'},
    {name:'单个单词', type:'call', call:"reverse_words('Hi')", expect:'Hi'},
    {name:'多空格容错', type:'call', call:"reverse_words('a  b')", expect:'b a'}
  ]
},
{
  id:'d6', cat:'data', catName:'数据结构', level:3,
  title:'矩阵转置',
  desc:'写 <code>transpose(m)</code>，把二维列表行列互换。',
  io:[['示例', 'transpose([[1,2,3],[4,5,6]]) → [[1,4],[2,5],[3,6]]']],
  starter:'def transpose(m):\n    pass\n',
  hint:'<code>return [list(row) for row in zip(*m)]</code>',
  tests:[
    {name:'2×3 矩阵', type:'call', call:'transpose([[1,2,3],[4,5,6]])', expect:[[1,4],[2,5],[3,6]]},
    {name:'1×2 矩阵', type:'call', call:'transpose([[1,2]])', expect:[[1],[2]]}
  ]
},

/* ---------------- 函数与作用域 ---------------- */
{
  id:'f1', cat:'func', catName:'函数与作用域', level:1,
  title:'递归阶乘',
  desc:'用递归实现 <code>factorial(n)</code>，返回 n 的阶乘（0! = 1）。',
  io:[['示例', 'factorial(5) → 120']],
  starter:'def factorial(n):\n    if n <= 1:\n        return 1\n    # 补全递归\n',
  hint:'<code>return n * factorial(n - 1)</code>',
  tests:[
    {name:'factorial(5)', type:'call', call:'factorial(5)', expect:120},
    {name:'factorial(0)', type:'call', call:'factorial(0)', expect:1},
    {name:'factorial(1)', type:'call', call:'factorial(1)', expect:1}
  ]
},
{
  id:'f2', cat:'func', catName:'函数与作用域', level:2,
  title:'可变参数求和',
  desc:'写 <code>sum_all(*args)</code>，返回所有参数之和，参数个数不定。',
  io:[['示例', 'sum_all(1,2,3) → 6']],
  starter:'def sum_all(*args):\n    pass\n',
  hint:'<code>return sum(args)</code> 或手写循环。',
  tests:[
    {name:'三个参数', type:'call', call:'sum_all(1,2,3)', expect:6},
    {name:'无参数', type:'call', call:'sum_all()', expect:0},
    {name:'五个参数', type:'call', call:'sum_all(1,2,3,4,5)', expect:15}
  ]
},
{
  id:'f3', cat:'func', catName:'函数与作用域', level:2,
  title:'按长度排序',
  desc:'写 <code>sort_by_len(words)</code>，按字符串长度从短到长排序并返回新列表。',
  io:[['示例', "sort_by_len(['bbb','a','cc']) → ['a','cc','bbb']"]],
  starter:'def sort_by_len(words):\n    pass\n',
  hint:'<code>return sorted(words, key=len)</code>',
  tests:[
    {name:'基础用例', type:'call', call:"sort_by_len(['bbb','a','cc'])", expect:['a','cc','bbb']},
    {name:'空列表', type:'call', call:'sort_by_len([])', expect:[]}
  ]
},
{
  id:'f4', cat:'func', catName:'函数与作用域', level:3,
  title:'闭包计数器',
  desc:'写 <code>make_counter()</code>，返回一个函数，每次调用返回递增的计数（从 1 开始）。',
  io:[['示例', 'c = make_counter(); c() → 1; c() → 2']],
  starter:'def make_counter():\n    count = 0\n    def counter():\n        pass\n    return counter\n',
  hint:'内层函数需要 <code>nonlocal count</code>，然后 <code>count += 1; return count</code>。',
  tests:[
    {name:'连续调用 1,2', type:'call', call:'[ (c:=make_counter())(), c() ]', expect:[1,2]},
    {name:'计数器互相独立', type:'call', call:'[make_counter()(), make_counter()()]', expect:[1,1]},
    {name:'调用三次返回 1,2,3', type:'call', call:'(lambda c: (c(), c(), c()))(make_counter())', expect:[1,2,3]}
  ]
},
{
  id:'f5', cat:'func', catName:'函数与作用域', level:3,
  title:'参数默认值陷阱',
  desc:'修复下面的函数：多次调用不应累积结果。实现 <code>add_item(item, lst=None)</code>，返回加入 item 后的新列表。',
  io:[['示例', 'add_item(1) → [1]，再调用 add_item(2) → [2]（不是 [1,2]）']],
  starter:'def add_item(item, lst=None):\n    if lst is None:\n        lst = []\n    lst.append(item)\n    return lst\n',
  hint:'关键就是 <code>if lst is None: lst = []</code>，不要把默认值写成 <code>lst=[]</code>。',
  tests:[
    {name:'第一次调用', type:'call', call:'add_item(1)', expect:[1]},
    {name:'不累积', type:'call', call:'[add_item(1), add_item(2)]', expect:[[1],[2]]},
    {name:'可传入列表', type:'call', call:'add_item(3, [0])', expect:[0,3]}
  ]
},

/* ---------------- 面向对象 ---------------- */
{
  id:'o1', cat:'oop', catName:'面向对象', level:2,
  title:'矩形类',
  desc:'定义 <code>Rectangle</code> 类，构造参数 width、height，提供 <code>area()</code> 和 <code>perimeter()</code> 方法。',
  io:[['示例', 'Rectangle(3,4).area() → 12']],
  starter:'class Rectangle:\n    def __init__(self, width, height):\n        pass\n\n    def area(self):\n        pass\n\n    def perimeter(self):\n        pass\n',
  hint:'在 <code>__init__</code> 里保存 <code>self.width = width</code>。',
  tests:[
    {name:'面积 3×4', type:'call', call:'Rectangle(3,4).area()', expect:12},
    {name:'周长 3×4', type:'call', call:'Rectangle(3,4).perimeter()', expect:14},
    {name:'正方形', type:'call', call:'Rectangle(5,5).area()', expect:25}
  ]
},
{
  id:'o2', cat:'oop', catName:'面向对象', level:2,
  title:'银行账户',
  desc:'定义 <code>BankAccount</code> 类：<code>deposit(n)</code> 存款、<code>withdraw(n)</code> 取款（余额不足返回 False）、<code>get_balance()</code> 查余额。',
  io:[['示例', 'a=BankAccount(); a.deposit(100); a.withdraw(30) → True; a.get_balance() → 70']],
  starter:'class BankAccount:\n    def __init__(self):\n        self.balance = 0\n\n    def deposit(self, n):\n        pass\n\n    def withdraw(self, n):\n        pass\n\n    def get_balance(self):\n        return self.balance\n',
  hint:'<code>withdraw</code> 里判断 <code>if n > self.balance: return False</code>。',
  tests:[
    {name:'存取后余额', type:'call', call:'(lambda a: (a.deposit(100), a.withdraw(30), a.get_balance())[2])(BankAccount())', expect:70},
    {name:'余额不足返回 False', type:'call', call:'(lambda a: (a.deposit(10), a.withdraw(50))[1])(BankAccount())', expect:false},
    {name:'初始余额 0', type:'call', call:'BankAccount().get_balance()', expect:0}
  ]
},
{
  id:'o3', cat:'oop', catName:'面向对象', level:2,
  title:'继承与多态',
  desc:'定义 <code>Animal</code> 基类（方法 <code>speak()</code> 返回空串），再定义 <code>Dog</code> 和 <code>Cat</code> 子类，分别返回 <code>"Wang"</code> 和 <code>"Miao"</code>。',
  io:[['示例', "Dog().speak() → 'Wang'"]],
  starter:'class Animal:\n    def speak(self):\n        return ""\n\nclass Dog(Animal):\n    pass\n\nclass Cat(Animal):\n    pass\n',
  hint:'子类直接重写 <code>def speak(self): return "Wang"</code>。',
  tests:[
    {name:'Dog', type:'call', call:'Dog().speak()', expect:'Wang'},
    {name:'Cat', type:'call', call:'Cat().speak()', expect:'Miao'},
    {name:'是 Animal 的子类', type:'true', call:'issubclass(Dog, Animal)'}
  ]
},
{
  id:'o4', cat:'oop', catName:'面向对象', level:3,
  title:'实例计数',
  desc:'给 <code>User</code> 类加一个类属性 <code>count</code>，每创建一个实例加 1，可用 <code>User.count</code> 读取。',
  io:[['示例', 'User(); User(); User.count → 2']],
  starter:'class User:\n    count = 0\n\n    def __init__(self, name):\n        self.name = name\n        # 在这里增加计数\n',
  hint:'用 <code>User.count += 1</code>（不能用 <code>self.count</code>，那会创建实例属性）。',
  tests:[
    {name:'创建 3 个实例', type:'call', call:'(lambda: [User("a"), User("b"), User("c")] and User.count)()', expect:3},
    {name:'初始为 0', type:'true', call:"hasattr(User, 'count')"}
  ]
},

/* ---------------- 进阶特性 ---------------- */
{
  id:'a1', cat:'advanced', catName:'进阶特性', level:3,
  title:'装饰器：结果翻倍',
  desc:'写一个装饰器 <code>double</code>，让被装饰函数的返回值乘以 2。',
  io:[['示例', '@double\\ndef add(a,b): return a+b\\nadd(1,2) → 6']],
  starter:'def double(func):\n    def wrapper(*args, **kwargs):\n        pass\n    return wrapper\n',
  hint:'<code>return func(*args, **kwargs) * 2</code>',
  tests:[
    {name:'装饰后翻倍', type:'call', call:'(lambda: (double(lambda a,b: a+b))(1,2))()', expect:6},
    {name:'单参数', type:'call', call:'(lambda: (double(lambda x: x))(5))()', expect:10},
    {name:'返回的是函数', type:'true', call:'callable(double(lambda: 1))'}
  ]
},
{
  id:'a2', cat:'advanced', catName:'进阶特性', level:3,
  title:'生成器：斐波那契',
  desc:'写生成器函数 <code>fib(n)</code>，依次产出前 n 个斐波那契数（0, 1, 1, 2, 3…）。',
  io:[['示例', 'list(fib(5)) → [0,1,1,2,3]']],
  starter:'def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        pass\n',
  hint:'<code>yield a</code> 然后 <code>a, b = b, a + b</code>。',
  tests:[
    {name:'fib(5)', type:'call', call:'list(fib(5))', expect:[0,1,1,2,3]},
    {name:'fib(1)', type:'call', call:'list(fib(1))', expect:[0]},
    {name:'是生成器', type:'true', call:"hasattr(fib(3), '__next__')"}
  ]
},
{
  id:'a3', cat:'advanced', catName:'进阶特性', level:2,
  title:'安全除法',
  desc:'写 <code>safe_divide(a, b)</code>，正常返回 a/b；当 b 为 0 或类型错误时返回 <code>None</code>（不许抛异常）。',
  io:[['示例', 'safe_divide(10, 0) → None']],
  starter:'def safe_divide(a, b):\n    try:\n        return a / b\n    except (ZeroDivisionError, TypeError):\n        pass\n',
  hint:'把 <code>pass</code> 换成 <code>return None</code>。',
  tests:[
    {name:'正常除法', type:'call', call:'safe_divide(10, 2)', expect:5.0},
    {name:'除零返回 None', type:'call', call:'safe_divide(10, 0)', expect:null},
    {name:'类型错误返回 None', type:'call', call:"safe_divide(10, 'x')", expect:null}
  ]
},
{
  id:'a4', cat:'advanced', catName:'进阶特性', level:3,
  title:'正则提取数字',
  desc:'写 <code>extract_numbers(s)</code>，用正则提取字符串中所有整数，返回整数列表。',
  io:[['示例', "extract_numbers('a12b3') → [12, 3]"]],
  starter:'import re\n\ndef extract_numbers(s):\n    return [int(x) for x in re.findall(r"\\d+", s)]\n',
  hint:'<code>re.findall(r"\\d+", s)</code> 已经在初始代码里了，跑一下看看。',
  tests:[
    {name:'字母数字混合', type:'call', call:"extract_numbers('a12b3')", expect:[12,3]},
    {name:'多个数字', type:'call', call:"extract_numbers('1 and 20 and 300')", expect:[1,20,300]},
    {name:'无数字', type:'call', call:"extract_numbers('abc')", expect:[]}
  ]
},
{
  id:'a5', cat:'advanced', catName:'进阶特性', level:3,
  title:'上下文管理器',
  desc:'写一个类 <code>Timer</code>，可用 <code>with Timer() as t:</code>，进入时记录开始时间，退出后 <code>t.elapsed</code> 为耗时秒数（float）。',
  io:[['示例', 'with Timer() as t: pass\\nt.elapsed >= 0 → True']],
  starter:'import time\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self\n\n    def __exit__(self, *exc):\n        pass\n',
  hint:'在 <code>__exit__</code> 里 <code>self.elapsed = time.time() - self.start</code>。',
  tests:[
    {name:'elapsed 是 float 且非负', type:'true', call:'(lambda: (lambda t: (t.__enter__(), t.__exit__(None, None, None), isinstance(getattr(t, "elapsed", None), float) and t.elapsed >= 0)[-1])(Timer()))()'},
    {name:'耗时大于 0', type:'true', call:'(lambda: (lambda t: (t.__enter__(), sum(range(10000)), t.__exit__(None, None, None), t.elapsed > 0)[-1])(Timer()))()'}
  ]
},

/* ---------------- 算法实战 ---------------- */
{
  id:'g1', cat:'algo', catName:'算法实战', level:2,
  title:'回文判断',
  desc:'写 <code>is_palindrome(s)</code>，判断字符串是否是回文（忽略大小写和空格）。',
  io:[['示例', "is_palindrome('A man a plan a canal Panama') → True"]],
  starter:'def is_palindrome(s):\n    pass\n',
  hint:'先 <code>s = "".join(s.lower().split())</code>，再比较 <code>s == s[::-1]</code>。',
  tests:[
    {name:'经典回文', type:'call', call:"is_palindrome('A man a plan a canal Panama')", expect:true},
    {name:'非回文', type:'call', call:"is_palindrome('hello')", expect:false},
    {name:'单字符', type:'call', call:"is_palindrome('a')", expect:true}
  ]
},
{
  id:'g2', cat:'algo', catName:'算法实战', level:2,
  title:'二分查找',
  desc:'写 <code>binary_search(arr, target)</code>，在有序数组中查找，找到返回下标，否则返回 -1。',
  io:[['示例', 'binary_search([1,3,5,7,9], 7) → 3']],
  starter:'def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        pass\n    return -1\n',
  hint:'<code>arr[mid] < target</code> 时 <code>lo = mid + 1</code>，大于时 <code>hi = mid - 1</code>，相等 <code>return mid</code>。',
  tests:[
    {name:'找到 7', type:'call', call:'binary_search([1,3,5,7,9], 7)', expect:3},
    {name:'找不到', type:'call', call:'binary_search([1,3,5], 4)', expect:-1},
    {name:'边界元素', type:'call', call:'binary_search([1,3,5], 1)', expect:0}
  ]
},
{
  id:'g3', cat:'algo', catName:'算法实战', level:3,
  title:'两数之和',
  desc:'写 <code>two_sum(nums, target)</code>，返回两个数的下标（列表），保证有且仅有一个解。',
  io:[['示例', 'two_sum([2,7,11,15], 9) → [0, 1]']],
  starter:'def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        pass\n',
  hint:'用字典记录「值 → 下标」，每次查 <code>target - n</code> 是否见过。',
  tests:[
    {name:'基础用例', type:'call', call:'two_sum([2,7,11,15], 9)', expect:[0,1]},
    {name:'不相邻', type:'call', call:'two_sum([3,2,4], 6)', expect:[1,2]},
    {name:'含重复', type:'call', call:'two_sum([3,3], 6)', expect:[0,1]}
  ]
},
{
  id:'g4', cat:'algo', catName:'算法实战', level:3,
  title:'统计素数个数',
  desc:'写 <code>count_primes(n)</code>，返回小于 n 的素数个数。',
  io:[['示例', 'count_primes(10) → 4（2,3,5,7）']],
  starter:'def count_primes(n):\n    count = 0\n    for x in range(2, n):\n        pass\n    return count\n',
  hint:'对每个 x，检查 <code>all(x % i != 0 for i in range(2, int(x**0.5)+1))</code>。',
  tests:[
    {name:'小于 10', type:'call', call:'count_primes(10)', expect:4},
    {name:'小于 2', type:'call', call:'count_primes(2)', expect:0},
    {name:'小于 30', type:'call', call:'count_primes(30)', expect:10}
  ]
},
{
  id:'g5', cat:'algo', catName:'算法实战', level:3,
  title:'单词频次 Top1',
  desc:'写 <code>top_word(text)</code>，返回出现次数最多的单词（小写，忽略标点 <code>,.!?</code>）。',
  io:[['示例', "top_word('a a b') → 'a'"]],
  starter:'import re\nfrom collections import Counter\n\ndef top_word(text):\n    words = re.findall(r"[a-zA-Z]+", text.lower())\n    pass\n',
  hint:'用 <code>Counter(words).most_common(1)[0][0]</code>。',
  tests:[
    {name:'基础用例', type:'call', call:"top_word('a a b')", expect:'a'},
    {name:'忽略标点', type:'call', call:"top_word('Hi, hi! hi? ok.')", expect:'hi'},
    {name:'大小写不敏感', type:'call', call:"top_word('Python python java')", expect:'python'}
  ]
}
];

/* ---------------- 示例代码 ---------------- */
window.SAMPLES = [
  {
    name:'Hello World',
    code:'print("Hello, Python!")\n'
  },
  {
    name:'变量与类型',
    code:'name = "Python"\nversion = 3.12\nis_fun = True\n\nprint(f"{name} {version}", type(version), is_fun)\nprint(10 / 3, 10 // 3, 10 % 3)\n'
  },
  {
    name:'列表与字典',
    code:'fruits = ["apple", "banana", "cherry"]\nfor i, f in enumerate(fruits):\n    print(i, f)\n\nscores = {"Alice": 90, "Bob": 85}\nscores["Cindy"] = 95\nfor k, v in sorted(scores.items(), key=lambda x: -x[1]):\n    print(k, v)\n'
  },
  {
    name:'列表推导式',
    code:'nums = list(range(1, 11))\n\nprint("平方:", [n * n for n in nums])\nprint("偶数:", [n for n in nums if n % 2 == 0])\nprint("矩阵:", [[r * c for c in range(1, 4)] for r in range(1, 4)])\n'
  },
  {
    name:'函数与参数',
    code:'def greet(name, punctuation="!"):\n    return f"Hello, {name}{punctuation}"\n\ndef total(*args, **kwargs):\n    print("位置参数:", args)\n    print("关键字参数:", kwargs)\n\nprint(greet("Tom"))\nprint(greet("Jerry", "?"))\ntotal(1, 2, 3, lang="Python")\n'
  },
  {
    name:'类与对象',
    code:'class Dog:\n    species = "Canis"\n\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f"{self.name}: Wang!"\n\n    def __str__(self):\n        return f"<Dog {self.name}>"\n\nd = Dog("Lucky")\nprint(d, d.bark(), Dog.species)\n'
  },
  {
    name:'异常处理',
    code:'def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("除数不能为 0")\n        return None\n    finally:\n        print("-- divide 调用结束 --")\n\nprint(divide(10, 2))\nprint(divide(10, 0))\n'
  },
  {
    name:'文件读写',
    code:'import io, json\n\n# 浏览器沙箱内没有本地磁盘，用内存文件演示\nbuf = io.StringIO()\nbuf.write("line1\\nline2\\n")\nprint("文件内容:", repr(buf.getvalue()))\n\ndata = {"lang": "Python", "level": "beginner"}\ns = json.dumps(data, ensure_ascii=False)\nprint("JSON:", s)\nprint("解析:", json.loads(s))\n'
  },
  {
    name:'交互式 input()',
    code:'# 在左侧「标准输入」框里每行填一个值\nname = input("你的名字: ")\nage = int(input("你的年龄: "))\nprint(f"{name} 明年 {age + 1} 岁")\n'
  },
  {
    name:'常用标准库',
    code:'import math, random, datetime, collections\n\nprint("π =", round(math.pi, 4), " sqrt(16) =", math.sqrt(16))\nprint("随机:", random.choice(["A", "B", "C"]))\nprint("今天:", datetime.date.today())\nprint("计数:", collections.Counter("mississippi").most_common(2))\n'
  },
  {
    name:'生成器与迭代器',
    code:'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint("list:", list(countdown(5)))\nprint("next:", next(countdown(3)))\nprint("求和:", sum(x * x for x in range(1, 6)))\n'
  },
  {
    name:'装饰器',
    code:'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f"[{func.__name__}] 耗时 {time.perf_counter() - t0:.6f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n):\n    return sum(range(n))\n\nprint(slow_sum(100000))\n'
  }
];
