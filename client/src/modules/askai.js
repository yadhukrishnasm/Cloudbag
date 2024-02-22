import React, { useState } from 'react';

export default function Askai() {
  const [response, setResponse] = useState('');
  const [link , setlink] = useState('')

  function sendQuestion() {
    const question = document.getElementById('note').value;
    console.log(question);

    fetch('http://localhost:5000/askai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ques: question })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResponse(data.answer);
        setlink(data.imagelink);
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
      <button id='ques-search' onClick={sendQuestion}>send</button>

      <div className="container">
        <p className="response">{response}</p>
        {link && <img src={link} alt="Response Image"  height={250} width={250}/>}
      </div>
    </div>
  );
}
