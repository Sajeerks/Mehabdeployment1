import React from 'react'
import './TextError.css'


const TextError = (props) => {
  return (
    <div className='errorForFromCreated'>

        {props.children}
    </div>
  )
}

export default TextError