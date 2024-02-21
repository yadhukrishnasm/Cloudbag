import React from 'react';
import { Notes } from '../modules/notes'
import {Navbar} from '../components/navbar'
import { useParams } from 'react-router-dom';
import './homepage.css'

const HomePage = ({ match }) => {
  const { username } = useParams();
  console.log({username})
  return (
    <div>
      <Navbar username = {username} /> 
      <div className="viewer">
        pdf viewer
      </div>

      <div className="sidebar">
        <div className="chat">
          chat bot
        </div>
        <div className="notes">
          <Notes/>
        </div>
      </div>


    </div>
  );
}

export default HomePage;
