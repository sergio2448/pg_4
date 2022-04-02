import { Fragment } from 'react'
import ConteinInputs from "./Home/ConteinInputs"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AiOutlineCloseSquare } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import imageHouse from "../../img/house.jpg"
import Cards from "./Home/Cards.jsx"
import Nav from './Nav'

// const navigation = [
//   { name: 'List', href: '#', current: true },
//   { name: 'Mis inmuebles', href: '#', current: false },
//   { name: 'Comprar', href: '#', current: false },
//   { name: 'Vender', href: '#', current: false },
//   { name: 'Alquileres', href: '#', current: false }
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function List() {
  return (
   <div>
       <div>
       <Nav/>
       </div>
       <Cards/>
       <Cards/>
   </div>
  )
}