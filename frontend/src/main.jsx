import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserAuthProvider } from './context/UserAuthContext.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </AdminAuthProvider>
  </React.StrictMode>
)
