import React from 'react'
import { FaWindowClose } from "react-icons/fa"

export default function Page3({ setImages, images, imagesDeleted, setImagesDeleted, setPages, pages, setCurrentStep, errors, handleSubmit, newEstate }) {

    return (
        <div className="px-4 py-5 sm:p-6 bg-[#00000099]">
            <div id='prevImages' className='flex flex-wrap'>
                {
                    newEstate.photos ? newEstate.photos.map((photo) => {
                        if(imagesDeleted.includes(photo.photos))return (
                            <div className='relative'>
                                <img src={'https://new-pg.herokuapp.com/Properties/images/' + photo.photos} className="w-48 h-48 m-2" />
                                <FaWindowClose className='absolute top-4 right-4 text-xl text-red-700' onClick={(e) => {
                                    e.preventDefault()
                                    setImagesDeleted(imagesDeleted.map(elem => {
                                        if(photo.photos !== elem) {
                                            return elem
                                        }
                                    }))
                                }}/>
                            </div>
                        )

                    }) : ""
                }
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="img1" className="block text-white text-sm font-medium">                  
                    Upload the images of your property
                </label>
                <input
                    type="file"
                    name="img"
                    id="img"
                    autoComplete="img"
                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => {
                        handleSubmit(e)
                        setImages(e.target.files)
                    }}
                    multiple
                />
                {
                    errors.img && (<p className="text-red-700">{errors.img}</p>)
                }
            </div>
            <div className="px-4 py-3 text-center sm:px-6">
                <button
                    className="inline-flex justify-center ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-4 py-2 rounded"
                    onClick={() => {
                        setCurrentStep(2)
                        setPages({
                            ...pages,
                            page2: true,
                            page3: false
                        })
                    }}
                >
                    Previous
                </button>
            </div>
            <div className="px-4 py-3 text-center sm:px-6">
                <button
                    className="inline-flex justify-center ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-4 py-2 rounded"
                    onClick={() => {
                        setCurrentStep(4)
                        setPages({
                            ...pages,
                            page3: false,
                            page4: true
                        })
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
