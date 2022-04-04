import React from 'react'

export default function Page2({handleFeatures}) {
    return (
        <div className="px-4 py-5 sm:p-6 bg-[#29252480]">
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="features" className="block text-white text-sm font-medium">
                    Detalles
                </label>
                <select
                    id="features"
                    name="features"
                    autoComplete="features"
                    className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option hidden>~</option>
                    <option>Baños</option>
                    <option>Cocinas</option>
                    <option>Comedores</option>
                    <option>Habitaciones</option>
                    <option>Piscinas</option>
                    <option>Terrazas</option>
                    <option>Estacionamientos</option>
                </select>
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="quantity" className="block text-white text-sm font-medium">
                    Cantidad
                </label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    autoComplete="quantity"
                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <button
                onClick={handleFeatures}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Agregar
            </button>
        </div>
    )
}
