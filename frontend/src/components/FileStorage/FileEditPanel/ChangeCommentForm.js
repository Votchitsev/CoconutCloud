import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { patchFile } from '../../../api/requests'
import '../../formStyle/Form.css'
import img from '../../formStyle/icons8-close.svg'

function ChangeCommentForm ({ currentFile, setForm, setFiles }) {
  const newComment = useRef()

  useEffect(() => {
    newComment.current.value = currentFile.comment
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const patchData = currentFile
    patchData.comment = newComment.current.value

    const response = await patchFile(patchData)
    const data = await response.json()

    if (response.ok) {
      setFiles(data)
      setForm()
    }
  }

  const onCloseHandler = () => {
    setForm()
  }

  return (
    <form className='form' onSubmit={ onSubmitHandler }>
      <h2 className='form-title'>Rename file</h2>
      <textarea type='text' placeholder='New comment' ref={ newComment }></textarea>
      <input type='submit' value='OK' required></input>
      <button className='close' onClick={ onCloseHandler }><img src={img} /></button>
    </form>
  )
}

ChangeCommentForm.propTypes = {
  token: PropTypes.string,
  currentFile: PropTypes.object,
  setForm: PropTypes.func,
  setFiles: PropTypes.func
}

export default ChangeCommentForm
