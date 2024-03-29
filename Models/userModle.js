const mongoose= require('mongoose')
const Joi=require('joi')



const userSchema=  mongoose.Schema(
    {
        name: {type: String, required:true, minlength:3, maxlength:30},
        phoneNumber: { type: String, required: true, minlength: 10, maxlength: 10, unique: true },
        password:{type:String, required:true}

    }
)

const User = new mongoose.model('User', userSchema)


function validateIncomingData(user)
{
        const schema =
        {
            name: Joi.string().min(3).max(30).required(),
            phoneNumber: Joi.string().min(10).max(10).required(),
            password: Joi.string().required()

        }
     return   Joi.validate(user,schema)
}


exports.User=User
exports.validate=validateIncomingData
