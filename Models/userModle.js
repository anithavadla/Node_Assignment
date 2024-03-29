const mongoose= require('mongoose')




const userSchema=  mongoose.Schema(
    {
        name: {type: String, required:true, minlength:3, maxlength:30},
        phoneNumber: { type: String, required: true, minlength: 10, maxlength: 10 },
        password:{type:String, required:true}

    }
)

const User= new mongoose.model('User', userSchema)



exports.User=User