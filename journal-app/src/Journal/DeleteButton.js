import React from 'react'
import PropTypes from 'prop-types';
import db from '../firebase/db';
import { useHistory, useLocation } from 'react-router';

export default function DeleteButton({ id }) {
    const history = useHistory();
    const location = useLocation();

    const onDelete = () => {
        db.collection('journalEntries')
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