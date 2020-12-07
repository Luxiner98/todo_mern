const express = require('express');
const postUserRouter = express.Router();
const User = require('../models/userModel');

postUserRouter.post('/register',async (req,res)=>{
    const {email,username,password} = req.body;
    const userEmail = await User.findOne({email}).exec();
    const userUsername = await User.findOne({username}).exec();
    if(userUsername){
        res.status(500);
        res.json({
            message:'Try different username.'
        })
        return;
    }else if(userEmail){
        res.status(500);
        res.json({
            message:'Try different email.'
        })
        return;
    }
    await User.create({email,username,password});  
    res.json({
        email:"",
        username:"",
        password:""
    });
})

module.exports = postUserRouter;