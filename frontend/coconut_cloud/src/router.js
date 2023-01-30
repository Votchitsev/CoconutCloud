import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './reduxStore/store'
import Header from './components/header/header'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  )
}

export default App
