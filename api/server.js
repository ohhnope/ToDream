const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'text/html');

  // 读取本地文件
  fs.readFile('./data.json', (err, data) => {
    if (err) {
      // 如果读取文件出错，返回404错误
      res.writeHead(404);
      res.end('File not found!');
    } else {
      // 如果读取文件成功，返回文件内容
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
