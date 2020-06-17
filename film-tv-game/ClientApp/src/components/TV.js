import React, { Component } from 'react';

export class TV extends Component {
    displayName = TV.name

    constructor(props) {
        super(props);
        this.state = { TV: [], loading: true };

        fetch('api/filmtvgames/TV')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState({ TV: data, loading: false });
            });
    }

    returnTVShows() {
        fetch('api/filmtvgames/TV')
            .then(response => response.json())
            .then(data => {
                var tvList = data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState(state => ({
                    TV: tvList,
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
            this.returnTVShows();
        }, 100)
    }

    static renderTVTable(TV) {
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
                            {TV.map(show =>
                                <tr key={show.title}>
                                    <td>{show.genre}</td>
                                    <td>{show.title}</td>
                                    <td>{show.votes}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Please select an exisitng TV Show if you wish to vote:</h3>
                    <select id="data">
                        {TV.map(show =>
                            <option key={show.title} value={show.title + "," + show.genre + "," + show.votes}>{show.title}</option>
                        )}
                    </select>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TV.renderTVTable(this.state.TV);

        return (
            <div>
                <div>
                    <h1>TV Shows</h1>
                    <p>Below are a list of TV Shows that have been added and voted for.</p>
                    {contents}
                </div>
                <button onClick={() => this.vote()}>Vote</button>
            </div>
        );
    }
}
