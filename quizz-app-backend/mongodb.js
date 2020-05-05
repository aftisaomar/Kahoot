/* const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; */

const {MongoClient, ObjectID} = require('mongodb'); // Object destructuring

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'quizz_db';

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to database : ' + databaseName);
    }

    const db = client.db(databaseName);

})