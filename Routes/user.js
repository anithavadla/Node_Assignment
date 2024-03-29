const express = require('express')
const router = express.Router()

const users=
[
    {id:1,name:'Anitha',phoneNumber:1234567890,password:'anitha'},
    {id:2,name:'Harhshada',phoneNumber:1234567890,password:'harshada'},
    {id:3,name:'Lakshmi',phoneNumber:1234567890,password:'lakshmi'},
    
]


router.get('/get-users',(req,res)=>
{
    res.send(users)
})


router.post('/add-user',(req,res)=>
{
    const user=
    {
        name: req.body.name,
        phoneNumber:req.body.phoneNumber,
        password:req.body.password

    }

users.push(user)
res.send(users)
    
})


module.exports=router