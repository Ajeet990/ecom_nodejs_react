import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Users from '../components/Users'
import About from '../components/About'
import Login from '../components/Login'
import Register from '../components/Register'

const MyRouter = () => {
  return (
    <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default MyRouter