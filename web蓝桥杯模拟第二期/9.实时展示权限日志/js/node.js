/**
 * 请完成下面的 TODO 部分，其他代码请勿改动
 */
const fs = require('fs')
const http = require('http')
const path = require('path')
const dataUrl = path.resolve(__dirname, '../data.json')
const loggerUrl = path.resolve(__dirname, '../logger.json')
// 获取唯一的id
function getLoggerId() {
  return Buffer.from(Date.now().toString()).toString('base64') + Math.random().toString(36).substring(2)
}

/**
 * 该方法统一了服务器返回的消息格式，并返回给客户端
 * @param {*} res 响应 response
 * @param {*} code 状态码，默认为 0 代表没有错误，如果有错误固定为 404
 * @param {*} msg 错误消息，固定为空字符串即可 ''
 * @param {*} data 响应体，为 js 对象，若 data 为 utf-8 编码时需要使用 eval(data) 处理
 */
function send(res, code, msg, data) {
  const responseObj = {
    code,
    msg,
    data
  }
  const da = JSON.stringify(responseObj)
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.write(da)
  res.end()
}

function handleStatic(res, pathName, part) {
  const content = fs.readFileSync(path.resolve(__dirname, pathName))
  let contentType = 'text/html'
  switch (part) {
    case 'css':
      contentType = 'text/css'
      break
    case 'js':
      contentType = 'text/js'
      break
  }
  res.writeHead(200, 'Content-Type', contentType)
  res.write(content)
  res.end()
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.url === '/') {
    handleStatic(res, '../index.html', '')
  } else if (req.url === '/css/index.css') {
    handleStatic(res, `..${req.url}`, 'css')
  } else if (req.url === '/js/index.js') {
    handleStatic(res, `..${req.url}`, 'js')
  } else if (req.url === '/js/axios.min.js') {
    handleStatic(res, `..${req.url}`, 'js')
  } else if (req.url === '/js/vue3.global.min.js') {
    handleStatic(res, `..${req.url}`, 'js')
  }

  if (req.method === 'GET' && req.url === '/users') {
    // TODO 处理获取文件内容的操作
    //读取data.json中的数据
    let fileContent = fs.readFileSync(dataUrl, 'utf-8')
    let data = JSON.parse(fileContent)
    if (fileContent) {
      //将读取到的数据转化为json格式
      //将json格式的数据响应给客户端
      send(res, 0, '', data)
    }
  } else if (req.method === 'PUT' && req.url === '/editUser') {
    let fileContent = fs.readFileSync(dataUrl, 'utf-8')
    let data = JSON.parse(fileContent)
    let body = ''
    req.on('readable', () => {
      let chunk = ''
      if (null !== (chunk = req.read())) {
        body += chunk
      }
    })
    req.on('end', () => {
      if (body) {
        // TODO 处理更改文件数据并将最新的文件数据响应给客户端
        //处理put请求
        let bodyData = JSON.parse(body)
        //修改data.json中的数据
        data.forEach((item) => {
          if (item.id == bodyData.id) {
            item.power = bodyData.power
          }
        })
        //存储文件数据到data.json中
        fs.writeFileSync(dataUrl, JSON.stringify(data))
        send(res, 0, '', data)
      }
    })
  } else if (req.method === 'POST' && req.url === '/logger') {
    let body = ''
    req.on('readable', () => {
      let chunk = ''
      if (null !== (chunk = req.read())) {
        body += chunk
      }
    })
    req.on('end', () => {
      let fileContentLog = fs.readFileSync(loggerUrl, 'utf-8')
      //判断是否有日志
      let dataLog = []
      if (fileContentLog) {
        dataLog = JSON.parse(fileContentLog)
      }
      let fileContentUser = fs.readFileSync(dataUrl, 'utf-8')
      let dataUser = JSON.parse(fileContentUser)
      if (body) {
        // TODO 处理新增日志
        let bodyData = JSON.parse(body)

        let dataJson = {
          id: getLoggerId(),
          msg: bodyData.data,
          // 时间格式为：2023/6/6 上午8:10:35
          time: `${getTime()}`
        }
        //存储日志
        dataLog.unshift(dataJson)
        // 并在该对象转化成 JSON 格式的末尾添加换行符（如不添加换行符会导致检测不通过)
        fs.writeFileSync(loggerUrl, JSON.stringify(dataLog, null, 2) + '\n')
        send(res, 0, '', dataJson)
      }
    })
  }
})

function getTime() {
  // 获取当前时间
  const currentDate = new Date()
  // 获取年、月、日、时、分、秒
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // 月份是从 0 开始的，所以要加 1
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  //获取是上午还是下午
  const amPm = hours >= 12 ? '下午' : '上午'
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  // 格式化时间
  const formattedTime = `${year}/${month}/${day} ${amPm}${hours}:${minutes}:${seconds}`
  return formattedTime
}

server.listen(8080, () => {
  console.log('Server running on port 8080')
})
