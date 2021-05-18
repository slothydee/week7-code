import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Journal from './Journal';
import JournalEntry from './JournalEntry';
import Nav from './Nav';

function Routes() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/journal/:id" component={JournalEntry} />
                <Route path="/journal" component={Journal} />
            </Switch>
        </Router>
    );
}

export default Routes;
