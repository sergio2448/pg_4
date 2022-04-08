import React from 'react'

export default function Page3({ setImages, setPages, pages, setCurrentStep, errors, handleSubmit }) {
    return (
        <div className="px-4 py-5 sm:p-6 bg-[#00000099]">
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
