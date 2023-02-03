import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import apiRequest from '../../apiRequest'
import { logout } from '../../reduxStore/slices/authSlice'
import { useNavigate } from 'react-router-dom'

function Username ({ username, removeCookie }) {
  const [logoutButton, setLogoutButton] = useState(false)
  const token = useSelector(state => state.auth.authToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onMouseEnterHandler = () => {
    setLogoutButton(true)
  }

  const onMouseLeaveHandler = () => {
    setLogoutButton(false)
  }

  const onClickHandler = () => {
    apiRequest('POST', 'auth/token/logout', null, token)
      .then(response => {
        if (response.ok) {
          dispatch(logout())
          removeCookie('token')
          removeCookie('username')
          return
        }
        navigate('/404')
      })
  }

  return (
    logoutButton
      ? <div
      onMouseLeave={onMouseLeaveHandler}
      onClick={onClickHandler}
      >{'Log out'}</div>
      : <div
      onMouseEnter={onMouseEnterHandler}
      >{ username }</div>
  )
}

Username.propTypes = {
  username: PropTypes.string,
  removeCookie: PropTypes.any
}

export default Username
