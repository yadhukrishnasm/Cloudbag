import {React,useState} from 'react'
export default function popup(props) {
    // const [msg,setMsg] = useState('');
    
  return (
    <div className='popupContainer'>
        <pre>{props.msg}</pre>
    </div>
  )
}
