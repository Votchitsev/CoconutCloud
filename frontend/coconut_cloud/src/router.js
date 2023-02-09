import React from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import Header from './components/header/header'
import SignUpForm from './components/forms/signUpForm/SignUpForm'
import SignInForm from './components/forms/signInForm/SignInForm'
import AdminPanel from './components/adminPanel/AdminPanel'
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
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm setCookie={ setCookie }/>} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
