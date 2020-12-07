const express = require('express');
const postLoginUserRouter = express.Router();
const User = require('../models/userModel');

postLoginUserRouter.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const userUsername = await User.findOne({username}).exec();
    if(!userUsername || userUsername.password!==password){
        res.status(404);
        res.json({
            message:'Something went wrong.'
        })
        return;
    }
    res.json({
        message:'400'
    });
})

module.exports = postLoginUserRouter;