import React from 'react';
import { Notes } from '../modules/notes'
import {Navbar} from '../components/navbar'
import { useParams } from 'react-router-dom';
import Askai from '../modules/askai';
import './homepage.css'
// import Drawer from '../components/drawer';

const HomePage = () => {
  const { username } = useParams();
  return (
    <div>
      <Navbar username = {username} /> 
      {/* <Drawer/> */}
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
          <Notes/>
        </div>
      </div>


    </div>
  );
}

export default HomePage;
