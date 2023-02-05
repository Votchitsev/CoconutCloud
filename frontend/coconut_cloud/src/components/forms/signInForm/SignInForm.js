import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../reduxStore/slices/authSlice'
import useRequest from '../../../request'
import BASE_URL from '../../../config'
import '../signUpForm.css'
import img from '../icons8-close.svg'

function SignInForm ({ setCookie }) {
  const email = useRef()
  const password = useRef()
  const [sendRequest, setSendRequest] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data } = useRequest(
    !sendRequest
      ? null
      : [BASE_URL + '/auth/token/login', 'POST', {
          email: email.current.value,
          password: password.current.value
        }])

  useEffect(() => {
    if (data) {
      if (data.non_field_errors) {
        setError(data.non_field_errors[0])
        return
      }
      dispatch(
        login({
          token: data.auth_token,
          username: 'test_username'
        })
      )
      setCookie('token', data.auth_token)
      setCookie('username', 'test_username')
      navigate('/')
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
    <span>{error}</span>
    <button className='close'><Link to='/'><img src={img} /></Link></button>
  </form>
  )
}

SignInForm.propTypes = {
  setCookie: PropTypes.any
}

export default SignInForm
