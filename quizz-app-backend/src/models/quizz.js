const mongoose = require('mongoose');
const Question = require('../models/question');

/*
    Creating the task Schema
    We create a Schema instead of a Model because working with a Schema offers us more customization options such as 
    the Schema optins like enabling timestamps
*/
const quizzSchema = mongoose.Schema({
    titre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, {
    timestamps: true
})

const Quizz = mongoose.model('Quizz', quizzSchema);

module.exports = Quizz