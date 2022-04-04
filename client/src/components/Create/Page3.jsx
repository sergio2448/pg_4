import React from 'react'

export default function Page3({ setImages, setPages, pages, setCurrentStep }) {
    return (
        <div className="px-4 py-5 sm:p-6 bg-[#29252480]">
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="img1" className="block text-white text-sm font-medium">
                    Imagen Principal
                </label>
                <input
                    type="file"
                    name="img1"
                    id="img1"
                    autoComplete="img1"
                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setImages(e.target.files)}
                    multiple
                />
            </div>
            {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="img2" className="block text-white text-sm font-medium">
                        Imagen Secundaria
                    </label>
                    <input
                        type="file"
                        name="img2"
                        id="img2"
                        autoComplete="img2"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleImages}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="img3" className="block text-white text-sm font-medium">
                        Quieres mostrar mas??
                    </label>
                    <input
                        type="file"
                        name="img3"
                        id="img3"
                        autoComplete="img3"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleImages}
                    />
                </div> */}
            <div className="px-4 py-3 text-center sm:px-6">
                <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                        setCurrentStep(2)
                        setPages({
                            ...pages,
                            page2: true,
                            page3: false
                        })
                    }}
                >
                    Anterior
                </button>
            </div>
            <div className="px-4 py-3 text-center sm:px-6">
                <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                        setCurrentStep(4)
                        setPages({
                            ...pages,
                            page3: false,
                            page4: true
                        })
                    }}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}
