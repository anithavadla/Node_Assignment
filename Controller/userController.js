const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
const {User,validate}=require('../Models/userModle')

const secretKey = 'voosh_secret_key';
const maxAge=3*24*60*60;



const getUsers = async (req, res)=>
{
    const users= await User.find()
    res.send(users)
}


const signUpUser =  async (req, res) =>
{
    const {error}=validate(req.body)
    if(error) res.json({
        error: error.details[0].message
    })

    try {
        const { name, phoneNumber, password } = req.body;

        const exist= await User.findOne({ phoneNumber})
        if(exist){
            return res.json({
                error: 'User with this phone number exists'
            })
        }
       

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




const logInUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.json({ error: "User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token=createToken(user.id)
            res.cookie('jwt',token,{httpOnly:true},{maxAge:maxAge*1000})
            console.log(token)
            return res.json({ message: 'Logged in successfully' });
        } else {
            
            return res.json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



const createToken = (id)=>{
    return jwt.sign({id},secretKey,{
        expiresIn:maxAge
    })
}



module.exports=
{
    signUpUser,
    getUsers,
    logInUser,
}