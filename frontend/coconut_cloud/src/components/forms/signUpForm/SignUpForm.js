import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../../../config'
import useRequest from '../../../request'
import '../signUpForm.css'
import img from '../icons8-close.svg'

function SignUpForm () {
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const password2 = useRef()

  const navigate = useNavigate()

  const [sendPostRequest, setSendRequest] = useState(false)
  const [err, setError] = useState()

  const { data } = useRequest(
    !sendPostRequest
      ? null
      : [BASE_URL + 'registr/', 'POST', {
          email: email.current.value,
          username: username.current.value,
          password: password.current.value,
          password2: password2.current.value
        }]
  )

  useEffect(() => {
    if (data) {
      if (!data.ok) {
        data.ok = null
        setError(Object.values(data))
        setSendRequest(false)
        return
      }
      navigate('/sign-in/')
    }
  }, [data])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setSendRequest(true)
  }

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2 className='form--title'>Sign Up</h2>
      <input type='email' placeholder='email' ref={email} required></input>
      <input type='text' placeholder='username' ref={username} required></input>
      <input type='password' placeholder='password' ref={password} required></input>
      <input type='password' placeholder='repeat password' ref={password2} required></input>
      <input type='submit' value='OK' required></input>
          { err ? err.map(a => <span key={err.indexOf(a)} >{ a }</span>) : null }
      <button className='close'><Link to='/'><img src={img} /></Link></button>
    </form>
  )
}

export default SignUpForm
