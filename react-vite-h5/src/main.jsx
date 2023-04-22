import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import 'lib-flexible/flexible.js'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
