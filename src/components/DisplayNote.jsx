import React from 'react';

const DisplayNote = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'mark as not important'
        : 'mark as important';

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    );
};

export default DisplayNote;
