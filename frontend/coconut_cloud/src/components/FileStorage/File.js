import React from 'react'
import PropTypes from 'prop-types'
import img from './file.png'
import './File.css'

function File ({ name, comment }) {
  return (
    <div className='file'>
      <img src={img}></img>
      <div className='file-name'>{ name }</div>
      <div className='file-comment'>{ comment }</div>
    </div>
  )
}

File.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string
}

export default File
