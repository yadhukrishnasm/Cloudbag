import React, { useState, useEffect } from 'react';
import './drawer.css';

const Drawer = () => {
  const [drawer, setHideDrawer] = useState(false);
  const [pdfArray, setPdfArray] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = () => {
    fetch('http://localhost:5000/filelist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: sessionStorage.getItem('userid') }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        console.log('Data fetched successfully:', data);
        setPdfArray(data);
      })
      .catch(error => {
        console.error('Error during data fetching:', error);
      });
  };

  const hide = () => {
    setHideDrawer(!drawer);
  };

  const handleFileDelete = () => {
    if (selectedFile) {
      fetch('http://localhost:5000/deletefile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: sessionStorage.getItem('userid'),
          filename: selectedFile,
        }),
      })
        .then(response => {
          if (response.ok) {
            console.log('File deleted successfully');
            fetchFileList();
          } else {
            throw new Error('Failed to delete file');
          }
        })
        .catch(error => {
          console.error('Error during file deletion:', error);
        });
    }
  };

  return (
    <div>
      <div className="drawer-button" onClick={hide}>
        drawer
      </div>
      {drawer && (
        <div className="drawer-container">
          <input type="file" />
          {pdfArray.map((content, index) => (
            <div className="files" key={index}>
              <p>{content}</p>
              <button
                className="delete"
                onClick={() => {
                  setSelectedFile(content);
                  handleFileDelete();
                }}
              >
                delete
              </button>{' '}
              <button className="view">view</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Drawer;
