import React, { Component } from 'react'
import db from '../firebase/db';

export default class AddJournalEntry extends Component {
    state = {
        entry: ''
    }

    onTextAreaChange = (event) => {
        this.setState({
            entry: event.target.value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.entry);
        db.collection('journalEntries')
            .add({
                entry: this.state.entry,
                createdAt: new Date()
            })
            .then((docRef) => {
                this.setState({
                    entry: ''
                });
            });
    }

    render() {
        return (
            <div>
                <h2>Add Journal Entry</h2>
                <form onSubmit={this.onFormSubmit}>
                    <textarea
                        value={this.state.entry}
                        onChange={this.onTextAreaChange}
                    />
                    <br />
                    <button type="submit">Add Entry</button>
                </form>
            </div>
        )
    }
}
