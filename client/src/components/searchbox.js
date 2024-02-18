import React from 'react'
import './searchbox.css'

export default function searchbox() {
  return (
    <div classname = "searchbox">
      <input type="text" name="search" id="searchBox" />
      <button type="submit">search</button>
    </div>
  )
}
