const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const kafka = require('kafka-node');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const consumer = new kafka.Consumer(
    kafkaClient,
    [
        { topic: 'notifications', partitions: 0 },
        { topic: 'broadcasts', partitions: 0 }
    ],
    {
        autoCommit: true,
        fromOffset: 'latest'
    }
);

io.on('connection', (socket) => {
    console.log('New client connected');

    consumer.on('message', (message) => {
        const data = JSON.parse(message.value);
        const topic = message.topic;
        console.log(data, topic);
        if (topic === 'notifications') {
            // Emit the notification to the relevant clients
            socket.emit('notification', data);
        } else if (topic === 'broadcasts') {
            // Emit the broadcast to all connected clients
            io.emit('broadcast', data);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});