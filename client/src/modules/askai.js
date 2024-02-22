import React, { useState } from 'react'

export default function Askai() {
    const [response , setResponse] = useState('');

    function sendQuestion(question){
        fetch('http://localhost:3000/askai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ques: question })
        })
        .then((responseData) => {
            console.log(responseData);
            setResponse(responseData)
        })
        .catch(error => {
            console.error('Error during saving note:', error);
        });
    }



  return (
    <div>
      <textarea
        name="note"
        id="note"
        cols="30"
        rows="2"
      ></textarea>
      <button id='ques-search' onClick={ sendQuestion((e)=> e.target.value) }></button>

      <div className="container">
        <p className="response">{ response }</p>
      </div>
      
    </div>
  )
}
