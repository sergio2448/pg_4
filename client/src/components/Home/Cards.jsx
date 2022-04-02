import React from 'react'
import Card from "./Card"

function Cards() {
  return (
    <div className='flex flex-wrap w-screen justify-around mb-8'>
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
  )
}

export default Cards