import React, { useState, useEffect } from 'react';
import './styles/Notebook.css'; 

const Notebook = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const sharedValue = props.sharedValue;

  useEffect(() => {
    const subNote = sharedValue.split('-')[0];
    const savedText = localStorage.getItem(`${sessionStorage.getItem("userid")}-${subNote}`);
    if (savedText) {
      setText(savedText);
    }
  }, [sharedValue]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
    const subNote = sharedValue.split('-')[0];
    localStorage.setItem(`${sessionStorage.getItem("userid")}-${subNote}`, event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };
  const subTitle = sharedValue.split('-')[0];
  return (
    <div className="notebook-container">
      <h4>{subTitle}</h4>
      <pre><i><b>Notedown your thoughts here</b> (Double click to write)</i></pre>
      {isEditing ? (
        <textarea
          autoFocus
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className="notebook-textarea"
          placeholder='Write you note here'
        ></textarea>
      ) : (
        <div
        id="n-c" 
          className="notebook-content"
          onDoubleClick={handleDoubleClick}
        >
          <pre >{text || '\u00a0'}</pre> {}
        </div>
      )}
    </div>
  );
};

export default Notebook;
