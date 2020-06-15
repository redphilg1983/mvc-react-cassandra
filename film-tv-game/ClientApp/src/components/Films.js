import React, { Component } from 'react';

export class Films extends Component {
    displayName = Films.name

    constructor(props) {
        super(props);
        //this.state = { currentCount: 0 };
        //this.incrementCounter = this.incrementCounter.bind(this);
        this.state = { numbers: [0, 1, 2, 3] }
    }

    //incrementCounter() {
    //    this.setState({
    //        currentCount: this.state.currentCount + 1
    //    });
    //}

    render() {
        return (
            <div>
                <h1>Please Vote for your favourite Film, or add a new one to the list:</h1>

                <p>This is a simple example of a React component.</p>

                //<p>Current count: <strong>{this.state.currentCount}</strong></p>

                <p>{this.state.numbers}</p>

                <button onClick={this.incrementCounter}>Increment</button>
            </div>
        );
    }
}
