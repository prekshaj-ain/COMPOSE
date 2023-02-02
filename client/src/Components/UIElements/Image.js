import React from 'react'
import './Image.css'
function Image(props) {
  let {src} = props;
  if(src === ''){
    src = '/Assets/ProfilePicture.png'
  }
  return (
    <img src={src} alt={props.alt} className={`image-ui ${props.className}`} style={props.style} />
  )
}

export default Image;