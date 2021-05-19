import React from 'react'
import PropTypes from 'prop-types';
import firebase from 'firebase';
import db from '../firebase/db';
import { useHistory, useLocation } from 'react-router';

export default function DeleteButton({ id }) {
    const history = useHistory();
    const location = useLocation();

    const onDelete = () => {
        const user = firebase.auth().currentUser;

        if (!user) {
            return; // TODO: Handle this gracefully
        }

        db
            .collection('users')
            .doc(user.uid)
            .collection('journalEntries')
            .doc(id)
            .delete()
            .then(() => {
                if (location.pathname !== '/journal') {
                    history.push('/journal');
                }
            });
    };

    return (
        <button onClick={onDelete}>Delete</button>
    )
}

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired
}