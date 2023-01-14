import React from 'react'
import axios from 'axios'

export default function Page2({handleFeatures, setCurrentStep, setPages, pages, errors, newEstate, handleSubmit}) {

    const [features, setFeatures] = React.useState([])

    React.useEffect(async () => {
        let result = await axios.get(
          "https://new-pg.herokuapp.com/feature"
        );
        setFeatures(result.data)
    }, [])

    return (
        <div className="px-4 py-5 sm:p-6 bg-[#00000099]">
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="features" className="block text-white text-sm font-medium">
                    Details
                </label>
                <select
                    id="features"
                    name="features"
                    autoComplete="feature"
                    className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"     
                >
                    <option hidden>~</option>
                    {
                        features.map(elem => 
                            <option key={elem.id} className="capitalize">{elem.name}</option>    
                        )
                    }
                </select>
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2 mb-4">
                <label htmlFor="quantity" className="block text-white text-sm font-medium">
                    Quantity
                </label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    autoComplete="quantity"
                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div id='inner'>
                {
                    newEstate.features.map ? newEstate.features.map(elem => <div key={elem.name} className="m-4 text-white flex capitalize"> 
                        <p className='text-bold mr-4'>{elem.name}</p>
                        {
                            elem.value ? <p>{elem.value}</p> : <p>{elem.produc_features.value}</p>
                        }
                    </div>)
                    : ""
                }
            </div>
            {
                errors.features && (<p className="text-red-700">{errors.features}</p>)
            }
            <button
                name='features'
                onClick={handleFeatures}
                className="inline-flex justify-center ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-4 py-2 rounded"
            >
                Add
            </button>
            <div className="px-4 py-3 text-center sm:px-6">
                <button
                    className="inline-flex justify-center ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-4 py-2 rounded"
                    onClick={(e) => {
                        handleSubmit(e);
                        setCurrentStep(1)
                        setPages({
                            ...pages,
                            page1: true,
                            page2: false
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
                        setCurrentStep(3)
                        setPages({
                            ...pages,
                            page2: false,
                            page3: true
                        })
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
