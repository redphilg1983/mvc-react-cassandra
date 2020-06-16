import React, { Component } from 'react';

export class TV extends Component {
    displayName = TV.name

    constructor(props) {
        super(props);
        this.state = { TV: [], loading: true };

        fetch('api/filmtvgames/TV')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.sort((a, b) => (b.votes > a.votes) ? 1 : -1);
                this.setState({ TV: data, loading: false });
            });
    }

    static renderTVTable(TV) {
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
                    {TV.map(show =>
                        <tr key={show.guid}>
                            <td>{show.genre}</td>
                            <td>{show.title}</td>
                            <td>{show.votes}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TV.renderTVTable(this.state.TV);

        return (
            <div>
                <h1>TV Shows</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
