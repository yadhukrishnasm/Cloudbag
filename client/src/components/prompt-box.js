import React from 'react';
import './styles/promptBox.css';

export const PromptBox = (props) => {
  const handleClick = (value) => {
    props.onDataReturn(value);
  };

  return (
    <div className="prompt">
      <div className="prompt-box">
        <pre>Do you want to logout</pre>
        <button onClick={() => handleClick(true)}>{props.type}</button>
        <button onClick={() => handleClick(false)}>Cancel</button>
      </div>
    </div>
  );
};

