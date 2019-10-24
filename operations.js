const assert = require('assert')

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err,result) => {
        //ensure no error is present
        assert.equal(err, null);
        //property n tells us how many documents have been inserted
        console.log("Inserted " + result.result.n + "documents into the collection" + collection);
        callback(result);
    })
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    //finds all the documents in the function
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    })
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);
    })
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update })
    console.log("Updated the document with ", update);
;}