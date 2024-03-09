import {React,useState} from 'react'
import './styles/popup.css'

export default function popup({msg}) {
    // const [msg,setMsg] = useState('');
    
  return (
    <div className='popupContainer'>
        <pre>{msg}</pre>
    </div>
  )
}
