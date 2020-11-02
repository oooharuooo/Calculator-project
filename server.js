const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(3000, () => console.log("listening on port 3000"))

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

// Find the callback from user
io.on("connection", (socket) => {
    // Use data from user and pass it back
    socket.on("user",(data) => {
        io.sockets.emit("user",data)
    })
})