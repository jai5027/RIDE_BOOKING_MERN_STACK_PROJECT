const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route.js')
const captainRouter = require('./routes/captain.route.js')
const mapRoutes = require('./routes/map.route.js')
const rideRoutes = require('./routes/ride.route.js')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/users', authRouter)
app.use('/captains', captainRouter)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)

module.exports = app