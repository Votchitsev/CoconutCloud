import React, { useRef } from 'react'
import apiRequest from '../../apiRequest'
import './signUpForm.css'

function SignUpForm (props) {
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const password2 = useRef()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const body = {
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
      password2: password2.current.value
    }

    const response = apiRequest('POST', 'registr/', body)
    response.then(response => response.json())
      .then(response => console.log(response))
  }

  return (
    <form className="sign-up-form" onSubmit={onSubmitHandler}>
      <h2 className='sign-up-form--title'>Sign Up</h2>
      <input type='email' placeholder='email' ref={email}></input>
      <input type='text' placeholder='username' ref={username}></input>
      <input type='text' placeholder='password' ref={password}></input>
      <input type='text' placeholder='repeat password' ref={password2}></input>
      <input type='submit' value='OK'></input>
    </form>
  )
}

export default SignUpForm
