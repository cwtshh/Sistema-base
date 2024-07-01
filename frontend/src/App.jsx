import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import { useUserAuth } from './context/UserAuthContext'
import UserDashBoard from './pages/dashboard/user-dashboard/UserDashBoard'
import ProtectedRoute from './routes/ProtectedRoute'
import NotasHistory from './pages/notas-history/NotasHistory'
import LoginAdmin from './pages/login/login-admin/LoginAdmin'
import AdminDashBoard from './pages/dashboard/admin-dashboard/AdminDashBoard'
import ProtectedRouteAdmim from './routes/ProtectedRouteAdmin'

function App() {
  // const { user } = useUserAuth();

  // console.log(user)

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Login /> } />
            <Route path="/admin/login" element={<LoginAdmin />} />

            {/* Rotas protegidas */}
            <Route path="/user/dashboard" element={<ProtectedRoute element={UserDashBoard}/>} />
            <Route path="/user/notas/historico" element={<ProtectedRoute element={NotasHistory} />} />
            <Route path="/admin/dashboard" element={<ProtectedRouteAdmim element={AdminDashBoard} />} />
            {/* <Route path='/user/dashboard' element={ user ? (<UserDashBoard />) : (<Navigate to='/login' />)} /> */}
          </Routes>
        </BrowserRouter>

      </div>
      
    </>
  )
}

export default App
