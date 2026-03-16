import React from 'react'

export default function HomeCards({item}) {
  return (
    <div className='card-home' style={{width: '200px', height:'150px', backgroundColor:'yellow'}}>
        <h1>{item.id}</h1>
        <p>{item.city}</p>
        <p>{item.rocketType}</p>
    </div>
  )
}
