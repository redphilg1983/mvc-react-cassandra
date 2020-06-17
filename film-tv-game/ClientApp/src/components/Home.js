import React, { Component } from 'react';

export class Home extends Component {
    displayName = Home.name

    render() {
        return (
            <div>
                <h1>Films, TV Shows and Games</h1>
                <p>This application will allow you to see the most popular Films, TV Shows and Games as voted by others.  Please click on a catagory of your choice on the left and either vote for your favourite, or add one of your choice.</p>
            </div>
        );
    }
}
