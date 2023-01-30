import React from 'react'
import './header.css'
import { useSelector } from 'react-redux'

function Header (props) {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <section className="header">
      <div className='header--logo'>CoconutCloud</div>
      <div className='header--menu-container'>{
        !isAuth
          ? <>
              <div className='header--menu-container--item'>Sign in</div>
              <div className='header--menu-container--item'>Sign up</div>
            </>
          : null
      }</div>
    </section>
  )
}

export default Header
