import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from "./About";
import * as serviceWorker from './serviceWorker';
import {HashRouter, Route, Switch} from 'react-router-dom';

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/about' component={About} />
        </Switch>
    </HashRouter>
);

ReactDOM.render(
    <Router/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
