import React, { useState, useEffect } from 'react';

export const Notes = () => {
  const [note, setNote] = useState('');

  const saveNote = () => {
    if (note.trim() !== '') {
      addToStorage(note);
      setNote('');
    }
  };

  const clearWhole = () => {
    localStorage.clear();
    // Remove all notes from the UI
    const savedNotes = document.querySelectorAll('.savedNote');
    savedNotes.forEach((note) => note.remove());
  };

  const addToStorage = (newText) => {
    const existingTexts = JSON.parse(localStorage.getItem('textsArray')) || [];
    existingTexts.push(newText);
    localStorage.setItem('textsArray', JSON.stringify(existingTexts));
    createNoteUI(newText);
  };

  const createNoteUI = (text) => {
    const container = document.querySelector('.container');

    const divbox = document.createElement('div');
    divbox.className = 'savedNote';
    divbox.innerHTML = text;

    const delbtn = document.createElement('button');
    delbtn.className = 'delete';
    delbtn.textContent = 'remove';
    delbtn.addEventListener('click', () => {
      divbox.remove();
      removeFromStorage(text);
    });

    divbox.appendChild(delbtn);
    container.appendChild(divbox);
  };

  const removeFromStorage = (textToRemove) => {
    const existingTexts = JSON.parse(localStorage.getItem('textsArray')) || [];
    const updatedTexts = existingTexts.filter((text) => text !== textToRemove);
    localStorage.setItem('textsArray', JSON.stringify(updatedTexts));
  };

  useEffect(() => {
    // Load notes from localStorage on component mount
    if (localStorage.getItem('textsArray')) {
      const storedTexts = JSON.parse(localStorage.getItem('textsArray'));
      storedTexts.forEach((text) => createNoteUI(text));
    }
  }, []);

  return (
    <div>
      <h1 id="notit">notit extension</h1>
      <div className="container">
        <textarea
          name="note"
          id="note"
          cols="30"
          rows="10"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <button onClick={saveNote}>Save</button>
      <button onClick={clearWhole}>Clear</button>
    </div>
  );
};


