const express = require("express");
const app = express();
const userRouter = require('./routes/user.rout')
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require("./config/db")
connectToDB();
const cookiparser = require('cookie-parser')
const indexRouter = require('./routes/index.rout')


app.set("view engine", 'ejs');
app.use(cookiparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',indexRouter)
app.use('/user',userRouter)


app.listen(process.env.PORT ||3000 ,()=>{
    console.log('server is running on port 3000');
    
})