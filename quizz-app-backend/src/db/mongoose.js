const mongoose = require('mongoose');

//Mongoose Db connection
mongoose.connect('mongodb://127.0.0.1:27017/quizzdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
});