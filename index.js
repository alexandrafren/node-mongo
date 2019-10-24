const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    //checks to ensure err is not null (ie. does an error exist)
    assert.equal(err, null);
    //if error does not exist...
    console.log('Connected correctly to the server')

    const db = client.db(dbname)
    const collection = db.collection('dishes')

    collection.insertOne({"name": "Uthappizza", "description": "text"}, (err, result) => {
        //ensures that error is equal to null, ie there are no errors
        assert.equal(err,null);
        console.log('After Insert:\n')
        //logs the operations that have been carried out succesfully
        console.log(result.ops)

        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);
            console.log('Found:\n')
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err,null);
                client.close();
            })
        })
    })
});
