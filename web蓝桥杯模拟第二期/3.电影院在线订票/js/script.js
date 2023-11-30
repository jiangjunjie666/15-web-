/* TODO: 
      1. 完成数据请求，生成电影名，价格以及座位情况
      2. 绑定点击事件，实现订票功能
 */

let data = {}
axios
  .get('../data.json')
  .then((res) => {
    console.log(res)
    data = res.data
    movieNameNode.innerHTML = data.name
    moviePriceNode.innerHTML = data.price
    //创建节点渲染数据
    data.seats.forEach((item) => {
      let row = document.createElement('div')
      row.className = 'row'
      item.forEach((item) => {
        let seat = document.createElement('div')
        seat.className = 'seat'
        row.appendChild(seat)
        if (item) {
          seat.classList.add('occupied')
        }
      })
      seatAreaNode.appendChild(row)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// 获取座位区域节点
const seatAreaNode = document.getElementById('seat-area')
// 获取电影名节点
const movieNameNode = document.getElementById('movie-name')
// 获取电影票价节点
const moviePriceNode = document.getElementById('movie-price')
// 获取已订电影票数量节点
const count = document.getElementById('count')
// 获取已订电影票总价节点
const total = document.getElementById('total')

// 获取所有座位节点
const seatNodes = document.querySelectorAll('.seat')
// 初始化已选择座位数和总价
let selectedSeatsCount = 0
let totalPrice = 0

// 监听座位点击事件
seatAreaNode.addEventListener('click', (event) => {
  const clickedSeat = event.target

  // 检查是否点击的是座位
  if (clickedSeat.classList.contains('seat') && !clickedSeat.classList.contains('occupied')) {
    // 切换座位的选中状态
    clickedSeat.classList.toggle('selected')

    // 更新已选择座位数和总价
    if (clickedSeat.classList.contains('selected')) {
      selectedSeatsCount++
      totalPrice += data.price
    } else {
      selectedSeatsCount--
      totalPrice -= data.price
    }

    // 更新显示
    updateDisplay()
  }
})

// 更新显示函数
function updateDisplay() {
  count.textContent = selectedSeatsCount
  total.textContent = `$${totalPrice.toFixed(0)}`
}
