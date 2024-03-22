import React, { useState, useEffect ,useRef} from 'react';
import './drawer.css';
import Upload from "./upload.js"
import Popup from "./popup.js"
import Loading from './loading.js';
import { PromptBox } from './prompt-box.js';

const Drawer = ({onValueChange}) => {
  const [drawer, setHideDrawer] = useState(false);
  const [pdfArray, setPdfArray] = useState([]);
  const [upload, setUpload] = useState(false);
  const [resUsername, setResUsername] = useState('');
  const [resname, setResname] = useState(false);
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [prompt,setprompt] = useState(false)
  const [type,setType] = useState('')
  const [loading,setloading] = useState(false)
  let selectedFile = useRef('');
 

  useEffect(() => {
    fetchFileList();
  },[upload,drawer]);

 
  const handlePopup = (msg) => {
    setMessage(msg);
    setPopup(true);

    setTimeout(() => {
      setPopup(false);
      setMessage(''); 
    }, 3000);
  }

  const fetchFileList = () => {
    setloading(!loading)
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
        handlePopup('Failed to fetch file list');
      });
  };

  function toggleDrawer() {
    setHideDrawer(!drawer);
  }

  const handleFileShare = () => {
    setResname(!resname);
    console.log(selectedFile.current);
    setloading(!loading);
    if (selectedFile.current && resUsername) {
      fetch('http://localhost:5000/sharedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: sessionStorage.getItem('userid'),
          filename: selectedFile.current,
          resUsername: resUsername,
        }),
      })
        .then(response => {
          if (response.ok) {
            console.log(response);
            handlePopup('File successfully shared to '+resUsername);
            
          } else {
            throw new Error('Failed to share file');
          }
        })
        .catch(error => {
          console.error(`Data sharing error: ${error}`);
          handlePopup('Failed to share file');
        });
    } else {
      handlePopup('Please enter a recipient');
    }
  }

  const handleFileDelete = () => {
    console.log(selectedFile.current);
    setloading(!loading)
    if (selectedFile.current) {
      fetch('http://localhost:5000/deletefile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: sessionStorage.getItem('userid'),
          filename: selectedFile.current,
        }),
      })
        .then(response => response.text())
        .then(data=>{
          fetchFileList();
          handlePopup(data);
          console.log(data)
        })
        .catch(error => {
          console.error('Error during file deletion:', error);
          handlePopup('Failed to delete file');
        });
    }

  };

  const setfilename =(value)=>{
    selectedFile.current = value;
  }

  const showPrompt =(message)=>{  
    setType(message)
    setprompt(!prompt)
  }

  const handleDataReturn = (data,key)=>{
    if(data){
      handleFileDelete()
    }
    setprompt(!prompt)
  }
  

  
  return (
    <div>
      <div className={`drawer-button ${drawer ? 'change' : ''}`} onClick={toggleDrawer}>
        <div id='bar1'></div>
        <div id='bar2'></div>
      </div>


      {prompt && (
        <PromptBox onDataReturn={handleDataReturn} content={type}/>
        )}
      <div className={`drawer-container ${drawer ? 'open' : ''}`}>

        <button className="upload-drawer-btn" onClick={() => setUpload(!upload)}> Upload file </button>
        {upload && (
          <Upload />
          )}
        <hr width="100%" size="2" color='black' />
        {loading &&(
          <Loading/>
        )}
        {pdfArray.map((content, index) => (
          <div className="files" key={index}>
            <pre className='filename' onClick={()=>{
              console.log(content)
              setHideDrawer(!drawer)
              onValueChange(content);
              //   (prevContent) => {
              //   if (prevContent !== content) {
              //     console.log(content)
              //     return content;
              //   }
              //   return prevContent;
              // });
            }}>{content}</pre>
            <br />

            <div className="buttons-container">
              <button className="buttons delete" id={index} onClick={() => {
                setfilename(content);
                showPrompt('Delete')
              }}> </button>

              <button className=' buttons share' onClick={() => {
                setfilename(content);
                setResname(!resname);
              }}></button>
            </div>
            <hr width="90%" size="1" color='black' />
          </div>
        ))}
      </div>

      {resname && (
        <div className="recipient">
          <label htmlFor="recipient" id='recipient-label'>Who do you want to send</label>
          <input type="text" name='recipient' id='recipient-input' value={resUsername} onChange={(e) => { setResUsername(e.target.value) }} placeholder='Enter name' />
          <button type="submit" id='button-send' onClick={() => {
            handleFileShare();
            setResname(!resname);
          }}>Send</button>
        </div>
      )}

      {popup && (
      <Popup msg={message} />
      )}
    </div>
  );
};

export default Drawer;
