import React, { useState, useEffect } from 'react';
import './App.css';

import noteService from './services/notes';
import DisplayNote from './components/DisplayNote';

const App = () => {
    useEffect(() => {
        noteService
            .getAll()
            .then(res => setNotes(res))
            .catch(err => console.error('Promise Failed with', err));
    }, []);

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    const toggleImportance = id => {
        const url = `http://localhost:3001/notes/${id}`;
        const note = notes.find(note => note.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(res => {
                setNotes(notes.map(note => (note.id !== id ? note : res)));
            })
            .catch(err => console.error('Put failed with', err));
    };

    const noteList = () =>
        notesToShow.map(note => (
            <DisplayNote
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportance(note.id)}
            />
        ));

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true);

    const addNote = e => {
        e.preventDefault();

        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        };

        noteService
            .create(noteObject)
            .then(res => {
                setNotes(notes.concat(res));
                setNewNote('');
            })
            .catch(err => console.error('Post failed with', err));
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
