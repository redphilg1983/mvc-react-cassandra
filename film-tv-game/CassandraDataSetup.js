var cassandra = require('cassandra-driver');
var client = new cassandra.Client({
    contactPoints: ['192.168.0.40'],
    localDataCenter: 'datacenter1'
});
var generator = require('node-uuid-generator');

//Script to create the data to be used by the project


client.execute(
    "INSERT INTO ekm.voting(title, genre, votes) VALUES('Avengers: Endgame', 'Film', 23);",
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('Spiderman: Far From Home', 'Film', 3);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('Star Wars: The Rise of Skywalker', 'Film',  2);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('Star Trek: Enterprise', 'TV', 4);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('The Curse of oak Island', 'TV', 3);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('Prison Break', 'TV', 1);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('COD: Modern Warfare', 'Game', 6);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    ).then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('Apex Legends', 'Game', 2);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
            }
        )
    )
    .then(() =>
        client.execute(
            "INSERT INTO ekm.voting(title, genre, votes) VALUES ('Minecraft Dungeons', 'Game', 1);",
            (err, result) => {
                console.log(err);
                console.log(err, result);
                client.shutdown();
            }
        )
    );