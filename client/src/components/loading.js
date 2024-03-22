import React from 'react'

function Loading(props) {
  return (
    <div>
            <div class="loading-text">{props.text}<span class="blinking-dots">...</span></div>
    </div>
  )
}

export default Loading