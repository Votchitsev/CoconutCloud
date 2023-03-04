import React from 'react'
import PropTypes from 'prop-types'
import { deleteFile } from '../../../api/requests'
import '../signUpForm.css'
import img from '../icons8-close.svg'

function DeleteFileSubmitForm ({ token, currentFile, setForm, setFiles }) {
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const response = await deleteFile(token, currentFile.id)
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
      <h2 className='form--title'>Are you sure you want to delete the file?</h2>
      <input type='submit' value='Yes' required></input>
      <button className='close' onClick={ onCloseHandler }><img src={img} /></button>
      <div className='no' onClick={ onCloseHandler }>No</div>
    </form>
  )
}

DeleteFileSubmitForm.propTypes = {
  token: PropTypes.string,
  currentFile: PropTypes.object,
  setForm: PropTypes.func,
  setFiles: PropTypes.func
}

export default DeleteFileSubmitForm
