import React from 'react'

export default function Page4({ setPages, pages, setCurrentStep }) {
  return (
    <div className="px-4 py-5 sm:p-6 bg-[#29252480]">
        <div className="px-4 py-3 text-center sm:px-6">
            <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                    setCurrentStep(3)
                    setPages({
                        ...pages,
                        page3: true,
                        page4: false
                    })
                }}
            >
                Anterior
            </button>
        </div>
        <div>
            <div className="px-4 py-3 text-center sm:px-6">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Publicar Inmueble!!
                </button>
            </div>
        </div>
</div>
        
  )
}
