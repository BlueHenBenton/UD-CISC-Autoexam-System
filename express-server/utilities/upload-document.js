var mongo = require('mongodb');

// This is the name of the mongo database.
const DBNAME = "group9db";
// This is the name of the collection within the database
const COLLECTIONNAME = "questions";

var MongoClient = require('mongodb').MongoClient;
// The port and location that mongo is using on the network
var url = "mongodb://localhost:27017/";

module.exports = function uploadDocuments(documents){
    // Connect to the running Mongo instance
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        // Connect to the proper database
        var dbo = db.db(DBNAME);
        // Insert the documents into the collection
        dbo.collection(COLLECTIONNAME).insertMany(documents, function(err, res){
            if (err) throw err;
            console.log("Inserted Documents");
            db.close();
        });
    });
}