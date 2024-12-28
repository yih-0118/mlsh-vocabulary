import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronsUpDown, CheckCircle } from 'lucide-react';

const ListboxSelect = ({ label, selected, setSelected, options, darkMode }) => (
  <div>
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button
          className={`
            relative w-full cursor-pointer rounded-lg 
            ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}
            py-2 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-500
          `}
        >
          <span className="block truncate">{selected || '-- 請選擇 --'}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronsUpDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`
              absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
              ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}
              py-1 text-base shadow-lg z-10 focus:outline-none sm:text-sm
            `}
          >
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-900'
                      : darkMode
                        ? 'text-gray-200'
                        : 'text-gray-900'
                  }`
                }
                value={option.value || option.label}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label || option.value}
                    </span>
                    {selected ? (
                      <span
                        className={`
                          absolute inset-y-0 left-0 flex items-center pl-3 
                          ${darkMode ? 'text-white' : 'text-blue-600'}
                        `}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);

export default ListboxSelect;
