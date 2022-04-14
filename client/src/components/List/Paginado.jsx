import React from "react";

export default function Paginado ({propertiesPerPage, listing, paginado}){
    let totalPages = [];
    for(let i = 1 ; i <= Math.ceil(listing/propertiesPerPage) ; i++){
        totalPages.push(i);
    }

    return (
        <div className="flex justify-center">
            {
                totalPages.length && totalPages.map(p => {
                    return (
                        <div key={p} className="text-white ">
                            <a className='mt-28 bg-stone-800 rounded px-4 py-1 w-6 mx-1 flex justify-center text-emerald-500 text-2xl font-semi-bold font-Poppins' onClick={() => paginado(p)}>{p}</a>                            
                        </div>
                    )
                })
            }
        </div>
    )
}