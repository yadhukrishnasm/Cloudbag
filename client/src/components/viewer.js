import React, { useState, useEffect } from 'react';
import './styles/viewer.css';

const Viewer = (props) => {
  const [imageSrc, setImageSrc] = useState('');
  const [type, setType] = useState('');
  const sharedValue = props.sharedValue

  
  useEffect(() => {
    if (sharedValue) {
      fetch('http://localhost:5000/viewfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: sessionStorage.getItem('userid'),
          filename: sharedValue,
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json(); // Assuming your response is in JSON format
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .then(data => {
          console.log('Data fetched successfully:', data);

          setType(data.contenttype);
          setImageSrc(data.content);
        })
        .catch(error => {
          console.error('Error during data fetching:', error);
        });
    }
  }, [sharedValue]); // Ensure useEffect runs when sharedValue changes

  return (
    <div id="content">

      {type === 'image/jpeg' || type === 'image/png' ? (
        <img src={`data:image/png;base64,${imageSrc}`} width="100%" height="600px" alt="Image" />
      ) : type === 'application/pdf' ? (
        <object data={`data:application/pdf;base64,${imageSrc}`} width="100%" height="600px" type="application/pdf">
          PDF Viewer not available. Download the PDF to view.
        </object>
      ) : type === 'text/plain' ? (
        <pre>{atob(imageSrc)}</pre>
      ) : type === 'audio/mpeg' ? (
        <audio controls>
          <source src={`data:${type};base64,${imageSrc}`} type={type}/>
        </audio>
      ) : (
        <div>{atob(imageSrc)}</div>
      )}
    </div>
  );
};

export default Viewer;
