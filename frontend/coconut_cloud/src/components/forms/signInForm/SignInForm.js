import React, { useEffect, useRef, useState } from 'react'
import img from '../icons8-close.svg'
import { Link, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { login } from '../../../reduxStore/slices/authSlice'
import '../signUpForm.css'

const fetcher = ([url, method, data]) => fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(response => response.json())
  .then(json => json)

function SignInForm () {
  const email = useRef()
  const password = useRef()

  const [sendRequest, setSendRequest] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { data } = useSWR(
    !sendRequest
      ? null
      : ['http://127.0.0.1:3001/auth/token/login', 'POST', {
          email: email.current.value,
          password: password.current.value
        }], fetcher)

  useEffect(() => {
    if (data) {
      if (data) {
        dispatch(
          login({
            token: data.auth_token,
            username: 'test_username'
          })
        )
        navigate('/')
      }
    }
  }, [data])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setSendRequest(true)
  }

  return (
    <form className="form" onSubmit={ onSubmitHandler }>
    <h2 className='form--title'>Sign In</h2>
    <input type='email' ref={ email } placeholder='email' required></input>
    <input type='password' ref={ password }placeholder='password' required></input>
    <input type='submit' value='OK' required></input>
    <button className='close'><Link to='/'><img src={img} /></Link></button>
  </form>
  )
}

export default SignInForm
