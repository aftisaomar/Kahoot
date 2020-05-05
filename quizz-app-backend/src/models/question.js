const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    contenu: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    reponse: {
        type: String,
        trim: true
    },
    proposition1: {
        type: String,
        trim: true
    },
    proposition2: {
        type: String,
        trim: true
    },
    proposition3: {
        type: String,
        trim: true
    },
    proposition4: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question