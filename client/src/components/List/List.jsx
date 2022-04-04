import hardcodeHouse from "../../styles/images/hardcode-house.jpg"
import poolHouse from "../../styles/images/house-back2.jpg"
import bigHouse from "../../styles/images/house-back4.jpg"
import doubleHouse from "../../styles/images/house2.jpg"
import smallHouse from "../../styles/images/house5.jpg"
import gardenHouse from "../../styles/images/house-back5.jpg"
import Card from "../Card"
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import Filter from './Inputs'
import ConteinInputs from "./ConteinInputs"

export default function List() {
  return (
   
    <div>
      <div className='relative z-6  text-center'>
      <div className='bg-black h-20 relative z-20'>
                <Nav />
            </div>
      <div className='relative z-6 text-center'> 
        <SearchBar/>
      </div>
      </div>
      <div className=' mt-45 pt-10 py-15 text-center'>    
      <ConteinInputs/>  
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={hardcodeHouse}  />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          
              <Card image={poolHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={bigHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={doubleHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          
              <Card image={smallHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={gardenHouse} />
          </div>
        </div>                
      </div>
                  
      </div>
   
  )
}