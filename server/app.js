const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
require("dotenv").config()
require("./db")

const postRouter = require('./router/movie');
const actorRouter = require('./router/actor');
const userRouter = require('./router/user');

const app = express();


app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors());


app.use('/movie',postRouter);
app.use('/actor',actorRouter);
app.use('/user',userRouter);


app.listen(5000,()=>{
    console.log("this port is running on 5000")
})
