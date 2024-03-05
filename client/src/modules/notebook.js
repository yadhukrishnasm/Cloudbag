import React, { useState, useEffect } from 'react';
import './styles/Notebook.css'; 

const Notebook = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem(sessionStorage.getItem("userid"));
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
    localStorage.setItem(sessionStorage.getItem("userid"), event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="notebook-container">
      {isEditing ? (
        <textarea
          autoFocus
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className="notebook-textarea"
        ></textarea>
      ) : (
        <div 
          className="notebook-content"
          onDoubleClick={handleDoubleClick}
        >
          <pre>{text || '\u00a0'}</pre> {}
        </div>
      )}
    </div>
  );
};

export default Notebook;
