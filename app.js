const express=require('express')
const app=express()
const users=require('./Routes/user')
const mongoose=require('mongoose')



mongoose.connect('mongodb://localhost/VooshDataBase',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Connection is successful'))
.catch((err)=> console.error('Couldnot connect to mongoDB',err))



app.use(express.json())
app.use(users)






const port= process.env.PORT || 3000
app.listen(port, ()=> console.log(`Port is running on ${port}`))