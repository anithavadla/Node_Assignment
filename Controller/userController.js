const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
const {User,validate}=require('../Models/userModle')

const secretKey = 'voosh_secret_key';
const maxAge=3*24*60*60;

const test = (req,res)=>
{
res.json('working')
}


const getUsers = async (req, res)=>
{
    const users= await User.find()
    res.send(users)
}


const signUpUser =  async (req, res) =>
{
    const {error}=validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const { name, phoneNumber, password } = req.body;

       const hashedPassword=  await bcrypt.hash(password,10)

        const newUser = new User({
            name: name,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        const token=createToken(savedUser.id)
        res.cookie('jwt',token,{httpOnly:true},{maxAge:maxAge*1000})
        console.log(token)
        res.status(201).send(savedUser.id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createToken = (id)=>{
    return jwt.sign({id},secretKey,{
        expiresIn:maxAge
    })
}



module.exports=
{
    test,
    signUpUser,
    getUsers
}