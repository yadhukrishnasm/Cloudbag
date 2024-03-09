import React, { useState, useEffect } from 'react';

const ImageViewer = (props) => {
  const [imageSrc, setImageSrc] = useState('');
  const [type,settype] = useState('')
    

  useEffect(() => {

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
        const contentspace = document.getElementById('content');
        if(type === 'image/jpeg' || type === 'image/png'){
          contentspace.innerHTML = `<img src="data:image/png;base64,${imageSrc}" width="100%" height="600px">`;
        }
        else if(type === 'application/pdf'){
          contentspace.innerHTML = `<object data="data:application/pdf;base64,${imageSrc}" width="100%" height="600px">`;
        }
        else if(type === 'text/plain'){
          contentspace.innerHTML = `<object data="data:text/plain;base64,${imageSrc}" width="100%" height="600px">`;
        }
        else{
          contentspace.textContent = imageSrc;
        }

    })
    .catch(error =>{
        console.log(error)
    })

  }, []);

  return (
    <div id="content">
    </div>
  );
};

export default ImageViewer;