import React from "react"

function StripedTable() {
  const thClass =
    "px-2 py-2 text-left bg-blue-900 text-white text-sm font-medium "
  const tdClass = "px-4 py-8 border-t border-b border-gray-300 text-sm"
  const trClass = "border-gray-300 bg-gray-300 "
  return (
    <div  className="flex flex-col">
    <h2 className='text-white text-3xl font-semi-bold font-Poppins'>Favorite Properties</h2>

    <table className="w-1/2 table-auto rounded-md ">
      <thead>
        <tr>
          <th className={thClass}>Properties</th>
          <th className={thClass}>Location</th>
          <th className={thClass}>Publication Date</th>
          <th className={thClass}>Rent/Sell</th>
          <th className={thClass}>Price range</th>
        </tr>
      </thead>
      <tbody>
        
        <tr className={trClass}>
          <td className={tdClass}>
              <a href="">
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            /></a>
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 1st</td>
          <td className={tdClass}>Rent</td>
          <td className={tdClass}>$10</td>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            />
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 5th</td>
          <td className={tdClass}>Sell</td>
          <td className={tdClass}>5</td>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            />
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 12th</td>
          <td className={tdClass}>Rent</td>
          <td className={tdClass}>Free</td>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            />
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 31st</td>
          <td className={tdClass}>Sell</td>
          <td className={tdClass}>$7</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default StripedTable