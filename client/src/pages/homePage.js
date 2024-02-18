import React from 'react';
import { Notes } from '../modules/notes'
import {Navbar} from '../components/navbar'

function HomePage() {
  return (
    <div>
      <Navbar/> 
      <Notes/>
    </div>
  );
}

export default HomePage;
