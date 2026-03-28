const http = require('http')
const app = require('./src/app.js')
const dotenv = require('dotenv')
const { initializeSocket } = require('./src/socket.js')
dotenv.config()
const connectDB = require('./src/config/database.js')
const port = process.env.PORT || 3000

connectDB()

const server = http.createServer(app)
initializeSocket(server)

server.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})