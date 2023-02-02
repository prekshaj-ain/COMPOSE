const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const postRoute = require('./Routes/post-route')
const userRoute = require('./Routes/user-route');
const httpError = require('./Models/http-error');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config();
app.use(bodyParser.json());
app.use('/api',express.static('uploads'));
app.use('/api/post',express.static('uploads'), postRoute)
app.use('/api/user',express.static('uploads'), userRoute)
app.use((req,res,next)=>{
    const error = new httpError("couldn't find this route",404 );
    return next(error);
})
app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path, err =>{
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code|| 500)
    res.json({message: error.message || "An unknown error occured"})
})







mongoose.connect(process.env.MONGO_URL)
    .then(
        ()=>{
            app.listen(5000,()=>{
                console.log('listening on port 5000')
            })
        }
    )
    .catch(err=>{
        console.log(err);
    })
