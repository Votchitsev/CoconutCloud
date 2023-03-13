import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './router'
import store from './reduxStore/store'
import ContextProvider from './globalState/provider'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={ store }>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>
)
