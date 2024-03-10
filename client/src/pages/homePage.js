import {React,useState} from 'react';
import Notebook from '../modules/notebook';
import {Navbar} from '../components/navbar';
import { useParams } from 'react-router-dom';
import Askai from '../modules/askai';
import './styles/homepage.css';
import Drawer from '../components/drawer';
import Viewer from '../components/viewer';

const HomePage = () => {
  const [sidebarWidth, setSidebarWidth] = useState(400); 
  const [sharedValue, setSharedValue] = useState('');
  
  const handleValueChange = (newValue) => {
    console.log(newValue)
    setSharedValue(newValue);
  };
  const handleResize = (newWidth) => {
    setSidebarWidth(newWidth);
  }
  // const { username } = useParams();
  return (
    <div>
      <Navbar/> 
      <Drawer onValueChange={handleValueChange}/>
      <div className="viewer">
        <Viewer sharedValue={sharedValue}/>
      </div>


      <div className="sidebar" style={{ width: sidebarWidth }}>
      <div className="resize-handle" onMouseDown={() => handleResize(sidebarWidth + 10)}></div>
        <div className="chat">
          <div id='chatbot'>
            <Askai />
          </div>
        </div>  
        <div className="notes">
          <Notebook /> 
        </div>
      </div>


    </div>
  );
}

export default HomePage
