import React from 'react';
import { Notes } from '../modules/notes'

function HomePage() {
  return (
    <div>
      <h1>Welcome to the homepage!</h1>
      {/* Content for the homepage */}
      <Notes/>
    </div>
  );
}

export default HomePage;
