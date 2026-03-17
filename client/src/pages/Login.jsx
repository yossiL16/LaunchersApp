import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleLogin(){
        try{
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({username, password})
        })
        if(res.ok){
            const result = await res.json()
            localStorage.setItem('token', result.token)
            alert(result.message)

            try {
            const resUser = await fetch('http://localhost:3000/api/auth/getUser', {
                headers: {
                    authorization: 'Bearer ' + result.token
                }
            })
            if(resUser.ok){
                const user = await resUser.json()
                localStorage.setItem('user', user)
            }
            navigate('/home')
        } catch(e){
            console.log(e.message);
        }
        }
    } catch(e){
        console.log(e.message)
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
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}
