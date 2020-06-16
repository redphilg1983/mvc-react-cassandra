var cassandra = require('cassandra-driver');
var client = new cassandra.Client({
    contactPoints: ['192.168.0.40'],
    localDataCenter: 'datacenter1'
});
var generator = require('node-uuid-generator');

//Script to create the keyspace and the table to be used by the project
var guid = generator.generate();

client
    .execute(
        "CREATE KEYSPACE IF NOT EXISTS ekm WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 };"
    )
    .then(() =>
        client.execute(
            "CREATE TABLE IF NOT EXISTS ekm.voting(guid uuid primary key, genre text, title text, votes int);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
                client.shutdown();
            }
        )
    );
