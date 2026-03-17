import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivetAll() {
    const user = localStorage.getItem('user')
    const objUser = JSON.parse(user)
  return (
    objUser ? <Outlet /> : <Navigate to='/' />
  )
}
