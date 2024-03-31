const express = require('express')
const router = express.Router()
const {test,signUpUser,getUsers,logInUser,getProfile}=require('../Controller/userController')


const cors=require('cors')

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)

router.post('/add-user', signUpUser)
router.get('/get-users', getUsers)
router.post('/login-user',logInUser)








module.exports=router