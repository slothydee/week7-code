import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import firebase from 'firebase';
import db from '../firebase/db';
import DeleteButton from './DeleteButton';

// export default class JournalEntry extends React.Component {
//     state = {
//         journalEntry: {}
//     }
    
//     componentDidMount() {
//         const {id} = this.props.match.params;

//         db.collection('journalEntries')
//             .doc(id)
//             .get()
//             .then(doc => {
//                 if (doc.exists) {
//                     this.setState({
//                         journalEntry: doc.data()
//                     });
//                 }
//             })
//     }

//     onDelete = (event) => {
//         const {id} = this.props.match.params;

//         db.collection('journalEntries')
//             .doc(id)
//             .delete()
//             .then(() => {
//                 this.props.history.push('/journal');
//             });
//     }

//     onJournalChange = (event) => {
//         this.setState({
//             journalEntry: {
//                 ...this.state.journalEntry,
//                 entry: event.target.value
//             }
//         })
//     }

//     onUpdate = () => {
//         const {id} = this.props.match.params;

//         db.collection('journalEntries')
//             .doc(id)
//             .set({
//                 entry: this.state.journalEntry.entry
//             }, { merge: true })
//             .then(() => {
//                 this.props.history.push('/journal');
//             });
//     }

//     render() {
//         return (
//             <div>
//                 {/* <h1>{this.state.journalEntry.entry}</h1> */}
//                 <textarea
//                     rows="4"
//                     cols="50"
//                     value={this.state.journalEntry.entry}
//                     onChange={this.onJournalChange}
//                 />
//                 <br />
//                 <button onClick={this.onUpdate}>Update</button>
//                 <button onClick={this.onDelete}>Delete</button>
//             </div>
//         );
//     }
// }

const JOURNAL_LIST = '/journal';
const JOURNAL_COLLECTION = 'journalEntries';

export default function JournalEntry() {
    const [journalEntry, setEntry] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(user => {
                if (!user) {
                    return; // TODO: Handle this gracefully
                }

                db
                    .collection('users')
                    .doc(user.uid)
                    .collection(JOURNAL_COLLECTION)
                    .doc(id)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            setEntry(doc.data());
                        }
                    });
            });
        
        return () => {
            unregisterAuthObserver();
        }
    }, [id]);

    const onJournalChange = (event) => {
        setEntry({
            ...journalEntry,
            entry: event.target.value
        });
    };

    const onUpdate = () => {
        const user = firebase.auth().currentUser;

        if (!user) {
            return; // TODO: Handle this gracefully
        }

        db
            .collection('users')
            .doc(user.uid)
            .collection(JOURNAL_COLLECTION)
            .doc(id)
            .set({ entry: journalEntry.entry }, { merge: true })
            .then(() => history.push(JOURNAL_LIST));
    };

    return (
        <div>
            <textarea
                rows="4"
                cols="50"
                value={journalEntry.entry}
                onChange={onJournalChange}
            />
            <br />
            <button onClick={onUpdate}>Update</button>
            <DeleteButton id={id} />
        </div>
    )
}