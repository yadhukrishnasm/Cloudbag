import React, { useState, useEffect } from 'react';

const ImageViewer = (props) => {
  const [imageSrc, setImageSrc] = useState('');
  const [type,settype] = useState('')
    

  useEffect(() => {
    // Fetch the PNG file from the server
    fetch('https://localhost:5000/viewfile', {
        method: 'POST',
        body:JSON.stringify({
            userid: sessionStorage.getItem('userid'),
            filename:props.filename
        })
    })
    .then(response => {
        if(response.ok){
            console.log(response)
            settype(response.contenttype)
            setImageSrc(response.content)
        }   
    })
    .catch(error =>{
        console.log(error)
    })

  }, []);

  return (
    <div>
      <h1>Image Viewer</h1>
      {/* {type ==='img' ? ( <img src={imageSrc} alt="PNG Image" />) : ( <iframe src={pdfSrc} width="100%" height="600px" title="PDF Viewer" /> )}
      {imageSrc && <img src={imageSrc} alt="PNG Image" />} */}
    </div>
  );
};

export default ImageViewer;