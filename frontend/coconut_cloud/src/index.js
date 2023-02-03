import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import App from './router'
import store from './reduxStore/store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </CookiesProvider>
)
