const express = require('express')
const router = express.Router()

const {addOrder,getOrder} = require('../Controller/orderController')



const cors=require('cors')

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)

router.post('/add-order',addOrder)
router.get('/get-order',getOrder)

module.exports=router