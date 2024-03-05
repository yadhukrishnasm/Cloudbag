import {React,useState} from 'react'
import './styles/upload.css'
export default function Upload() {

    const [subname, setSubname] = useState('');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        setFile(Array.from(e.dataTransfer.files));
    };
    const handleFileSelect = (e) => {
        setFile(Array.from(e.dataTransfer.files));
      };
    const upload = async () => {
        if (!file) {
          console.log('No file selected');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userid', sessionStorage.getItem('userid'));
        formData.append('subname', subname);
    
        try {
          const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            console.log('File uploaded successfully');
          } else {
            console.error('Failed to upload file');
          }
        } catch (error) {
          console.error('Error during file upload:', error);
        }
      };
    
  return (
    <div className='upload-container'>
        <div
      className={`file-drop-box ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <pre>Drag and drop files here</pre>
      <label htmlFor="fileInput">or choose files</label>
      <input
        type="file"
        id="fileInput"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>


        <br />
        <label htmlFor="cars" id='select-label'>Choose subject :</label>
        <select
        id="select-subname"
        name="cars"
        onChange={(e) => setSubname(e.target.value)}>

        <option value="volvo">Math</option>
        <option value="saab">English</option>
        <option value="mercedes">Biology</option>
        <option value="audi">Computer Science</option>
        </select>

        <button onClick={upload}>Upload</button>
    </div>
    
  )
}
