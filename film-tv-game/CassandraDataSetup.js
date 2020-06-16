var cassandra = require('cassandra-driver');
var client = new cassandra.Client({
    contactPoints: ['192.168.0.40'],
    localDataCenter: 'datacenter1'
});
var generator = require('node-uuid-generator');

//Script to create the data to be used by the project


client.execute(
    "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES(" + generator.generate() + ", 'Film', 'Avengers: Endgame', 5);",
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'Film', 'Spiderman: Far From Home', 3);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'Film', 'Star Wars: The Rise of Skywalker', 2);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'TV', 'Star Trek: Enterprise', 4);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'TV', 'The Curse of oak Island', 3);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'TV', 'Prison Break', 1);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'Game', 'COD: Modern Warfare', 6);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'Game', 'Apex Legends', 2);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    )
    .then(() =>
        client.execute(
            "INSERT INTO ekm.voting(guid, genre, title, votes) VALUES (" + generator.generate() + ", 'Game', 'Minecraft Dungeons', 1);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
                client.shutdown();
            }
        )
    );