const userModel = require('../models/user.model.js')

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if(!firstname || !lastname || !email || !password){
        throw new Error('All Fields are required')
    }

    const user = await userModel.create({
        fullname: {
            firstName: firstname,
            lastName: lastname
        },
        email, 
        password
    })

    return user
}