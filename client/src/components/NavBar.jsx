import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

    const user = localStorage.getItem('user')
    const objUser = JSON.parse(user)

    const navigate = useNavigate() 
    function toHome(){
        navigate('/home')
    }
    function toadd(){
        navigate('/Add-Launcher')
    }
    function toRegister(){
        navigate('/register')
    }
    function toLogOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }
    function userAlert(){
        if(user){
            alert(`name: ${objUser.user.username}. type user: ${objUser.user.type_user}`)
        }else{
            navigate('/')
        }
    }

  return (
    <div className='navbar' style={{width:'100%', backgroundColor:"gray", height:'40px', display: 'flex', justifyContent: 'center', alignItems:'center', marginBottom:'30px'}}>
        <button onClick={userAlert}>User</button>
        {user && <button onClick={toHome} style={{margin: '10px'}}>Home</button>}
        {(objUser.user.type_user.toLowerCase() === "admin" || objUser.user.type_user.toLowerCase() === 'intelligence') && <button onClick={toadd} style={{margin: '10px'}}>Add Launcher</button>}
       {objUser.user.type_user.toLowerCase() === "admin" && <button onClick={toRegister}>Register</button>}
        {localStorage.getItem('user') && <button onClick={toLogOut}>Log Out</button>}
    </div>
  )
}
