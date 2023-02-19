import React from 'react'
import PropTypes from 'prop-types'
import File from './File'
import './FileList.css'

function FileList ({ fileList, currentFile, setCurrentFile }) {
  return (
    <div className='file-list-container'>
      { fileList.map(
        file => <File
          key={ file.id }
          id={ file.id }
          name={ file.native_file_name }
          comment={ file.comment }
          currentFile={ currentFile }
          setCurrentFile={ setCurrentFile }P
          />)
        }
    </div>
  )
}

FileList.propTypes = {
  fileList: PropTypes.array,
  currentFile: PropTypes.number,
  setCurrentFile: PropTypes.func
}

export default FileList
