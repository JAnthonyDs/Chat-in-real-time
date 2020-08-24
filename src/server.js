const express = require('express')
const path = require('path')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname,'..','public')))

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

let messages = [];

io.on('connection', (socket) => {
    console.log('user connected')

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', (msg) => {
      messages.push(msg)
      socket.broadcast.emit('receivedMessage',msg)
    });
});

http.listen(3333,() =>{
    console.log('Server running')
})