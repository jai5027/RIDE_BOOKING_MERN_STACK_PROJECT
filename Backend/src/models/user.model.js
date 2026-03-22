const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
      fullname: {
        firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters']
      },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },

      email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters'],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
      },

      password: {
        type: String,
        required: true,
        select: false
      },

      socketId: {
        type: String
      }
}, {
  timestamps: true  
})

userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
  return token
}

userSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password, 10)
}

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel