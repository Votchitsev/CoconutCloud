import React from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import Header from './components/header/header'
import SignUpForm from './components/signUpForm/SignUpForm'
import { getFromCookie } from './reduxStore/slices/authSlice'

function App () {
  const [cookie, setCookie, removeCookie] = useCookies(['token', 'username'])
  const dispatch = useDispatch()

  dispatch(
    getFromCookie({
      token: cookie.token,
      username: cookie.username
    })
  )

  return (
      <Router>
        <Header cookie={ cookie } removeCookie={ removeCookie }/>
        <Routes>
          <Route path='/sign-up' element ={<SignUpForm setCookie={ setCookie }/>} />
        </Routes>
      </Router>
  )
}

export default App
