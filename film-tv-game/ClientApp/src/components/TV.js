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
        this.addTvShow = this.addTvShow.bind(this);
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

    addTvShow() {
        var tvShowName = document.getElementById("title").value;
        var genre = "TV";
        var body = tvShowName + "," + genre;
        fetch('api/filmtvgames', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        this.resetTVShows();
    }

    resetTVShows() {
        this.setState(state => ({
            loading: true
        }));

        setTimeout(() => {
            this.returnTVShows();
        }, 100)
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

        this.resetTVShows();
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
                <div>
                    <button onClick={() => this.vote()}>Vote</button>
                </div>
                <div>
                    <h3>Would you like to add a new TV Show?  If so please fill in the below:</h3>
                    <div><span>Title of the Show: </span><input id="title" type="text"></input><button onClick={() => this.addTvShow()}>Add</button></div>
                </div>
            </div>
        );
    }
}
