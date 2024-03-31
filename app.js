const express=require('express')
const app=express()
const users=require('./Routes/userRoute')
const orders=require('./Routes/orderRoute')
const mongoose=require('mongoose')
const requireAuth=require('./Helpers/authMiddleWare')
const cookieParser=require('cookie-parser')



mongoose.connect('mongodb://localhost/VooshDataBase',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Connection is successful'))
.catch((err)=> console.error('Couldnot connect to mongoDB',err))



app.use(express.json())
app.use('/user',users)
app.use('/order',requireAuth,orders)
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))








const port= process.env.PORT || 8000
app.listen(port, ()=> console.log(`Port is running on ${port}`))