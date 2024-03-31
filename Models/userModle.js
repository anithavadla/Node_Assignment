const mongoose = require('mongoose')
const Joi = require('joi')
const {isMobilePhone,isStrongPassword}= require('validator')



const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
          
        },
        phoneNumber: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10,
            unique: true,
            validate:[isMobilePhone,'Please enter valid phone number']
        },
        password: {
            type: String,
            required: true,
            validate:[isStrongPassword,'Please enter valid password']
        }

    }
)

const User = new mongoose.model('User', userSchema)


function validateIncomingData(user) {
    const schema =
    {
        name: Joi.string().min(3).max(30).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        password: Joi.string().required()

    }
    return Joi.validate(user, schema)
}


exports.User = User
exports.userSchema=userSchema
exports.validate = validateIncomingData
