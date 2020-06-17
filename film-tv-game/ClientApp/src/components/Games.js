import React, { Component } from 'react';

export class Games extends Component {
    displayName = Games.name

    constructor(props) {
        super(props);
        this.state = { games: [], loading: true };

        fetch('api/filmtvgames/Game')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState({ games: data, loading: false });
            });
    }

    returnGames() {
        fetch('api/filmtvgames/Game')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var gameList = data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState(state => ({
                    games: gameList,
                    loading: false
                }))
            });
    }

    vote() {
        var data = document.getElementById("data");
        var titleGenreVotes = data.options[data.selectedIndex].value;
        fetch('api/votes', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(titleGenreVotes),
        })

        this.setState(state => ({
            loading: true
        }));

        setTimeout(() => {
            this.returnGames();
        }, 100)
    }

    static renderGamesTable(games) {
        return (
            <div>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Genre</th>
                                <th>Title</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map(game =>
                                <tr key={game.title}>
                                    <td>{game.genre}</td>
                                    <td>{game.title}</td>
                                    <td>{game.votes}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Please select an exisitng Game if you wish to vote:</h3>
                    <select id="data">
                        {games.map(game =>
                            <option key={game.title} value={game.title + "," + game.genre + "," + game.votes}>{game.title}</option>
                        )}
                    </select>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Games.renderGamesTable(this.state.games);

        return (
            <div>
                <div>
                    <h1>Games</h1>
                    <p>Below are a list of Games that have been added and voted for.</p>
                    {contents}
                </div>
                <button onClick={() => this.vote()}>Vote</button>
            </div>
        );
    }
}
