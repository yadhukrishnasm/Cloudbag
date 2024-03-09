import React, { useState } from 'react';
import './styles/askai.css';

const Askai = () => {
  const [response, setResponse] = useState('');
  const [link, setLink] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsListening(true);
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        document.getElementById('ques-InputBox').value = result;
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
      body: JSON.stringify({ ques: question }),
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
    const question = document.getElementById('ques-InputBox').value;
    sendQuestion(question);
  };

  return (
    <div>
      <pre>Ask AI</pre>
      <form onSubmit={handleSubmit} className='search-form'>
        <input type='text' name="note" id='ques-InputBox' />
        <button type="submit" id='ques-search'></button>
        <button onClick={startListening} disabled={isListening} id='ques-mic'></button>
      </form>

      <div className="container">
        {link && <img src={link} alt="Response" width={200} />} 
        <p className={response ? "response" : ""}>{response}</p>
      </div>
    </div>
  );
};

export default Askai;

