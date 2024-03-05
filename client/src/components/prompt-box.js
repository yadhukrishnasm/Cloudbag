import React from 'react';
import './styles/promptBox.css';

export const PromptBox = (props) => {
  let key = props.content;
  const handleClick = (value) => {
    
    props.onDataReturn(value,key);

  };

  return (

    <div className="prompt">
      <div className="prompt-box">
        <pre>Do you want to continue</pre>
        <button onClick={() => handleClick(true)}>{props.content}</button>
        <button onClick={() => handleClick(false)}>Cancel</button>
      </div>
    </div>
  );
};

