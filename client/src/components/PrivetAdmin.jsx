import { Navigate, Outlet } from 'react-router-dom'

export default function PrivetAdmin() {
    const user = localStorage.getItem('user')
    const objUser = JSON.parse(user)
  return (
    (user && objUser.user.type_user.toLowerCase() === 'admin') ? <Outlet /> : <Navigate to='/' />
  )
}
