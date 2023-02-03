import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Username from './Username'
import './header.css'

function Header ({ removeCookie }) {
  const isAuth = useSelector(state => state.auth.authToken)
  const username = useSelector(state => state.auth.username)

  return (
    <section className="header">
      <div className='header--logo'><Link to='/'>CoconutCloud</Link></div>
      <div className='header--menu-container'>{
        !isAuth
          ? <>
              <div className='header--menu-container--item'>Sign in</div>
              <div className='header--menu-container--item'><Link to='/sign-up'>Sign up</Link></div>
            </>
          : <Username username={ username } removeCookie={ removeCookie }/>
      }</div>
    </section>
  )
}

Header.propTypes = {
  removeCookie: PropTypes.any
}

export default Header
