import React, { useState } from 'react'
import PropTypes from 'prop-types'
import img from './file.png'
import './File.css'

function File ({ id, name, comment, currentFile, setCurrentFile }) {
  const [showComment, setShowComment] = useState(false)

  const onClickHandler = () => {
    if (currentFile && currentFile.id === id) {
      setCurrentFile()
      return
    }

    setCurrentFile({
      id,
      native_file_name: name,
      comment
    })
  }

  const onMouseOverHandler = () => {
    setShowComment(true)
  }

  return (
    <>
    <div className={`file ${currentFile && currentFile.id === id ? 'current' : ''}`} onClick={ onClickHandler } onMouseOver={ onMouseOverHandler }>
      <img src={ img }></img>
      <div className='file-name'>{ name }</div>
      { showComment ? <div className='file-comment'>{ comment }</div> : null }
    </div>
    </>
  )
}

File.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  comment: PropTypes.string,
  currentFile: PropTypes.object,
  setCurrentFile: PropTypes.func
}

export default File
