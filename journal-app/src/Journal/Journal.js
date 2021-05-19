import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import AddJournalEntry from './AddJournalEntry';
import DeleteButton from './DeleteButton';
import db from '../firebase/db';
import firebase from 'firebase';

export default class Journal extends React.Component {
    state = {
        journalEntries: []
    }

    componentDidMount() {
        // const user = firebase.auth().currentUser;
        // console.log(user);
        this.unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(user => {
                if (!user) {
                    alert('You need to be signed in to access the journal');
                    this.props.history.push('/');
                    return;
                }

                const userId = user.uid;
                this.unsubscribe = db
                    .collection('users')
                    .doc(userId)
                    .collection('journalEntries')
                    .orderBy('createdAt', 'asc')
                    .onSnapshot((data) => {
                        const journalEntries = data.docs.map(doc => {
                            return {
                                id: doc.id,
                                ...doc.data()
                            };
                        });
        
                        this.setState({
                            journalEntries
                        })
                    });
            });

    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        if (this.unregisterAuthObserver) {
            this.unregisterAuthObserver();
        }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            alert('Signed out!');
            this.props.history.push('/');
        });
    }

    render() {
        const journalEntries = this.state.journalEntries
            .map(entry => {
                return (
                    <li key={entry.id}>
                        <DeleteButton id={entry.id} />
                        <Link to={`/journal/${entry.id}`}>
                            {entry.entry}
                        </Link>
                    </li>
                );
            });

        return (
            <div>
                <h1>Journal</h1>
                <AddJournalEntry />
                <ul>
                    {journalEntries}
                </ul>
                <hr />
                <button onClick={this.signOut}>Sign Out</button>
            </div>
        )
    }
}
