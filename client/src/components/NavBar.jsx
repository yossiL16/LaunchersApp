import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useLauncher } from '../utils/zustand'

export default function NavBar() {
    // const removeLauncher = useLauncher((state) => state.removeLauncher)

    const navigate = useNavigate() 
    function toHome(){
        // removeLauncher()
        navigate('/')
    }
    function toadd(){
        // removeLauncher()
        navigate('/Add-Launcher')
    }
  return (
    <div className='navbar' style={{width:'100%', backgroundColor:"gray", height:'40px', display: 'flex', justifyContent: 'center', alignItems:'center', marginBottom:'30px'}}>
        <button onClick={toHome} style={{margin: '10px'}}>Home</button>
        <button onClick={toadd} style={{margin: '10px'}}>Add Launcher</button>
    </div>
  )
}
