import { Navigate, Outlet } from 'react-router-dom'

export default function PrivetIntelligence() {
    const user = localStorage.getItem('user')
    const objUser = JSON.parse(user)
  return (
    (user && (objUser.user.type_user.toLowerCase() === 'admin' || objUser.user.type_user.toLowerCase() === 'intelligence')) ? <Outlet /> : <Navigate to='/' />
  )
}
