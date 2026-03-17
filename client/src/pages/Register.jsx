import React from 'react'
import { useState } from 'react'

export default function Register() {

    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('')

    const token = localStorage.getItem('token')

    async function createUser(){
        try{
            const respons = await fetch('http://localhost:3000/api/auth/register/create',{
                method: 'post',
                headers: {
                    "Content-type": "application/json",
                    authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    type_user: userType
                }),
            });
            console.log(respons);
            
            if(respons.ok){
                const result = await respons.json()
                alert(result.id)
                setUsername('')
                setPassword('')
                setEmail('')
                setUserType('')
            }
            
        } catch(e){
            alert(e.message)
        }
    }


  return (
    <div>
        <h1>register:</h1>
        <div>
            <h2>create new user:</h2>
            <div>
                <label>user name: </label>
                <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
            </div>

            <div>
                <label>password: </label>
                <input type="text" onChange={e => setPassword(e.target.value)} value={password}/>
            </div>

            <div>
                <label>email: </label>
                <input type="text" onChange={e => setEmail(e.target.value)} value={email}/>
            </div>

            <div>
                <label>user type: </label>
                <input type="text" onChange={e => setUserType(e.target.value)} value={userType}/>
            </div>
            <div>
                <button onClick={createUser}>create</button>
            </div>
        </div>
    </div>
  )
}
