import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import apiRequest from '../../apiRequest'
import './signUpForm.css'
import img from './icons8-close.svg'
import { login } from '../../reduxStore/slices/authSlice'

function SignUpForm ({ setCookie }) {
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const password2 = useRef()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const body = {
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
      password2: password2.current.value
    }

    apiRequest('POST', 'registr/', body)
      .then(response => {
        if (!response.ok) {
          navigate('/404')
          return
        }
        return response.json()
      })
      .then(_ => apiRequest('POST', 'auth/token/login', {
        password: body.password,
        email: body.email
      }))
      .then(response => response.json())
      .then(response => {
        dispatch(
          login({
            token: response.auth_token,
            username: body.username
          })
        )
        setCookie('token', response.auth_token, { 'max-age': 31536000 })
        setCookie('username', body.username)
        navigate('/')
      })
  }

  return (
    <form className="sign-up-form" onSubmit={onSubmitHandler}>
      <h2 className='sign-up-form--title'>Sign Up</h2>
      <input type='email' placeholder='email' ref={email} required></input>
      <input type='text' placeholder='username' ref={username} required></input>
      <input type='text' placeholder='password' ref={password} required></input>
      <input type='text' placeholder='repeat password' ref={password2} required></input>
      <input type='submit' value='OK' required></input>
      <button className='close'><Link to='/'><img src={img} /></Link></button>
    </form>
  )
}

SignUpForm.propTypes = {
  setCookie: PropTypes.any
}

export default SignUpForm
