const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const { v4: uuidv4 } = require('uuid');

io.on("connection", (socket) => {
    console.log('a user connected', socket.id);

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })

});

app.use(express.static("./public"));
app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
})

server.listen(9000, () => { console.log('listening on *:9000') });