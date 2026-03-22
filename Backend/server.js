const app = require('./src/app.js')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./src/config/database.js')
const port = process.env.PORT || 3000

connectDB()
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})