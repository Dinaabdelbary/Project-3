const http = require('http');

module.exports = (app) => {
    const server = http.createServer(app);
    const io = require("socket.io")(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', socket => {
        socket.on('message', (messageData) => {
            io.emit('message', messageData)
        })
    });
    return server;
};
