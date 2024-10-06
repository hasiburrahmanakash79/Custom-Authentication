
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Authentication/Login'
import SignUp from './Authentication/Signup'
import Home from './Pages/Home'
import { useState } from 'react'
import RefreshHandler from '../RefreshHandler'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  )
}

export default App
