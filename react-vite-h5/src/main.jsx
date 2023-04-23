import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import 'lib-flexible/flexible.js'
import App from './App.jsx'
import {
  BrowserRouter as Router,
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router> 
  </React.StrictMode>,
  // document.getElementById('root')
)
