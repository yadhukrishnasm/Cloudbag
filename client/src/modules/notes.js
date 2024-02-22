import React, { useState, useEffect } from 'react';

export const Notes = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const saveNote = () => {
    if (note.trim() !== '') {
      setNotes(prevNotes => [...prevNotes, note]);
      setNote('');
    }
  };

  const clearNotes = () => {
    setNotes([]);
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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
      <button onClick={clearNotes}>Clear</button>

      <div className="container">
        {notes.map((text, index) => (
          <div key={index} className="savedNote">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};
