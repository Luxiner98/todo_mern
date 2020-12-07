const express = require('express');
const postTodosRouter = express.Router();
const Todos = require('../models/todoModel');
const User = require('../models/userModel');

postTodosRouter.post('/todo',async (req,res)=>{
    const {authorization} = req.headers;
    const [username,password] = authorization.split(':');
    const todosItems = req.body;
    const userUsername = await User.findOne({username}).exec();
    if(!userUsername || userUsername.password!==password){
        res.status(404);
        res.json({
            message:'Something went wrong.'
        });
        return;
    }
    const todos = await Todos.findOne({userId:userUsername._id}).exec();
    if(!todos){
        await Todos.create({
            userId:userUsername._id,
            todos:todosItems,
        });
    }else{
        todos.todos = todosItems;
        await todos.save();
    }
    res.json(todosItems);
})

module.exports = postTodosRouter;