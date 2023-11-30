// 声明一个数组，包含了所有的拼图块数据
var puzzlePieces = [
  { src: './images/img1.png', id: 1 },
  { src: './images/img2.png', id: 2 },
  { src: './images/img3.png', id: 3 },
  { src: './images/img4.png', id: 4 },
  { src: './images/img5.png', id: 5 },
  { src: './images/img6.png', id: 6 },
  { src: './images/img7.png', id: 7 },
  { src: './images/img8.png', id: 8 },
  { src: './images/img9.png', id: 9 }
]

// 定义一个打乱数组的函数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// 使用定义的函数打乱拼图块数组
puzzlePieces = shuffleArray(puzzlePieces)

// 获取拼图容器元素
var container = document.getElementById('puzzle-container')

// 遍历拼图块数据数组
puzzlePieces.forEach(function (pieceData) {
  // 创建一个新的拼图块元素
  var piece = document.createElement('div')
  piece.classList.add('puzzle-piece')
  piece.setAttribute('draggable', 'true')

  // 创建一个新的图片元素
  var image = document.createElement('img')
  image.src = pieceData.src
  image.dataset.id = pieceData.id

  // 将图片元素添加到拼图块元素中
  piece.appendChild(image)

  // 将拼图块元素添加到父容器元素中
  container.appendChild(piece)
})

// 获取所有的拼图块元素，并转换为数组
const puzzleArray = Array.from(document.querySelectorAll('.puzzle-piece'))

// 获取成功消息元素
const successMessage = document.getElementById('success-message')

// 为每个拼图块元素添加拖拽事件监听器
puzzleArray.forEach((piece) => {
  piece.addEventListener('dragstart', dragStart)
  piece.addEventListener('dragover', dragOver)
  piece.addEventListener('drop', drop)
})

// 声明一个变量用来保存正在拖动的拼图块
let draggedPiece = null

// 定义开始拖动事件的处理函数
function dragStart(event) {
  draggedPiece = this
  event.dataTransfer.setData('text/plain', null)
}

// 定义在拖动过程中的处理函数，阻止默认行为
function dragOver(event) {
  event.preventDefault()
}

// 定义拖放事件的处理函数
function drop(event) {
  // 检查是否拖动的拼图块不是当前目标拼图块
  // draggedPiece 被拖动的拼图块元素。this 目标位置的拼图块元素。
  let num = 0
  if (draggedPiece !== this) {
    // TODO：待补充代码
    // 交换图片的 src 属性和 data-id 属性
    let tempSrc = draggedPiece.querySelector('img').src
    let tempDataId = draggedPiece.querySelector('img').dataset.id

    draggedPiece.querySelector('img').src = this.querySelector('img').src
    draggedPiece.querySelector('img').dataset.id = this.querySelector('img').dataset.id

    this.querySelector('img').src = tempSrc
    this.querySelector('img').dataset.id = tempDataId

    // 检查是否拼图成功
    puzzleArray.forEach((item, index) => {
      if (parseInt(item.children[0].getAttribute('data-id')) === index + 1) {
        num++
      }
    })
    if (num === 9) {
      successMessage.classList.remove('hide')
      successMessage.classList.add('show')
    } else {
      successMessage.classList.remove('show')
      successMessage.classList.add('hide')
    }
    // 重置正在拖动的拼图块
    draggedPiece = null
  }
}
