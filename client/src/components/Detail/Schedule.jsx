import React from "react";
import Nav from "../Nav";
import houseBackground from '../../styles/images/house-back.jpg';

export default function Schedule () {

    return (
        <div className="w-full h-screen bg-stone-200/75 ">
            <div class="shadow-inner shadow-black">                
                <div className="z-1 absolute bg-black w-full h-full shadow-black shadow-2xl">
                    <img className=" opacity-60 z-2 object-cover w-full h-full blur-sm" src={houseBackground} />
                </div>
                <div className='z-2 absolute  w-full h-full shadow-inner shadow-black'></div>
                <div class="shadow-nav h-20 relative z-20 ">  
                    <Nav />
                </div>
            </div>
            <div className="bg-white relative w-full h-screen">
                <div className="bg-stone-200/75 relative w-full h-screen">
                    
                </div>
            </div>
        </div>
    )

}