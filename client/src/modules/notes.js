import React, { useState, useEffect } from 'react';

export const Notes = () => {
  const [note, setNote] = useState('');
  const [notesFromServer, setNotesFromServer] = useState([]);

  const saveNote = () => {
    if (note.trim() !== '') {
      addToServer(note);
      setNote('');
    }
  };

  const clearWhole = () => {
    clearNotesOnServer();

    setNotesFromServer([]);
  };

  const addToServer = (newText) => {
    fetch('http://localhost:3000/saveNote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: newText })
    })
      .then(response => response.json())
      .then(dbsavedNote => {
        setNotesFromServer(prevNotes => [...prevNotes, dbsavedNote.note]);
      })
      .catch(error => {
        console.error('Error during saving note:', error);
      });
  };

  const clearNotesOnServer = () => {
    // Make a request to your server to clear all notes
    fetch('http://localhost:3000/clearNotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(`response of saved notes from server :: ${responseData}`)
      })
      .catch(error => {
        console.error('Error during clearing notes ::', error);
      });
  };

  useEffect(() => {
    // Retrieve notes from the server on page load
    fetch('http://localhost:3000/getNotes')
      .then(response => response.json())
      .then(notes => {
        setNotesFromServer(notes);
      })
      .catch(error => {
        console.error('Error during getting notes:', error);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <textarea 
          name="note"
          id="note"
          cols="30"
          rows="2"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <button onClick={saveNote}>Save</button>
      <button onClick={clearWhole}>Clear</button>

      <div className="container">
        {notesFromServer.map((text, index) => (
          <div key={index} className="savedNote">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};
