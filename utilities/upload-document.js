var mongo = require('mongodb');
const config = require('../utilities/config');

// This is the name of the mongo database.
const DBNAME = config.dbName || 'group9db';
// This is the name of the collection within the database
const COLLECTIONNAME = config.questionsCollection || "questions";

var MongoClient = require('mongodb').MongoClient;
// The port and location that mongo is using on the network
var url = "mongodb://localhost:27017/";

module.exports = function uploadDocuments(documents){
    return new Promise((resolve, reject) => {
        // Connect to the running Mongo instance
        MongoClient.connect(url, function(err, db){
            if(err) reject(err);
            // Connect to the proper database
            var dbo = db.db(DBNAME);
            // Insert the documents into the collection
            dbo.collection(COLLECTIONNAME).insertMany(documents, function(err, res){
                if (err) reject(err);
                console.log("Inserted Documents");
                db.close();
                resolve();
            });
        });
    });
}