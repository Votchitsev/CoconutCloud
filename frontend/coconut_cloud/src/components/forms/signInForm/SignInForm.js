import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Preloader from '../../preloader/Preloader'
import { login } from '../../../reduxStore/slices/authSlice'
import { logIn } from '../../../api/requests'
import '../signUpForm.css'
import img from '../icons8-close.svg'

function SignInForm () {
  const email = useRef()
  const password = useRef()
  const [sendRequest, setSendRequest] = useState(false)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const response = await logIn(email.current.value, password.current.value)
      const data = await response.json()

      if (!response.ok) {
        setError(Object.values(data))
        setSendRequest(false)
        setIsLoading(false)
        return
      }

      dispatch(
        login({
          token: data.auth_token,
          username: 'test_username'
        })
      )

      navigate('/my-storage/')

      setSendRequest(false)
      setIsLoading(false)
    }

    if (sendRequest) {
      fetchData()
    }
  }, [sendRequest])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setSendRequest(true)
  }

  return (
    <>
    <form className="form" onSubmit={ onSubmitHandler }>
      <h2 className='form--title'>Sign In</h2>
      <input type='email' ref={ email } placeholder='email' required></input>
      <input type='password' ref={ password }placeholder='password' required></input>
      <input type='submit' value='OK' required></input>
      <span>{error}</span>
      <button className='close'><Link to='/'><img src={img} /></Link></button>
    </form>
    { isLoading ? <Preloader /> : null }
    </>
  )
}

export default SignInForm
