const http = require('http')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const data = require('../data.json')

const server = http.createServer((req, res) => {
  // 起始页路由处理
  if (req.url === '/') {
    // 读取 index.html 内容
    const indexPage = fs.readFileSync(path.join(__dirname, '../index.html'), {
      encoding: 'utf8'
    })

    // 将读取的 index.html 内容写入响应中，并返回给前端展示
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(indexPage)
    res.end()
  }
  // 个性化页面路由处理
  else if (req.url.startsWith('/customized')) {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      let { interested = [] } = qs.parse(body)
      // TODO: 补充个性化页面处理代码
      //1.读取文件
      const customizedPage = fs.readFileSync(path.join(__dirname, '../customized.html'), {
        encoding: 'utf8'
      })
      let indexHtml = ''

      if (interested.length === 0) {
        indexHtml = customizedPage.replace('<body></body>', `<body><div class="unselect">你还未选择任何感兴趣的标签！</div></body>`)
      } else {
        //2.首先查出所有的tag以及附带的tag (将interested转为数组)
        let tags = Array.isArray(interested) ? interested : [interested]
        tags.forEach((item) => {
          const found = data.find((foundData) => {
            return foundData.tag == item
          })
          //查出来后再去对比relevance
          if (found && found.tag != 'HTML5') {
            //小坑，
            found.relevance.forEach((relevance) => {
              if (!tags.includes(relevance)) {
                tags.push(relevance)
              }
            })
          }
        })
        let html = ''
        tags.forEach((item) => {
          const found = data.find((foundData) => {
            return foundData.tag == item
          })
          if (found) {
            html += `
            <div class="interest">
            <div class="tag">${found.tag}</div>
            <div>${found.content}</div>
            </div>`
          }
        })
        indexHtml = customizedPage.replace('<body></body>', `<body>${html}</body>`)
      }
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(indexHtml)
      res.end()
    })
  }
})

server.listen(8080, () => {
  console.log('server is running in port 8080')
})
