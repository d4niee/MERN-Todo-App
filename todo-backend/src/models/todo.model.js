const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    /**
     * This id is very important!
     * it declares to which user the to-do item belongs to
     */
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Todo', Todo);