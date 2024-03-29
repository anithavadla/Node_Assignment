const express=require('express')
const app=express()
const users=require('./Routes/user')




app.use(express.json())
app.use(users)






const port= process.env.PORT || 3000
app.listen(port, ()=> console.log(`Port is running on ${port}`))