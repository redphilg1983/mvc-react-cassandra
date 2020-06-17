﻿import React, { Component } from 'react';

export class Films extends Component {
    displayName = Films.name

    constructor(props) {
        super(props);
        this.state = { films: [], loading: true };

        fetch('api/filmtvgames/Film')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState({ films: data, loading: false });
                this.vote = this.vote.bind(this);
            });
    };

    returnFilms() {
        console.log('this has been hit');
        fetch('api/filmtvgames/Film')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var filmList = data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState(state => ({
                    films: filmList,
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
            this.returnFilms();
        }, 100)
    }

    static renderFilmsTable(films) {
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
                            {films.map(film =>
                                <tr key={film.title}>
                                    <td>{film.genre}</td>
                                    <td>{film.title}</td>
                                    <td>{film.votes}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Please select an exisitng Film if you wish to vote:</h3>
                    <select id="data">
                        {films.map(film =>
                            <option key={film.title} value={film.title + "," + film.genre + "," + film.votes}>{film.title}</option>
                        )}
                    </select>
                </div>
            </div>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Films.renderFilmsTable(this.state.films);

        return (
            <div>
                <div>
                    <h1>Films</h1>
                    <p>This component demonstrates fetching data from the server.</p>

                    {contents}
                </div>
                <button onClick={() => this.vote()}>Vote</button>
            </div>
        );
    }
}
