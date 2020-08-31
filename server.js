const http = require('http');
const app = require('./main.js');
const port = process.env.port || 8000;
const server = http.createServer();

server.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});
