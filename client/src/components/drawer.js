import React, { useState, useEffect } from 'react';
import './drawer.css';
import Upload from "./upload.js"
import {Viewer} from './viewer.js'

const Drawer = () => {
  const [drawer, setHideDrawer] = useState(false);
  const [pdfArray, setPdfArray] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [upload,setUpload] = useState(false)
  const [resUsername,setresUsername] = useState('')
  const [popup,setpopup] = useState(false)

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

  const handleFileShare=() =>{
    setpopup(!popup)
    if(selectedFile){
      fetch('http://localhost:500/sharedata',{
        method: 'POST',
        headers: {
          'Conent-Type' : 'application/json',
        },
        body: JSON.stringify({
          userid:sessionStorage.getItem('userid'),
          filename: selectedFile,
          resUsername: resUsername,
        })    
      })
      .then(response=>{
        if(response.ok){
          console.log("send successfully" + response)
        }
      })
      .catch(error=>{
        console.log(`data sharing error :${error}`)
      })
    }
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

            <button className="view" >view</button>
            <button className='share' onClick={()=>{
              setSelectedFile(content);
              handleFileShare();
            }}>share</button>
            {popup && (
              <div className="recipient">
                <label htmlFor="recipient">who do you want to send</label>      
                <input type="text" name='recipient' value={resUsername}  onChange={(e)=>{setresUsername(e.target.value)}} placeholder='Enter name'  />
                <button type="submit" id='button' onClick={()=>{
                  setpopup(!popup)
                }}>send</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drawer;
