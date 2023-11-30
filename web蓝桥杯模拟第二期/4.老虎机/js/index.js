// 获取DOM元素对象
const sevenFirst = document.getElementById('sevenFirst') // 第一列图片容器
const sevenSecond = document.getElementById('sevenSecond') // 第二列图片容器
const sevenThird = document.getElementById('sevenThird') // 第三列图片容器
const random1 = document.getElementById('random1')
const random2 = document.getElementById('random2')
const random3 = document.getElementById('random3')
const startBtn = document.querySelector('.startBtn') // 开始按钮
const textPanel = document.querySelector('.textPanel') // 中奖文字框
// 设置一个全局变量，用来存放图片
window.lotteryImages = ['./images/point-1.png', './images/point-2.png', './images/point-3.png', './images/point-4.png', './images/point-5.png', './images/point-6.png', './images/point-7.png']
class Game {
  constructor() {
    this.images = window.lotteryImages
    // 第一栏水果数量
    this.FirstRandom = 40
    this.SecondRandom = this.FirstRandom + 2
    this.ThirdRandom = this.SecondRandom + 2
    // 每一张水果图片高度
    this.heightPic = 271
    this.Generate()
  }
  // 生成三列水果排列
  Generate() {
    let randomNum = 0
    // 第一列
    for (let i = 0; i < this.FirstRandom; i++) {
      randomNum = this.Random(0, this.images.length)
      let path = this.images[randomNum]
      let tmp = path.split('-')
      let num = tmp[1].replace('.png', '')
      sevenFirst.innerHTML += '<li class="item" data-point="' + num + '"><img src="' + path + '"></li>'
    }
    sevenFirst.style.height = this.heightPic * this.FirstRandom + 'px'
    sevenFirst.style.marginTop = -(this.heightPic * this.FirstRandom - this.heightPic) + 'px'
    // 第二列
    for (let i = 0; i < this.SecondRandom; i++) {
      randomNum = this.Random(0, this.images.length)
      let path = this.images[randomNum]
      let tmp = path.split('-')
      let num = tmp[1].replace('.png', '')
      sevenSecond.innerHTML += '<li class="item" data-point="' + num + '"><img src="' + path + '"></li>'
    }
    sevenSecond.style.height = this.heightPic * this.SecondRandom + 'px'
    sevenSecond.style.marginTop = -(this.heightPic * this.SecondRandom - this.heightPic) + 'px'
    // 第三列
    for (let i = 0; i < this.ThirdRandom; i++) {
      randomNum = this.Random(0, this.images.length)
      let path = this.images[randomNum]
      let tmp = path.split('-')
      let num = tmp[1].replace('.png', '')
      sevenThird.innerHTML += '<li class="item" data-point="' + num + '"><img src="' + path + '"></li>'
    }
    sevenThird.style.height = this.heightPic * this.ThirdRandom + 'px'
    sevenThird.style.marginTop = -(this.heightPic * this.ThirdRandom - this.heightPic) + 'px'
  }
  // 随机数
  Random(start, length) {
    return Math.floor(Math.random() * (length - start)) + start
  }
  // 初始化页面内容
  Init() {
    sevenFirst.innerHTML = ''
    sevenSecond.innerHTML = ''
    sevenThird.innerHTML = ''
  }
  // 开始
  Spin() {
    this.Init()
    this.Generate()
    let random = this.Random(10, this.FirstRandom - 20)
    let r2 = random + 2
    let r3 = random + 6
    setTimeout(() => {
      sevenFirst.style.height = this.heightPic * random + this.heightPic + 'px'
      sevenFirst.style.marginTop = -(this.heightPic * random) + 'px'

      sevenSecond.style.height = this.heightPic * r2 + this.heightPic + 'px'
      sevenSecond.style.marginTop = -(this.heightPic * r2) + 'px'

      sevenThird.style.height = this.heightPic * r3 + this.heightPic + 'px'
      sevenThird.style.marginTop = -(this.heightPic * r3) + 'px'
    }, 1000)
    // 滚动动画
    sevenFirst.animate([{ marginTop: -this.heightPic * random + 'px' }], {
      duration: random * 100
    })
    sevenSecond.animate([{ marginTop: -this.heightPic * r2 + 'px' }], {
      duration: r2 * 100
    })
    sevenThird.animate([{ marginTop: -this.heightPic * r3 + 'px' }], {
      duration: r3 * 100
    })
    // 检测使用，请勿删除
    random1.value = random
    random2.value = r2
    random3.value = r3
    this.GetResult(random + 1, r2 + 1, r3 + 1)
  }
  // GetResult 中奖结果函数，r1,r2,r3 为最后图片停留位置，以第一列为例，最终显示的元素是 sevenFirst 下的第 r 个 li 元素。
  GetResult(r1, r2, r3) {
    // TODO 待补充代码
    if (sevenFirst.children[r1 - 1].getAttribute('data-point') == sevenSecond.children[r2 - 1].getAttribute('data-point') && sevenFirst.children[r1 - 1].getAttribute('data-point') == sevenThird.children[r3 - 1].getAttribute('data-point')) {
      textPanel.innerHTML = '恭喜你，中奖了'
    } else {
      textPanel.innerHTML = '很遗憾，未中奖'
    }
    console.log(sevenFirst.children[r1 - 1])
    console.log(sevenFirst.children[r1 - 1].getAttribute('data-point'))
    console.log(sevenSecond.children[r2 - 1])
    console.log(sevenSecond.children[r2 - 1].getAttribute('data-point'))
    console.log(sevenThird.children[r3 - 1])
    console.log(sevenThird.children[r3 - 1].getAttribute('data-point'))
  }
}
let game = new Game() // 实例化
startBtn.addEventListener('click', () => {
  game = new Game()
  game.Spin()
})
