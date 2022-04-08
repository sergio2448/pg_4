import React from 'react'

export default function Page1({ handleSubmit, countries, citys, setCurrentStep, setPages, pages }) {
    return (
        <div className="px-4 py-5 sm:p-6 bg-[#00000099]">
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="lease" className="block text-sm text-white font-medium">
                        Type of publication
                    </label>
                    <select
                        id="lease"
                        name="lease"
                        autoComplete="lease-name"
                        className="bg-[#f8fafc95] text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    >
                        <option hidden>~</option>
                        <option>Venta</option>
                        <option>Alquiler</option>
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="cost" className="block text-white text-sm font-medium">
                        Cost in dollars
                    </label>
                    <input
                        type="number"
                        name="cost"
                        id="cost"
                        autoComplete="cost"
                        className="bg-[#f8fafc95] text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="m2" className="block text-white text-sm font-medium">
                        Square meters of the property
                    </label>
                    <input
                        type="number"
                        name="m2"
                        id="m2"
                        autoComplete="family-name"
                        className="bg-[#f8fafc95] text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="country" className="block text-white text-sm font-medium">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleSubmit}
                    >
                        <option hidden>~</option>
                        {
                            countries.map(elem => {
                                return (<option key={elem.country_name}>{elem.country_name}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="state" className="block text-white text-sm font-medium">
                        State/Province
                    </label>
                    <select
                        id="state"
                        name="state"
                        autoComplete="state"
                        className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleSubmit}

                    >
                        {
                            citys.map(elem => {
                                return (<option key={elem.state_name}>{elem.state_name}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="col-span-6">
                    <label htmlFor="address" className="block text-white text-sm font-medium ">
                        Adress
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="city" className="block text-white text-sm font-medium">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="city"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="cp" className="block text-white text-sm font-medium">
                        Postal code
                    </label>
                    <input
                        type="text"
                        name="cp"
                        id="cp"
                        autoComplete="cp"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="propertyType" className="block text-white text-sm font-medium">
                        Property Type
                    </label>
                    <input
                        type="text"
                        name="propertyType"
                        id="propertyType"
                        autoComplete="propertyType"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <label htmlFor="description" className="block text-white text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="description"
                        className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-14 shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleSubmit}
                    />
                </div>
                <div className="px-4 py-3 text-center sm:px-6">
                    <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setCurrentStep(2)
                            setPages({
                                ...pages,
                                page1: false,
                                page2: true
                            })
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}