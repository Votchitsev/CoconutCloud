import React, { useRef, useState } from 'react'
import './FileInput.css'

function FileInput () {
  const file = useRef()
  const [fileChosen, setFileChosen] = useState()

  const onChangeHandler = () => {
    setFileChosen(file.current.files)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(fileChosen)
    setFileChosen()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='input-wrapper button'>
        <input type='file' id='input_file' ref={file} onChange={onChangeHandler}></input>
        <label htmlFor='input_file'>
          <span>Add file</span>
        </label>
        { fileChosen && fileChosen.length
          ? <span className='preview'>{ fileChosen.item(0).name }</span>
          : null }
        </div>
        { fileChosen && fileChosen.length
          ? <input type={'submit'} value={'send'}/>
          : null }
    </form>
  )
}

export default FileInput
