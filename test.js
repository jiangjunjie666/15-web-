const arr = ['Python']

const courses = [
  {
    tag: 'Linux',
    relevance: ['C++', 'Java'],
    content: '本课程教你如何熟练地使用 Linux，本实验中通过在线动手实验的方式学习 Linux 常用命令，用户与权限管理，目录结构与文件操作，环境变量，计划任务，管道与数据流重定向等基本知识点。'
  },
  {
    tag: 'C++',
    relevance: [],
    content: 'C 语言是面向过程的程序设计语言，而 C++ 语言是由 C 语言演变而来的一种面向对象的程序设计语言。课程实验内容从 C++ 语言的概念开始，通过理论学习和实验操作，初步熟知 C++ 语言。'
  },
  {
    tag: 'Python',
    relevance: ['Java'],
    content: '极度舒适的新手入门课程，面向完全没有编程基础的同学。你将在一下午入门 Linux、Python 基础和Github 常用命令，为未来的编程大楼打下稳固的基础。'
  },
  {
    tag: '微信公众号',
    relevance: ['JavaScript'],
    content: '微信已成为很多人生活的一部分，在庞大用户量的基础下，微信公众号开发也变得热门了。本课程带领大家从 0 到 1 进行微信公众号开发。'
  },
  {
    tag: 'JavaScript',
    relevance: ['HTML5', 'CSS3'],
    content: '课程从什么是 JavaScript 开始，一步步讲解 JavaScript 基础语法、关键特性、JSON、WebAPI 等知识点。内容将会涉及网页窗口交互的方法以及通过 DOM 进行网页元素的相关操作。'
  },
  {
    tag: 'HTML5',
    relevance: ['CSS3', 'JavaScript'],
    content: 'HTML 超文本标记语言是构成 Web 世界的一砖一瓦，它定义了网页内容的含义和结构。课程将从网站的基础概念开始，带你了解其运行机制。然后，我们会学习 HTML 基础知识，了解各种常用标签的意义以及基本用法。此外，课程还会涉及 HTML5 的内容，这是 HTML 的最新标准，它添加了一些新的语法特征。'
  },
  {
    tag: 'CSS3',
    relevance: ['HTML5', 'JavaScript'],
    content: 'CSS 层叠样式表用来描述 HTML 文档的呈现，是前端开发过程中一项重要的知识技能。课程从最基本的 CSS 概念开始，逐步深入，教你学会如何使用 CSS 同时控制多重网页的样式和布局。同时，课程还会涉及最新版本 CSS3 的内容，带你掌握新的标准化组件。'
  },
  {
    tag: 'Java',
    relevance: ['Python'],
    content:
      '本课程作为 Java 编程的入门内容，是每个 Java 初学者都必须掌握的基础知识。课程从常量与变量、运算符、流程控制、数组和方法等 Java 基础语法开始，层层递进，逐步带你认识了解如何通过 Java 实现面向对象的三大特征继承、封装，多态。同时，课程还会涉及 Java 中常用类、字符串、集合框架和异常处理的相关操作使用。'
  }
]

arr.forEach((language) => {
  const foundCourse = courses.find((course) => course.tag === language)

  if (foundCourse) {
    foundCourse.relevance.forEach((relatedLanguage) => {
      if (!arr.includes(relatedLanguage)) {
        arr.push(relatedLanguage)
      }
    })
  }
})

console.log(arr)
