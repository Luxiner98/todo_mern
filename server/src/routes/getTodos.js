const express = require('express');
const getTodosRouter = express.Router();
const Todos = require('../models/todoModel');
const User = require('../models/userModel');

getTodosRouter.get('/todo', async (req, res) => {
    const { authorization } = req.headers;
    const [username, password] = authorization.split(":");
    const userUsername = await User.findOne({ username }).exec();
    if (!userUsername || userUsername.password !== password) {
      res.status(400);
      res.json({
        message: 'Something went wrong.'
      });
      return;
    }
    const { todos } = await Todos.findOne({ userId: userUsername._id }).exec();
    res.json(todos);
})

module.exports = getTodosRouter;