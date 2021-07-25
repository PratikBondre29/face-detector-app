// here we'll create a server

const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello Pratik</h1>");
});

server.listen(3001);
console.log("server has been started");
