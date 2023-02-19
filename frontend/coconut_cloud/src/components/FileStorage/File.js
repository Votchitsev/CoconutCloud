import React from 'react'
import PropTypes from 'prop-types'
import img from './file.png'
import './File.css'

function File ({ id, name, comment, currentFile, setCurrentFile }) {
  const onClickHandler = () => {
    setCurrentFile(id)
  }

  return (
    <div className={`file ${currentFile === id ? 'current' : ''}`} onClick={ onClickHandler }>
      <img src={ img }></img>
      <div className='file-name'>{ name }</div>
      <div className='file-comment'>{ comment }</div>
    </div>
  )
}

File.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  comment: PropTypes.string,
  currentFile: PropTypes.number,
  setCurrentFile: PropTypes.func
}

export default File
