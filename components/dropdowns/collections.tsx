import React, { useState } from 'react';

import AddCollectionModal from '../modals/collections/add';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

let CollectionsDropdown: React.FC = () => {
  let [showAddCollectionModal, setShowAddCollectionModal] = useState(false);

  let AddIcon: React.FC = () => {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  };

  let ListIcon: React.FC = () => {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    );
  };

  return (
    <Menu as="div" className="relative">
      <AddCollectionModal
        show={showAddCollectionModal}
        onAdd={() => {}}
        onCancel={() => setShowAddCollectionModal(false)}
      />
      <Menu.Button className="flex justify-center items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-300 relative dark:hover:bg-gray-800 transition duration-500 ease-in-out focus:outline-none rounded-md">
        <div>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div>Collections</div>
      </Menu.Button>

      <Menu.Items className="flex flex-col w-48 absolute z-10 md:top-11 md:right-0 top-0 p-2 bg-gray-100 dark:bg-black border-l border-t border-r border-b border-gray-300 dark:border-gray-800 rounded-md">
        <Menu.Item>
          <div
            className="flex flex-auto items-center space-x-2 text-gray-800 dark:text-gray-100 hover:bg-green-200 hover:text-green-500 p-2 cursor-pointer rounded-md"
            onClick={() => setShowAddCollectionModal(true)}
          >
            <AddIcon />
            <div>Add</div>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div className="flex flex-auto items-center space-x-2 text-gray-800 dark:text-gray-100 hover:bg-green-200 hover:text-green-500 p-2 cursor-pointer rounded-md">
            <ListIcon />
            <div>List</div>
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default CollectionsDropdown;
