import React from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './reduxStore/store'
import Header from './components/header/header'
import SignUpForm from './components/signUpForm/SignUpForm'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path='/sign-up' element ={<SignUpForm />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
