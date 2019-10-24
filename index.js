const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    //checks to ensure err is not null (ie. does an error exist)
    assert.equal(err, null);
    //if error does not exist...
    console.log('Connected correctly to the server')

    const db = client.db(dbname)

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);
        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs)

            dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes', (result) => {
                console.log('Update Document:\n', result.result)
                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Documents:\n', docs)

                    db.dropCollection('dishes', (resut) => {
                        console.log('Dropped Collection: ', result);
                        client.close();
                    });
                });
            });
        });
    });
});
