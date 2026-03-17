import React from 'react'
import { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(){
        const res = fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({username, password})
        })
        if(res.ok){
            
            localStorage.setItem('token', )
        }
    }
  return (
    <div>
        <div>
            <label>username</label>
            <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
        </div>

        <div>
            <label>password</label>
            <input type="text" onChange={e => setPassword(e.target.value)} value={password}/>
        </div>
        <div>
            <button>Login</button>
        </div>
    </div>
  )
}
