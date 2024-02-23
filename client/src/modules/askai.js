import React, { useState } from 'react';

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

  return (
    <div>
      <textarea
        name="note"
        id="note"
        cols="30"
        rows="2"
      ></textarea>
      <button id='ques-search' onClick={sendQuestion}>Send</button>
      <button onClick={startListening} disabled={isListening}>
        Start Audio Search
      </button>

      <div className="container">
        {link && <img src={link} alt="Response Image" />} 
        <p className="response">{response}</p>
      </div>
    </div>
  );
}
