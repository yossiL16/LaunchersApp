import React from 'react'
import { serchLaunchers } from '../utils/serch.js'
import { useState } from 'react'
import { useEffect } from 'react'
import HomeCards from '../components/HomeCards.jsx'

export default function Home() {

    const [data, setData] = useState([])
    const [city, setCity] = useState('')
    const [rocketType, setRocketType] = useState('')
    
    const token = localStorage.getItem('token')
    

    async function getData(){
        try {
            const respons = await fetch('http://localhost:3000/api/launchers',{
                headers:{
                    authorization: 'Bearer ' + token
                }
            });
            if(!respons.ok) {
                alert("There is a problem with the server", respons.status)
            }
            const result = await respons.json()
            const filterData = serchLaunchers(result.launchers, city, rocketType)
            setData(filterData)
        } catch(e){
            alert(result.error)
        }
    }

    useEffect(()=> {
        getData()
    }, [city,rocketType])
  return (
    <div>
        <h3>serch launchers</h3>
        <div>
            <label>City: </label>
            <input onChange={e => setCity(e.target.value)} type="text" placeholder='Serch by City' value={city}/>
        </div>
        <div>
            <label>rocketType: </label>
            <select onChange={e => setRocketType(e.target.value)}>
                <option value="">all</option>
                <option value="Kheibar">Kheibar</option>
                <option value="Radwan">Radwan</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Shahab3">Shahab3</option>
            </select>
        </div>
        <div>
            {data.map((item, index) => (
                <HomeCards key={index} item={item} />
            ))}
        </div>
    </div>
  )
}
