import React, { useState } from 'react';
import './styles/askai.css';

export default function Askai() {
  const [response, setResponse] = useState('');
  const [link, setLink] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsListening(true);
      const recognition =
        new window.SpeechRecognition() || new window.webkitSpeechRecognition(); // Use the available constructor
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        document.getElementById('note').value = result;
        sendQuestion(result);
        recognition.stop();
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in your browser.');
    }
  };

  const sendQuestion = (question) => {
    console.log(question);

    fetch('http://localhost:5000/askai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ques: question })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data.answer);
        setLink(data.imagelink);
      })
      .catch((error) => {
        console.error('Error during saving note:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = document.getElementById('note').value;
    sendQuestion(question);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <pre>Ask AI</pre>
        <input type='text' 
        name="note"
        id="ques-InputBox"
        cols="50">
        </input>
        <button id='ques-search' type="submit">Send</button>
      </form>
      <button onClick={startListening} disabled={isListening}>
        Start Audio Search
      </button>

      <div className="container">
        <p className="response">{response}</p>
        {link && <img src={link} alt="Response" width={100}px  />} 
      </div>
    </div>
  );
}






