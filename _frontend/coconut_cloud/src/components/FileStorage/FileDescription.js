import React from 'react'
import PropTypes from 'prop-types'
import './File.css'

function FileDescription ({ upload, download, size, comment }) {
  return (
    <div className='file-description'>
      <div className='file-description--item'>
        <div className='file-description--item--name'>Upload date</div>
        <div className='file-description--item--content'>{ upload }</div>
      </div>
      <div className='file-description--item'>
        <div className='file-description--item--name'>Last download</div>
        <div className='file-description--item--content'>{ download }</div>
      </div>
      <div className='file-description--item'>
        <div className='file-description--item--name'>size</div>
        <div className='file-description--item--content'>{ size }</div>
      </div>
      <div className='file-description--item'>
        <div className='file-description--item--name'>Comment</div>
        <div className='file-description--item--content'>{ comment }</div>
      </div>
    </div>
  )
}

FileDescription.propTypes = {
  upload: PropTypes.any,
  download: PropTypes.any,
  size: PropTypes.number,
  comment: PropTypes.string
}

export default FileDescription
