import React from 'react'
import imgHouse from '../../../img/house.jpg'

export default function Card() {
    return (
        <div className='w-80'>
            <img src={imgHouse} alt="" />
            <p>Direccion: </p>
            <p>Precio</p>
            <p>m2</p>
        </div>
    )
}