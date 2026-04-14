import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import './i18n'

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
