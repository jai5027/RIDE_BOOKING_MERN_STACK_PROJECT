const socketIO = require('socket.io');
const userModel = require('./models/user.model.js')
const captainModel = require('./models/captain.model.js')

let io;

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New socket connection:', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data

            if(userType === 'user'){
                await userModel.findOneAndUpdate(
                    { _id: userId },
                    { socketId: socket.id }
                )
            } 
            else if(userType === 'captain'){
                await captainModel.findOneAndUpdate(
                    { _id: userId },
                    { socketId: socket.id }
                )
            }
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });

    return io;
};

const sendMessageToSocketId = (socketId, event, data) => {
    if (io) {
        io.to(socketId).emit(event, data);
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};