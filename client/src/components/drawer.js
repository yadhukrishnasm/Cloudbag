import React, { useState, useEffect } from 'react';
import './drawer.css';
import Upload from "./upload.js"

const Drawer = () => {
  const [drawer, setHideDrawer] = useState(false);
  const [pdfArray, setPdfArray] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [upload,setUpload] = useState(false)

  useEffect(() => {
    fetchFileList();
  }, [setHideDrawer]);

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

  function toggleDrawer() {
    setHideDrawer(!drawer);
  }

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
      <div className={`drawer-button ${drawer ? 'change' : ''}`} onClick={toggleDrawer}>
        <div id='bar1'></div>
        <div id='bar2'></div>
      </div>

      <div className={`drawer-container ${drawer ? 'open' : ''}`}>

      <button className="upload-drawer-btn" onClick={()=>setUpload(!upload)}> Upload file </button>
      {upload &&(
        <Upload/>
      )}

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
    </div>
  );
};

export default Drawer;
