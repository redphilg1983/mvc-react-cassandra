import React, { Component } from 'react';

export class Admin extends Component {
    displayName = Admin.name

    constructor(props) {
        super(props);
        this.state = { items: [], loading: true };

        fetch('api/filmtvgames')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.sort((a, b) => (a.title > b.title) ? 1 : -1);
                this.setState({ items: data, loading: false });
            });
        this.delete = this.delete.bind(this);
    };

    delete() {
        var itemName = document.getElementById("data").value;
        var body = itemName;
        fetch('api/filmtvgames', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        this.resetItems();
    }

    returnItems() {
        fetch('api/filmtvgames')
            .then(response => response.json())
            .then(data => {
                var allItems = data.sort((a, b) => (a.title > b.title) ? 1 : -1);
                this.setState(state => ({
                    items: allItems,
                    loading: false
                }))
            });
    }

    resetItems() {
        this.setState(state => ({
            loading: true
        }));

        setTimeout(() => {
            this.returnItems();
        }, 100)
    }

    static renderTable(items) {
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
                            {items.map(item =>
                                <tr key={item.title}>
                                    <td>{item.genre}</td>
                                    <td>{item.title}</td>
                                    <td>{item.votes}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Please select an exisitng Item if you wish to delete it: </h3>
                    <select id="data">
                        {items.map(item =>
                            <option key={item.title} value={item.title}>{item.title}</option>
                        )}
                    </select>
                </div>
            </div>


        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Admin.renderTable(this.state.items);

        return (
            <div>
                <div>
                    <h1>All Items</h1>
                    <p>Below are a list of Films, TV Shows and Games that have been added and voted for.</p>

                    {contents}
                </div>
                <div>
                    <button onClick={() => this.delete()}>Delete</button>
                </div>
            </div>
        );
    }
}
