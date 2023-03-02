import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FileDescription from './FileDescription'
import img from './file.png'
import './File.css'

function File ({ id, name, comment, size, upload, download, currentFile, setCurrentFile }) {
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

  const onMouseLeaveHandler = () => {
    setShowComment(false)
  }

  return (
    <>
    <div className={`file ${currentFile && currentFile.id === id ? 'current' : ''}`}
      onClick={ onClickHandler }
      onMouseOver={ onMouseOverHandler }
      onMouseLeave={ onMouseLeaveHandler }>
      <img src={ img }></img>
      <div className='file-name'>{ name }</div>
      { showComment
        ? <FileDescription
          upload={ upload }
          download={ download }
          size={ size }
          comment={ comment } />
        : null }
    </div>
    </>
  )
}

File.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  comment: PropTypes.string,
  size: PropTypes.number,
  upload: PropTypes.any,
  download: PropTypes.any,
  currentFile: PropTypes.object,
  setCurrentFile: PropTypes.func
}

export default File
