import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../reduxStore/slices/authSlice'
import { logOut } from '../../api/requests'

function Username ({ username }) {
  const [logoutButton, setLogoutButton] = useState(false)
  const [sendRequest, setSendRequest] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await logOut()

      if (response.ok) {
        dispatch(logout())

        navigate('/')
      }
    }

    if (sendRequest) {
      fetchData()
      setSendRequest(false)
    }
  }, [sendRequest])

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
  username: PropTypes.string
}

export default Username
