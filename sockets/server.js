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
        { topic: 'notifications', partitions: [0, 1, 2] },
        { topic: 'broadcasts', partitions: [0, 1, 2] }
    ],
    { autoCommit: true }
);

const cachedMessages = {
    notifications: [],
    broadcasts: []
};

// Read existing messages from Kafka topics and cache them
const loadCachedMessages = () => {
    return new Promise((resolve, reject) => {
        // Retrieve the latest offset for each topic
        const offset = new kafka.Offset(kafkaClient);

        offset.fetch([
            { topic: 'notifications', partitions: [0, 1, 2] },
            { topic: 'broadcasts', partitions: [0, 1, 2] }
        ], (err, data) => {
            if (err) return reject(err);

            const notificationsOffset = data['notifications'][0][0];
            const broadcastsOffset = data['broadcasts'][0][0];

            consumer.setOffset('notifications', 0, notificationsOffset);
            consumer.setOffset('broadcasts', 0, broadcastsOffset);

            consumer.on('message', (message) => {
                const topic = message.topic;
                const data = JSON.parse(message.value);

                if (topic === 'notifications') {
                    cachedMessages.notifications.push(data);
                } else if (topic === 'broadcasts') {
                    cachedMessages.broadcasts.push(data);
                }
            });

            resolve();
        });
    });
};

// Emit cached messages to a newly connected client
const sendCachedMessages = (socket) => {
    socket.emit('cachedNotifications', cachedMessages.notifications);
    socket.emit('cachedBroadcasts', cachedMessages.broadcasts);
};

// Handle real-time messages from Kafka
consumer.on('message', (message) => {
    const data = JSON.parse(message.value);
    const topic = message.topic;
    console.log(data, topic);

    if (topic === 'notifications') {
        cachedMessages.notifications.push(data);
        io.emit('notification', data); // Emit to all clients
    } else if (topic === 'broadcasts') {
        cachedMessages.broadcasts.push(data);
        io.emit('broadcast', data); // Emit to all clients
    }
});

// Handle new socket connections
io.on('connection', (socket) => {
    console.log('New client connected');
    sendCachedMessages(socket);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Initialize cached messages and start the server
loadCachedMessages().then(() => {
    server.listen(4000, () => {
        console.log('Server is running on http://localhost:4000');
    });
}).catch(err => {
    console.error('Error loading cached messages:', err);
});
