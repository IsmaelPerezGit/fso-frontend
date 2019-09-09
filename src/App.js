import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import DisplayNote from './components/DisplayNote';

const App = () => {
    useEffect(() => {
        console.log('Use effect fired off');
        axios
            .get('http://localhost:3001/notes/')
            .then(res => {
                console.log('Promise fulfilled');
                setNotes(res.data);
            })
            .catch(err => console.error('Promise Failed with', err));
    }, []);

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    const noteList = () =>
        notesToShow.map(note => <DisplayNote key={note.id} note={note} />);

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true);

    const addNote = e => {
        e.preventDefault();

        const noteObject = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        };

        setNotes(notes.concat(noteObject));
        setNewNote('');
    };

    const handleFormChange = e => {
        setNewNote(e.target.value);
    };

    return (
        <div className='App'>
            <h1>Notes App</h1>
            <button onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'important' : 'all'}
            </button>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleFormChange} />
                <button type='submit'>Add Note</button>
            </form>
            <ul>{noteList()}</ul>
        </div>
    );
};

export default App;
