import React from 'react'
import { useState } from 'react'

export default function Register() {

    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('')

    const [usernameUp, setUsernameUp] = useState('')
    const [passwordUp,setPasswordUp] = useState('')
    const [emailUp, setEmailUp] = useState('')
    const [userTypeUp, setUserTypeUp] = useState('')
    const [id,setId] = useState('')

    const [delId, setDelId] = useState('')

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

    async function updateUser() {
                try{
            const respons = await fetch(`http://localhost:3000/api/auth/register/update/${id}`,{
                method: 'put',
                headers: {
                    "Content-type": "application/json",
                    authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    username:usernameUp,
                    password:passwordUp,
                    email:emailUp,
                    type_user: userTypeUp
                }),
            });
            console.log(respons);
            if(respons.ok){
                alert('The update was successful.')
                setUsernameUp('')
                setPasswordUp('')
                setEmailUp('')
                setUserTypeUp('')
                setId('')
            }
        } catch(e){
            alert(e.message)
        }
    }

    async function deleteUser(){
        try{
            const respons = await fetch(`http://localhost:3000/api/auth/register/delete/${delId}`,{
                method:'delete',
                headers: {
                    authorization: 'Bearer ' + token,
                },
            });
            if(respons.ok){
                alert('The deletion was successful.')
                setDelId('')
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
                <button onClick={createUser}>Create</button>
            </div>
        </div>
        <hr />

        <div>
            <h2>Update User:</h2>

            <div>
                <label>Select an ID: </label>
                <input type="number" onChange={e => setId(e.target.value)} value={id}/>
            </div>
            <br />

                <label>user name: </label>
                <input type="text" onChange={e => setUsernameUp(e.target.value)} value={usernameUp}/>
            </div>

            <div>
                <label>password: </label>
                <input type="text" onChange={e => setPasswordUp(e.target.value)} value={passwordUp}/>
            </div>

            <div>
                <label>email: </label>
                <input type="text" onChange={e => setEmailUp(e.target.value)} value={emailUp}/>
            </div>

            <div>
                <label>user type: </label>
                <input type="text" onChange={e => setUserTypeUp(e.target.value)} value={userTypeUp}/>
            </div>
            <div>
                <button onClick={updateUser}>Update</button>
            </div>

            <hr />

            <div>
                <h2>Delete User:</h2>
                <div>
                    <label>select ID: </label>
                    <input type="number" onChange={e => setDelId(e.target.value)} value={delId}/>
                </div>
                <button onClick={deleteUser}>Delete</button>
            </div>
        </div>
  )
}
