import { Dialog, Menu, Transition } from '@headlessui/react';
import React, { useState } from 'react';

import SearchIcon from '../../icons/search';

type AddCollectionModalProps = {
  collections?: any;
  show?: boolean;
  onAdd?: Function;
  onCancel?: Function;
};

let AddCollectionModal = ({
  collections,
  show,
  onAdd,
  onCancel,
}: AddCollectionModalProps) => {
  let [keyWord, setKeyWord] = useState('First Name');
  let [keyWords, setKeyWords] = useState([
    'First Name',
    'Last Name',
    'Phone Number',
    'ID Number',
  ]);

  return (
    <Transition show={show} as={React.Fragment}>
      <div
        className={`fixed inset-0 z-20 overflow-y-auto ${show ? '' : 'hidden'}`}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50 bg-transparent"
            leave="ease-in duration-200"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <div className="fixed w-screen h-screen inset-0 bg-black opacity-70" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-auto p-3 my-8 text-left align-middle transition-all transform bg-gray-100 dark:bg-black shadow-xl rounded-2xl border-l border-t border-r border-b border-gray-300 dark:border-gray-800">
              <div className="bg-gray-100 dark:bg-black">
                <div className="text-lg font-medium leading-6 text-gray-900 dark:text-white text-center mb-5">
                  Add Collection
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400"></p>

                  <div className="flex w-full items-center px-2 py-1">
                    <div className="px-2 py-2 h-full bg-gray-200 dark:bg-gray-800 text-green-600 rounded-tl-md rounded-bl-md">
                      <SearchIcon />
                    </div>
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none"
                      placeholder="Search"
                    />
                    <div className="px-2 py-1 w-full h-full bg-gray-200 dark:bg-gray-800 text-green-600 rounded-tr-md rounded-br-md">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="focus:outline-none border-0">
                            {keyWord}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-16 overflow-y-auto bg-gray-100 dark:bg-black border-l border-t border-r border-b border-gray-300 dark:border-gray-800">
                            <div className="px-1 py-1">
                              {keyWords.map((key) => (
                                <Menu.Item key={key}>
                                  <div
                                    className="flex items-center justify-start px-2 py-1 cursor-pointer hover:bg-green-300 hover:text-green-600 transition duration-500 ease-in-out focus:outline-none rounded-md mb-1"
                                    onClick={() => setKeyWord(key)}
                                  >
                                    {key}
                                  </div>
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center mt-4 w-full space-x-2">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    onClick={() => {}}
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => onCancel()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default AddCollectionModal;
