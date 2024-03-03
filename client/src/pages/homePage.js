import React from 'react';
import Notebook from '../modules/notebook'; // Import the Notebook component
import {Navbar} from '../components/navbar'
import { useParams } from 'react-router-dom';
import Askai from '../modules/askai';
import './styles/homepage.css'
import Drawer from '../components/drawer';

const HomePage = () => {
  const { username } = useParams();
  return (
    <div>
      <Navbar username = {username} /> 
      <Drawer/>
      <div className="viewer">
        pdf viewer
        {/* <iframe src="" width="100%" height="600px"></iframe> */}
      </div>


      <div className="sidebar">
        <div className="chat">
          <div id='chatbot'>
            <Askai />
          </div>
        </div>
        <div className="notes">
          <h2>Notebook</h2>
          <Notebook /> {/* Include the Notebook component here */}
        </div>
      </div>


    </div>
  );
}

export default HomePage;
