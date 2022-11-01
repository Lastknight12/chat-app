import React, { useContext } from 'react'
import Register from './pages/Register/Register'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login/Login';
import "./style.scss"
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';


const App = () => {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={currentUser && <ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App