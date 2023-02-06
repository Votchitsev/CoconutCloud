import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../../../config'
import useRequest from '../../../request'
import '../signUpForm.css'
import img from '../icons8-close.svg'

function SignUpForm () {
  const email = useRef()
  const username = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const password = useRef()
  const password2 = useRef()

  const navigate = useNavigate()

  const [sendPostRequest, setSendRequest] = useState(false)
  const [page, setPage] = useState(1)
  const [formData, setFormData] = useState({})
  const [err, setError] = useState()

  // const { data } = useRequest(
  //   !sendPostRequest
  //     ? null
  //     : [BASE_URL + 'registr/', 'POST', {
  //         email: email.current.value,
  //         username: username.current.value,
  //         password: password.current.value,
  //         password2: password2.current.value,
  //         first_name: firstName ? firstName.current.value : null,
  //         last_name: lastName ? lastName.current.value : null
  //       }]
  // )

  const { data } = useRequest(
    !sendPostRequest
      ? null
      : [BASE_URL + 'registr/', 'POST', formData]
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
    if (page === 1) {
      setFormData({
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        password2: password2.current.value
      })
      setPage(2)
      email.current.value = ''
      username.current.value = ''
      return
    }
    const secondPageFormData = {
      first_name: firstName ? firstName.current.value : null,
      last_name: lastName ? lastName.current.value : null
    }
    setFormData(Object.assign(formData, secondPageFormData))
    setSendRequest(true)
  }

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2 className='form--title'>Sign Up</h2>
      {page === 1
        ? <>
      <input type='email' placeholder='email*' ref={email} required></input>
      <input type='text' placeholder='username*' ref={username} required></input>
      <input type='password' placeholder='password*' ref={password} required></input>
      <input type='password' placeholder='repeat password*' ref={password2} required></input>
      <input type='submit' value='OK'></input>
      </>
        : <>
        <input type='text' placeholder='first name' ref={firstName} ></input>
        <input type='text' placeholder='last name' ref={lastName} ></input>
        <input type='submit' value='OK'></input>
        </>
      }
        { err ? err.map(a => <span key={err.indexOf(a)} >{ a }</span>) : null }
      <button className='close'><Link to='/'><img src={img} /></Link></button>
    </form>
  )
}

export default SignUpForm
