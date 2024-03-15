import React from 'react';
import './styles/promptBox.css';

export const PromptBox = (props) => {
  let key = props.content;
  const handleClick = (value) => {
    if(value){
    props.onDataReturn(value,key);
    }else{
      props.onDataReturn(value)
    }

  };

  return (

    <div className="prompt">
      <div className="prompt-box">
        <pre>Do you want to continue</pre>
        <div className="prompt-buttons">
          <button onClick={() => handleClick(true)}>{props.content}</button>
          <button onClick={() => handleClick(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

