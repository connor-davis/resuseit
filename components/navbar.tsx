import React, { ReactNode, useState } from 'react';

type NavbarProps = { title: string; children?: ReactNode };

let Navbar = ({ title, children }: NavbarProps) => {
  let [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex w-screen px-2 py-3 justify-between items-center border-b border-gray-300 dark:border-gray-800">
      <div className="font-semibold text-lg">{title}</div>
      <div className="flex space-x-2">
        <div
          className={` absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-screen md:w-auto bg-gray-100 dark:bg-black rounded-md md:rounded-none border-b border-gray-300 dark:border-gray-800 md:border-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0 md:items-center ${
            mobileOpen ? 'flex' : 'hidden'
          } ${mobileOpen ? 'space-y-2' : 'space-x-2'}`}
        >
          {children}
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="self-end ml-auto md:hidden w-6 h-6 bg-gray-200 text-gray-600 p-1"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
