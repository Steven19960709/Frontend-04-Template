const net = require('net')
class Request {
  constructor (options) {
    // 对options整理一下参数
    this.method = options.method || "GET"
    this.port = options.port || 80
    this.path = options.path || "/"
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers["Content-Type"]) {
      this.headers['Content-Type'] = "application/x-www-form-urlencoded"
    }
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText - JSON.stringify(this.body)
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    this.headers["Content-Length"] = this.bodyText.length
  }
  send (connection) {
    // 构造response，逐步受到信息。
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser
      if (connection) {
        connection.write(this.toString())
        console.log(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          console.log('listen is port', this.port)
          connection.write(this.toString())
        })
      }
      connection.on('data', (data) => {
        console.log(data.toString(), 'data')
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
          connection.end() // g关闭连接，避免程序出错之后仍然占用着连接
        }
      })
      connection.on('error', (err) => {
        reject(err)
        connection.end()
      })
    })
  }
  toString () {
    // \r\n 每个header是单独一行
    return `${this.method} ${this.path} HTTP/1.1\r
    ${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
    \r
    ${this.bodyText}`
  }
}

class ResponseParser {
  constructor () {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }
  get isFinished () {
    return this.bodyParser && this.bodyParser.isFinished
  }
  receive (string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }
  receiveChar(char) { // 用状态机实现
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') { // 空行
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          // chunked 为nodejs默认的返回
          this.bodyParser = new TrunkedBodyParser()
        }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) { // 临时状态
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }

}

void async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',
    headers: {
      ["X-foo2"]: "customed"
    },
    body: {
      name: 'jiabaoliang'
    }
  })
  let res = await request.send().catch((err) => {
    console.log(err)
  })
  console.log(res, 'res')
}()

