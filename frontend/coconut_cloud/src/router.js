import React from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Header from './components/header/Header'
import SignUpForm from './components/forms/signUpForm/SignUpForm'
import SignInForm from './components/forms/signInForm/SignInForm'
import AdminPanel from './components/adminPanel/AdminPanel'

function App () {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
