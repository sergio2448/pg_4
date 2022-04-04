import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiSelector } from "react-icons/hi"
import { BsCheckLg } from "react-icons/bs"

const features = [
 
  {
    id: 1,
    name: 'Terraza'
  },
  {
    id: 2,
    name: 'Jardín',
  },
  {
    id: 3,
    name: 'Piscina',
  },
  {
    id: 4,
    name: 'Balcón'
  },
  {
    id: 5,
    name: 'Ciudad',
  },
  {
    id: 6,
    name: 'País',
  },
  {
    id: 7,
    name: 'Código postal',
  },
  {
    id: 8,
    name: 'Barrio',
  },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filter() {
  const [selected, setSelected] = useState(features[3])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className='w-80 '>
          <Listbox.Label className="block text-sm font-medium text-grey-300">Filtrar por</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <HiSelector className="h-5 w-5 text-black-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {features.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <BsCheckLg className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}