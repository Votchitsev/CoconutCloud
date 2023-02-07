import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reduxStore/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../request'
import BASE_URL from '../../config'

function Username ({ username, removeCookie }) {
  const [logoutButton, setLogoutButton] = useState(false)
  const [sendRequest, setSendRequest] = useState(false)
  const token = useSelector(state => state.auth.authToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data } = useRequest(
    !sendRequest
      ? null
      : [BASE_URL + 'auth/token/logout', 'POST', null, token]
  )

  useEffect(() => {
    if (data) {
      dispatch(logout())
      removeCookie('token')
      removeCookie('username')
      navigate('/')
    }
  })

  const onMouseEnterHandler = () => {
    setLogoutButton(true)
  }

  const onMouseLeaveHandler = () => {
    setLogoutButton(false)
  }

  const onClickHandler = () => {
    setSendRequest(true)
  }

  return (
    logoutButton
      ? <div
      className='header--logout-btn'
      onMouseLeave={onMouseLeaveHandler}
      onClick={onClickHandler}
      >{'Log out'}</div>
      : <div
      className='header--logout-btn'
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      >{ username }</div>
  )
}

Username.propTypes = {
  username: PropTypes.string,
  removeCookie: PropTypes.any
}

export default Username
