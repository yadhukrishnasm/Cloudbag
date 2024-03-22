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
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileSelect = (e) => {
        console.log(e.target.files) 
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const upload = async () => {
      if (!file) {
        console.log('No file selected');
        return;
      }
      
      const formData = new FormData();
      console.log(file)
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

        <option value="math">Maths</option>
        <option value="computer network">Computer Network</option>
        <option value="operating system">Operating System</option>
        <option value="android">Android</option>
        <option value="english">English</option>
        <option value="biology">Biology</option>
        <option value="computerScience">Computer Science</option>
        </select>

        <button onClick={upload}>Upload</button>
    </div>
    
  )
}
