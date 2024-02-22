import React, { useState } from 'react';
import './drawer.css'; 

const Drawer = () => {
  const [pdf , setpdf] = useState("pdf")
  
  function deletePdf(){
    setpdf('deleted')
  }

  return (
    <div>
      <div className="drawer">
        contents
        <ul>
            <li> { pdf } </li>
            <button className='delete' onClick={ deletePdf }>delete</button> <button className='view'>view</button>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
