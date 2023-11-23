// 获取一个随机数，用于生成随机位置的蛋
function getRandom(rate) {
  return Math.floor(Math.random() * rate)
}

// 定义蛇类
class Snake {
  constructor(snakeBody, size, direction) {
    this.direction = direction // 初始化蛇的方向
    this.size = size // 初始化蛇的大小
    // 初始化蛇的身体，将传入的坐标乘以大小
    this.snakeBody =
      snakeBody.length > 0 &&
      snakeBody.map((pos) => ({
        left: pos.left * size,
        top: pos.top * size
      }))
  }

  // 渲染蛇
  render() {
    let template = ''
    let transformDeg = 0
    switch (this.direction) {
      case 'right':
        transformDeg = 0
        break
      case 'down':
        transformDeg = 90
        break
      case 'left':
        transformDeg = 180
        break
      case 'up':
        transformDeg = -90
        break
    }
    return this.snakeBody.reduce((prev, next, currentIndex) => {
      if (currentIndex === 0) {
        template = prev + `<div class="snake-head snake" style="left:${next.left}px;top:${next.top}px;border-width:${this.size / 2}px;transform: rotate(${transformDeg}deg);"></div>\n`
      } else {
        template = prev + `<div class="snake-body snake" style="left:${next.left}px;top:${next.top}px;width:${this.size}px;height:${this.size}px;transform: rotate(${transformDeg}deg);"></div>`
      }
      return template
    }, '')
  }

  // 移动蛇的头部
  nextStep() {
    // TODO：待补充代码
    const snake = this.snakeBody
    const head = { ...snake[0] }
    switch (this.direction) {
      case 'right':
        head.left += this.size
        break
      case 'down':
        head.top += this.size
        break
      case 'left':
        head.left -= this.size
        break
      case 'up':
        head.top -= this.size
        break
    }
    this.snakeBody.unshift(head) // 在头部插入新坐标
    this.snakeBody.pop() // 删除尾部坐标
    this.render() // 重新渲染蛇身体
  }

  // 增加蛇的长度
  snakeGrowUp() {
    let snake = this.snakeBody
    let lens = snake.length
    let snakeTail
    const prev = snake[lens - 2] // 蛇尾部倒数第二个
    const next = snake[lens - 1] // 蛇尾部倒数第一个
    if (prev.top === next.top && prev.left < next.left) {
      // 向左运动
      snakeTail = { ...next, left: next.left + this.size }
    } else if (prev.top === next.top && prev.left > next.left) {
      // 向右运动
      snakeTail = { ...next, left: next.left - this.size }
    } else if (prev.left === next.left && prev.top > next.top) {
      // 向下运动
      snakeTail = { ...next, top: next.top - this.size }
    } else {
      // 向上运动
      snakeTail = { ...next, top: next.top + this.size }
    }
    this.snakeBody.push(snakeTail) // 添加新尾部
    this.render() // 重新渲染蛇身体
  }

  // 判断蛇是否撞到墙壁或自身
  isArriveWall() {
    const snake = this.snakeBody
    let isEnd
    // 判断是否撞墙
    if (snake[0].left >= this.size * MAPSIZE || snake[0].top >= this.size * MAPSIZE || snake[0].left < 0 || snake[0].top < 0) {
      isEnd = true
    }
    // 判断是否撞自己
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].left === snake[i].left && snake[0].top === snake[i].top) {
        isEnd = true
        break
      }
    }
    return isEnd
  }

  // 改变蛇的方向
  changeSnakeDirection(direction) {
    this.direction = direction
  }
}

// 定义蛋类
class Egg {
  constructor(size) {
    this.position = { left: 3 * size, top: 0 * size } // 初始化蛋的位置
    this.size = size // 初始化蛋的大小
  }

  // 渲染蛋
  render() {
    const div = document.createElement('div')
    div.innerHTML = `<div class='egg' style="left:${this.position.left}px;top:${this.position.top}px;width:${this.size}px;height:${this.size}px">`
    return div.children[0]
  }

  // 更新蛋的位置
  flushed() {
    this.position = { left: getRandom(MAPSIZE) * this.size, top: getRandom(MAPSIZE) * this.size }
  }
}

// 判断蛇是否吃到蛋
function isArriveEgg(snake, egg) {
  const snakeBody = snake.snakeBody
  return snakeBody[0].left === egg.position.left && snakeBody[0].top === egg.position.top
}

const MAPSIZE = 30 // 地图大小
let timer

// 初始化游戏
function init(app) {
  const snake = new Snake(
    [
      { left: 2, top: 0 },
      { left: 1, top: 0 },
      { left: 0, top: 0 }
    ],
    20
  )
  const egg = new Egg(20)
  render(app, snake, egg)
  let direction
  // 监听键盘事件，控制蛇的方向
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key.toLocaleLowerCase() === 'w') {
      direction != 'down' && (direction = 'up')
    } else if (e.key === 'ArrowDown' || e.key.toLocaleLowerCase() === 's') {
      direction != 'up' && (direction = 'down')
    } else if (e.key === 'ArrowRight' || e.key.toLocaleLowerCase() === 'd') {
      direction != 'left' && (direction = 'right')
    } else if (e.key === 'ArrowLeft' || e.key.toLocaleLowerCase() === 'a') {
      direction != 'right' && (direction = 'left')
    } else {
      return
    }
    snake.changeSnakeDirection(direction)
    timer && clearInterval(timer)
    direction && autoMove(app, snake, egg)
  })
}

// 自动移动蛇
function autoMove(app, snake, egg) {
  timer = setInterval(() => {
    snake.nextStep()
    if (isArriveEgg(snake, egg)) {
      snake.snakeGrowUp()
      egg.flushed()
    }
    // 判断是否撞墙
    if (snake.isArriveWall()) {
      endGame(app, snake)
    } else {
      render(app, snake, egg)
    }
  }, Math.floor(1000 / 5))
}

// 渲染游戏界面
function render(app, snake, egg) {
  const snakeTemplate = snake.render()
  const eggDom = egg.render()
  app.innerHTML = snakeTemplate
  app.appendChild(eggDom)
}

// 游戏结束
function endGame(App, snake) {
  timer && clearInterval(timer)
  const div = document.createElement('div')
  div.innerHTML = `<div class="cover">
        <div class="content">游戏结束，得分${snake.snakeBody.length - 3}</div>
    </div>`
  const endGameDom = div.children[0]
  App.parentNode.appendChild(endGameDom)
  endGameDom.addEventListener('click', () => {
    App.parentNode.removeChild(endGameDom)
    init(App)
  })
}
