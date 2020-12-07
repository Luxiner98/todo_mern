const express = require ('express');
const cors = require('cors');
const app = express();
const postLoginUserRouter = require('./src/routes/postLoginUser');
const postUserRouter = require('./src/routes/postUser');
const postTodosRouter = require('./src/routes/postTodos');
const getTodosRouter = require('./src/routes/getTodos');

app.use(cors());
app.use(express.json());



app.listen(3001,()=>{
    console.log('Server started!');
})


require('./src/database');


app.use('/', postLoginUserRouter);
app.use('/', postUserRouter);
app.use('/', postTodosRouter);
app.use('/', getTodosRouter);