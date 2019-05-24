const config = require('../utilities/config');
const { MongoClient } = require('mongodb');

/** Add the given array of documents into the mongodb 'questions' collection. */
module.exports = function uploadDocuments(documents){
    return new Promise((resolve, reject) => {
        // Connect to the running Mongo instance
        MongoClient.connect(config.connectionString, function(err, connection) {
            if(err) reject(err);
            // Insert the documents into the collection
            connection.db().collection(config.questionsCollection).insertMany(documents, function(err, res){
                if (err) reject(err);
                console.log("Inserted Documents");
                connection.close();
                resolve();
            });
        });
    });
}