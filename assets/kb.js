/* ============================================================
 * 离线知识库 —— 未配置大模型时的兜底回答
 * 匹配方式：对问题做关键词打分，取最高分条目
 * ============================================================ */
window.KB = [
{
  q:'Python 环境怎么装？',
  k:['安装','环境','配置','下载','install','环境搭建','python装','怎么装'],
  a:`## 安装 Python

1. 打开 **python.org/downloads** 下载 3.11+ 版本
2. Windows 安装时**务必勾选 "Add Python to PATH"**
3. 安装完成后终端验证：

\`\`\`bash
python --version
pip --version
\`\`\`

## 推荐搭配

- **编辑器**：VS Code + Python 插件
- **虚拟环境**：每个项目独立，避免依赖打架

\`\`\`bash
python -m venv .venv
.venv\\Scripts\\activate   # Windows
source .venv/bin/activate # macOS / Linux
\`\`\``
},
{
  q:'list 和 tuple 有什么区别？',
  k:['列表','元组','list','tuple','区别','不可变','可变'],
  a:`## 核心区别：可变性

| 特性 | list | tuple |
|---|---|---|
| 可变 | ✅ 可增删改 | ❌ 创建后不可变 |
| 语法 | \`[1, 2, 3]\` | \`(1, 2, 3)\` |
| 性能 | 稍慢、占内存多 | 更快、更省 |
| 可作字典键 | ❌ | ✅ |

\`\`\`python
a = [1, 2, 3]
a[0] = 99        # OK

b = (1, 2, 3)
b[0] = 99        # TypeError

d = {(1, 2): "坐标"}  # tuple 可以当键
\`\`\`

**使用建议**：数据会被修改用 \`list\`；固定配置、函数多返回值、字典键用 \`tuple\`。`
},
{
  q:'*args 和 **kwargs 是什么？',
  k:['args','kwargs','可变参数','不定参数','参数','星号'],
  a:`让函数接收**任意数量**的参数：

\`\`\`python
def f(a, *args, **kwargs):
    print(a)       # 1
    print(args)    # (2, 3)      多余的位置参数 → 元组
    print(kwargs)  # {'x': 10}   多余的关键字参数 → 字典

f(1, 2, 3, x=10)
\`\`\`

**拆包**（反过来用）：

\`\`\`python
def add(x, y): return x + y

add(*[1, 2])        # 3，列表拆成位置参数
add(**{'x':1,'y':2})# 3，字典拆成关键字参数
\`\`\`

⚠️ 顺序固定：\`位置参数 → *args → 默认参数 → **kwargs\``
},
{
  q:'什么是列表推导式？',
  k:['推导式','列表推导','comprehension','一行','简洁'],
  a:`把「循环 + 判断 + 收集」压缩成一行：

\`\`\`python
# 传统写法
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x ** 2)

# 推导式
squares = [x ** 2 for x in range(10) if x % 2 == 0]
\`\`\`

**三种形式**：

\`\`\`python
[x * 2 for x in range(5)]              # 列表 → [0,2,4,6,8]
{x: x**2 for x in range(3)}            # 字典 → {0:0, 1:1, 2:4}
{x for x in 'aab'}                     # 集合 → {'a','b'}
(x * 2 for x in range(5))              # 生成器，不占内存
\`\`\`

⚠️ 嵌套超过两层就该拆成普通循环，可读性优先。`
},
{
  q:'is 和 == 有什么区别？',
  k:['is','等于','==','区别','比较','身份'],
  a:`- \`==\` 比较**值**是否相等
- \`is\` 比较**是不是同一个对象**（内存地址）

\`\`\`python
a = [1, 2]; b = [1, 2]
a == b   # True  值相同
a is b   # False 两个不同的对象

c = a
c is a   # True  同一个对象
\`\`\`

**判断 None 必须用 is**：

\`\`\`python
if x is None:      # ✅ 正确
if x == None:      # ❌ 不推荐
\`\`\`

⚠️ 小整数（-5~256）和短字符串有缓存机制，\`is\` 的结果可能是 True，别依赖这个行为。`
},
{
  q:'深拷贝和浅拷贝的区别？',
  k:['拷贝','复制','copy','deepcopy','浅拷贝','深拷贝','引用'],
  a:`嵌套结构下差别巨大：

\`\`\`python
import copy

a = [[1, 2], [3, 4]]

b = copy.copy(a)       # 浅拷贝：只复制最外层
c = copy.deepcopy(a)   # 深拷贝：递归复制所有层

b[0].append(99)
print(a)  # [[1, 2, 99], [3, 4]]  ← 原数据被改了！

d = copy.deepcopy(a)
d[0].append(0)
print(a)  # 不变
\`\`\`

| 方式 | 嵌套对象 | 速度 |
|---|---|---|
| \`b = a\` | 完全共享 | 最快 |
| \`list(a)\` / \`a[:]\` / \`copy.copy\` | 只复制一层 | 快 |
| \`copy.deepcopy\` | 全部复制 | 慢 |`
},
{
  q:'__init__ 和 __new__ 的区别？',
  k:['init','new','构造','魔法方法','初始化','类'],
  a:`- \`__new__\`：负责**创建对象**（分配内存），返回实例，是真正的构造方法
- \`__init__\`：负责**初始化对象**（填属性），不返回值

\`\`\`python
class A:
    def __new__(cls, *args, **kwargs):
        print("1. 创建")
        return super().__new__(cls)

    def __init__(self, x):
        print("2. 初始化")
        self.x = x

A(1)  # 打印 1. 创建 → 2. 初始化
\`\`\`

**日常几乎用不到 \`__new__\`**，除了两个场景：
1. 实现**单例模式**
2. 继承不可变类型（如 \`str\`、\`tuple\`）做定制`
},
{
  q:'迭代器和生成器是什么？',
  k:['迭代器','生成器','yield','iterator','generator','惰性'],
  a:`**迭代器**：实现 \`__iter__\` + \`__next__\`，可以用 \`next()\` 一个个取值。

**生成器**：用 \`yield\` 写的函数，自动生成迭代器，且**惰性求值**（用多少算多少，不占内存）。

\`\`\`python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        yield a        # 暂停在这里，下次继续
        a, b = b, a + b

print(list(fib(10)))
\`\`\`

**为什么省内存**：

\`\`\`python
sum([x*x for x in range(10**8)])  # ❌ 先建 1 亿个元素的列表，爆内存
sum(x*x for x in range(10**8))    # ✅ 生成器，内存占用恒定
\`\`\`

**生成器表达式**就是把 \`[]\` 换成 \`()\`。`
},
{
  q:'装饰器怎么理解？',
  k:['装饰器','decorator','@','语法糖','包装'],
  a:`装饰器 = **接收函数、返回函数**的高阶函数，用来给原函数加功能而不改它的代码。

\`\`\`python
def log(func):
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log                     # 等价于：add = log(add)
def add(a, b):
    return a + b

add(1, 2)   # 打印"调用 add" → 3
\`\`\`

**必须记住的两点**：
1. 用 \`*args, **kwargs\` 透传参数
2. 用 \`functools.wraps(func)\` 保留原函数的名字和文档

\`\`\`python
from functools import wraps

def log(func):
    @wraps(func)          # 不加这行，add.__name__ 会变成 'wrapper'
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
\`\`\``
},
{
  q:'GIL 是什么？影响多线程吗？',
  k:['gil','多线程','并发','thread','锁','性能'],
  a:`**GIL（全局解释器锁）**：CPython 中同一时刻只允许一个线程执行 Python 字节码。

**影响**：
- CPU 密集型（计算、图像处理）：多线程**无法**利用多核 → 用 \`multiprocessing\` 或 \`concurrent.futures.ProcessPoolExecutor\`
- IO 密集型（网络请求、文件读写）：多线程**依然有效**，因为等待 IO 时会释放 GIL

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# IO 密集 → 线程池
with ThreadPoolExecutor(max_workers=10) as ex:
    ex.map(fetch_url, urls)

# CPU 密集 → 进程池
with ProcessPoolExecutor() as ex:
    ex.map(heavy_compute, data)
\`\`\`

> 补充：Python 3.13 起可实验性关闭 GIL（free-threaded 构建）。`
},
{
  q:'怎么读取和写入文件？',
  k:['文件','读写','open','读取','写入','file','txt','csv'],
  a:`用 \`with\` 语句（自动关闭文件，不写会泄漏资源）：

\`\`\`python
# 读
with open('data.txt', encoding='utf-8') as f:
    content = f.read()          # 全部读成字符串
    # lines = f.readlines()     # 读成列表
    # for line in f: ...        # 逐行，最省内存

# 写（'w' 覆盖 / 'a' 追加）
with open('out.txt', 'w', encoding='utf-8') as f:
    f.write('hello\\n')

# 追加
with open('out.txt', 'a', encoding='utf-8') as f:
    f.write('world\\n')
\`\`\`

**常见模式**：

\`\`\`python
import json, csv, pathlib

json.dump(data, open('a.json','w'), ensure_ascii=False, indent=2)
data = json.load(open('a.json', encoding='utf-8'))

p = pathlib.Path('data.txt')
p.write_text('hi', encoding='utf-8')
print(p.read_text(encoding='utf-8'))
\`\`\`

⚠️ 一定要写 \`encoding='utf-8'\`，Windows 默认 GBK 会乱码。`
},
{
  q:'try / except 怎么正确使用？',
  k:['异常','报错','try','except','错误','raise','捕获','finally'],
  a:`\`\`\`python
try:
    value = int(user_input)
except ValueError:              # 只捕获具体异常，别用裸 except
    print("请输入数字")
except Exception as e:          # 兜底，记录日志
    print(f"未知错误: {e}")
else:
    print("没出错才执行")
finally:
    print("无论如何都执行，常用于关闭资源")
\`\`\`

**四条原则**：
1. **别捕获所有异常后静默**——至少 \`logging.exception(e)\`
2. **异常类型从具体到宽泛**
3. 主动抛错用 \`raise ValueError("x 必须大于 0")\`
4. 自定义异常继承 \`Exception\`

\`\`\`python
class MyError(Exception):
    pass

def check(x):
    if x < 0:
        raise MyError("不能为负数")
\`\`\``
},
{
  q:'pip 安装包很慢 / 失败怎么办？',
  k:['pip','安装','慢','镜像','源','装不上','包','依赖'],
  a:`**换国内镜像**（临时）：

\`\`\`bash
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
\`\`\`

**永久配置**：

\`\`\`bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
\`\`\`

**其他常用命令**：

\`\`\`bash
pip install -r requirements.txt   # 按清单装
pip freeze > requirements.txt     # 导出环境
pip install package==1.2.3        # 指定版本
pip uninstall package
pip list --outdated               # 查看可升级
\`\`\`

**权限报错**加 \`--user\`，或用虚拟环境（推荐）。`
},
{
  q:'中文乱码怎么解决？',
  k:['乱码','中文','编码','utf-8','gbk','encode','decode','unicode'],
  a:`**三条铁律**：

1. **读写文件必写 \`encoding='utf-8'\`**
2. **JSON 序列化加 \`ensure_ascii=False\`**
3. **源码文件保存为 UTF-8**

\`\`\`python
with open('a.txt', encoding='utf-8') as f:
    text = f.read()

import json
json.dumps({'name':'张三'}, ensure_ascii=False)  # 否则变成 \\u5f20\\u4e09
\`\`\`

**编码/解码**：

\`\`\`python
'中文'.encode('utf-8')              # 字符串 → 字节 b'\\xe4\\xb8\\xad...'
b'\\xe4\\xb8\\xad'.decode('utf-8')    # 字节 → 字符串 '中'
\`\`\`

**Windows 终端乱码**：

\`\`\`bash
chcp 65001     # 切到 UTF-8 代码页
\`\`\``
},
{
  q:'怎么统计代码运行时间？',
  k:['计时','耗时','性能','time','profile','慢','优化','基准'],
  a:`**快速计时**：

\`\`\`python
import time

t0 = time.perf_counter()
do_something()
print(f"耗时 {time.perf_counter() - t0:.4f}s")
\`\`\`

**用 timeit 做基准测试**（自动多次运行取平均，更准）：

\`\`\`python
import timeit
timeit.timeit('"-".join(str(n) for n in range(100))', number=10000)
\`\`\`

Jupyter / IPython 里直接：

\`\`\`python
%%timeit
sum(range(1000))
\`\`\`

**找瓶颈**用 cProfile：

\`\`\`python
import cProfile
cProfile.run('main()')
\`\`\`

**常见提速点**：用 \`join\` 代替循环拼接字符串、用集合代替列表做 \`in\` 判断、用生成器处理大数据。`
},
{
  q:'if __name__ == "__main__" 是什么意思？',
  k:['main','name','入口','模块','导入','执行'],
  a:`区分「被直接运行」和「被 import」两种情况：

\`\`\`python
# mymodule.py
def main():
    print("程序启动")

if __name__ == "__main__":     # 直接运行本文件时才为 True
    main()
\`\`\`

| 执行方式 | \`__name__\` | 是否调用 main() |
|---|---|---|
| \`python mymodule.py\` | \`'__main__'\` | ✅ |
| \`import mymodule\` | \`'mymodule'\` | ❌ |

**作用**：
1. 让文件既能当脚本跑，又能被安全导入
2. 把测试代码放这里，导入时不会执行
3. \`multiprocessing\` 在 Windows 下**必须**加，否则子进程会重复启动`
},
{
  q:'怎么把代码打包成 exe？',
  k:['打包','exe','pyinstaller','分发','发布','可执行'],
  a:`用 **PyInstaller**（最常用）：

\`\`\`bash
pip install pyinstaller

pyinstaller -F -w main.py        # -F 单文件 / -w 无控制台窗口
pyinstaller -F -i icon.ico main.py
\`\`\`

产物在 \`dist/\` 目录。

**常见问题**：

- **文件太大**：用虚拟环境，只装必要依赖
- **缺 dll / 数据文件**：加 \`--add-data "data;data"\`
- **杀软误报**：换 Nuitka 或签名
- **反编译风险**：加 \`--key\` 效果有限，机密逻辑放服务端

**现代替代方案**：

\`\`\`bash
pip install nuitka      # 编译成 C，体积小、启动快
pip install briefcase   # 跨平台官方打包
\`\`\``
},
{
  q:'虚拟环境有什么用？',
  k:['虚拟环境','venv','conda','隔离','依赖','环境'],
  a:`**解决"我电脑上能跑，别人电脑上跑不了"**——每个项目独立的依赖空间。

\`\`\`bash
# 创建
python -m venv .venv

# 激活
.venv\\Scripts\\activate      # Windows
source .venv/bin/activate    # macOS / Linux

# 激活后命令行前面会出现 (.venv)
pip install requests         # 只装进这个环境
pip freeze > requirements.txt

# 退出
deactivate
\`\`\`

**conda**（数据科学方向更常见）：

\`\`\`bash
conda create -n myenv python=3.11
conda activate myenv
\`\`\`

**现代选择**：\`uv\` 或 \`poetry\`，依赖锁定 + 速度更快。

\`\`\`bash
pip install uv
uv venv && uv pip install requests
\`\`\``
},
{
  q:'Python 学习路线怎么安排？',
  k:['学习','路线','怎么学','入门','进阶','顺序','建议','计划'],
  a:`## 四阶段路线

**1️⃣ 基础（1-2 周）**
变量/类型 → 运算符 → 条件循环 → 函数 → 字符串/列表/字典/集合 → 文件读写

**2️⃣ 进阶（2-3 周）**
面向对象 → 异常处理 → 模块与包 → 迭代器/生成器 → 装饰器 → 常用标准库（os/json/re/datetime）

**3️⃣ 实战（1-2 月）**
- 爬虫：requests + BeautifulSoup / playwright
- 数据分析：pandas + matplotlib
- Web：FastAPI / Flask + SQLAlchemy
- 自动化：批量处理文件、办公自动化

**4️⃣ 深入（持续）**
并发编程 → 性能优化 → 设计模式 → C 扩展 → 源码阅读

## 建议

- **每天写代码，哪怕 30 分钟**，看十遍不如敲一遍
- **做完整小项目**，不要只刷语法题
- **读优秀开源代码**，比如 requests 的源码
- **善用官方文档**：docs.python.org/zh-cn

> 本应用左侧「练习题库」覆盖了阶段 1-2 的核心考点，建议边学边刷。`
},
{
  q:'字典 dict 有哪些常用操作？',
  k:['字典','dict','键值对','操作','map','get','遍历'],
  a:`\`\`\`python
d = {'a': 1, 'b': 2}

# 增改
d['c'] = 3
d.update({'d': 4, 'a': 100})

# 查（推荐 get，键不存在不报错）
d.get('x', 0)        # 不存在返回默认值 0
d.setdefault('y', []) # 不存在则设为空列表并返回

# 删
d.pop('a')           # 删除并返回值
d.pop('x', None)     # 安全删除
del d['b']

# 遍历
for k, v in d.items(): ...
for k in d: ...

# 排序
dict(sorted(d.items(), key=lambda x: -x[1]))

# 合并（3.9+）
merged = d1 | d2
\`\`\`

**常用技巧**：

\`\`\`python
from collections import defaultdict, Counter

groups = defaultdict(list)      # 访问不存在的键自动创建 []
groups['a'].append(1)

Counter('mississippi').most_common(2)   # [('s', 4), ('i', 4)]
\`\`\``
},
{
  q:'为什么我的代码报 IndentationError？',
  k:['缩进','indentation','报错','空格','tab','错误'],
  a:`Python 用**缩进**表示代码块，这是最常见的入门报错。

**三个原因**：

1. **混用了空格和 Tab**（最常见）
2. 该缩进的地方没缩进（\`for\` / \`if\` / \`def\` 后面）
3. 缩进层级不一致

\`\`\`python
# ❌ 错误
def f():
print("hi")          # 函数体没缩进

# ✅ 正确
def f():
    print("hi")
\`\`\`

**解决办法**：
- 编辑器设置：**Tab 自动转成 4 个空格**
- VS Code：设置里搜 \`insertSpaces\`，勾上；\`tabSize\` 设为 4
- 用 \`python -m tabnanny yourfile.py\` 检查混用

> 本应用的代码编辑器已默认把 Tab 转成 4 空格。`
}
];
