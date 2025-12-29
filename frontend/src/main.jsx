import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./i18n";
import './index.css'


const savedTheme = localStorage.getItem('nutriguard-theme') || 'dark'
document.documentElement.setAttribute('data-theme', savedTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
