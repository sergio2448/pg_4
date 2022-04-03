import hardcodeHouse from "../../styles/images/hardcode-house.jpg"
import Card from "../Card"
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import Filter from '../Home/Inputs'
import ConteinInputs from "../Home/ConteinInputs"

export default function List() {
  return (
   
    <div>
      <div className='relative z-6 pt-28 text-center'>
      <Nav/>
      <div className='relative z-6 pt-28 text-center'> 
        <SearchBar/>
      </div>
      </div>
      <div className=' mt-64 py-15 text-center'>    
      <ConteinInputs/>  
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={hardcodeHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          
              <Card image={hardcodeHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={hardcodeHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={hardcodeHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          
              <Card image={hardcodeHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={hardcodeHouse} />
          </div>
        </div>                
      </div>
                  
      </div>
   
  )
}