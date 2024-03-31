const express = require('express')
const router = express.Router()
const {test,signUpUser,getUsers}=require('../Controller/userController')


const cors=require('cors')

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3001'
    })

)

router.get('/', test)
router.post('/add-user', signUpUser)
router.get('/get-users', getUsers)







module.exports=router