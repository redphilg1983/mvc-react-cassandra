import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Film, TV and Games</h1>
        <p>Welcome to the Admin section of the Application.  Please click on the Admin section on the left in order to see all data and delete items.</p>
      </div>
    );
  }
}
