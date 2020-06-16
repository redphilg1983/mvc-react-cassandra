import React, { Component } from 'react';

export class Films extends Component {
    displayName = Films.name

    constructor(props) {
        super(props);
        this.state = { films: [], loading: true };

        fetch('api/filmtvgames/Film')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ films: data, loading: false });
            });
    }

    static renderFilmsTable(films) {
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
                    {films.map(film =>
                        <tr key={film.guid}>
                            <td>{film.genre}</td>
                            <td>{film.title}</td>
                            <td>{film.votes}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Films.renderFilmsTable(this.state.films);

        return (
            <div>
                <h1>Films</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
