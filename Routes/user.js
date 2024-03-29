const express = require('express')
const router = express.Router()
const bcrypt= express('bcrypt')

const {User,validate}=require('../Models/userModle')


router.get('/get-users', async (req,res)=>
{    
    const users= await User.find()
    res.send(users)
})


router.post('/add-user', async (req, res) => {
    const {error}=validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const { name, phoneNumber, password } = req.body;

       

        const newUser = new User({
            name: name,
            phoneNumber: phoneNumber,
            password: password
        });

        const savedUser = await newUser.save();

        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



module.exports=router