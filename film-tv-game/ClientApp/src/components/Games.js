import React, { Component } from 'react';

export class Games extends Component {
    displayName = Games.name

    constructor(props) {
        super(props);
        this.state = { games: [], loading: true };

        fetch('api/filmtvgames/Game')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState({ games: data, loading: false });
            });
    }

    static renderGamesTable(games) {
        return (
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
                        <tr key={game.guid}>
                            <td>{game.genre}</td>
                            <td>{game.title}</td>
                            <td>{game.votes}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Games.renderGamesTable(this.state.games);

        return (
            <div>
                <h1>Games</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
