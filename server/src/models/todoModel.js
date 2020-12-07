const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    todos:[{
        checked: Boolean,
        text: String,
        date:String,
        id: String,
    }],
})
const Todos = mongoose.model('Todos',todoSchema);

module.exports = Todos;