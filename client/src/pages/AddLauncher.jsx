import React from 'react'
import { useState } from 'react'

export default function AddLauncher() {

    const [name, setName] = useState('')
    const [rocketType, setRocketType] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [city, setCity] = useState('')

    async function appendLauncher(){

        try{
            const respons = await fetch('http://localhost:3000/api/launchers',{
                method: 'post',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    city,
                    rocketType,
                    latitude,
                    longitude,
                    name
                }),
            });
            console.log(respons);
            
            if(respons.ok){
                const result = await respons.json()
                alert(result.id)
                setName('')
                setRocketType('')
                setLatitude('')
                setLongitude('')
                setCity('')
            }
            
        } catch(e){
            alert(e.message)
        }
    }
  return (
    <div>
        <div>
            <h1>Add Launcher:</h1>
            <div>
                <label>name: </label>
                <input type="text" onChange={e => setName(e.target.value)} placeholder='enter a name..' value={name}/>
            </div>
            <br />

            <div>
                <label>rocketType: </label>
                <select onChange={e => setRocketType(e.target.value)} value={rocketType}>
                    <option value="">all</option>
                    <option value="Kheibar">Kheibar</option>
                    <option value="Radwan">Radwan</option>
                    <option value="Fetah110">Fetah110</option>
                    <option value="Shahab3">Shahab3</option>
            </select>
            </div>
            <br />

            <div>
                <label>latitude: </label>
                <input type="number" onChange={e => setLatitude(e.target.value)} placeholder='enter a latitude...' value={latitude}/>
            </div>
            <br />
            <div>
                <label>longitude: </label>
                <input type="number" onChange={e => setLongitude(e.target.value)} placeholder='enter a longitude...' value={longitude}/>   
            </div>
            <br />

            <div>
                <label>city: </label>
                <input type="text" onChange={e => setCity(e.target.value)} placeholder='enter a city...' value={city}/>
            </div>
        </div>
        <br />
        <button onClick={appendLauncher}>ADD</button>
    </div>
  )
}
