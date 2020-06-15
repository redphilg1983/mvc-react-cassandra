import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Films } from './components/Films';
import { TV } from './components/TV';
import { Games } from './components/Games';
import { Counter } from './components/Counter';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/films' component={Films} />
                <Route path='/tv' component={TV} />
                <Route path='/games' component={Games} />
            </Layout>
        );
    }
}
