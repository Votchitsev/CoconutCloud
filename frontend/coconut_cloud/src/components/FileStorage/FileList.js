import React from 'react'
import PropTypes from 'prop-types'
import File from './File'
import './FileList.css'

function FileList ({ fileList }) {
  return (
    <div className='file-list-container'>
      { fileList.map(file => <File key={ file.id } name={ file.native_file_name } comment={ file.comment } />) }
    </div>
  )
}

FileList.propTypes = {
  fileList: PropTypes.array
}

export default FileList
