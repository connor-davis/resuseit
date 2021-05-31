import {
  getUserInformation,
  unsetUserInformation,
} from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { Menu } from '@headlessui/react';
import React from 'react';

let AccountDropdown: React.FC = () => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

  let LoginIcon: React.FC = () => {
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
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    );
  };

  let LogoutIcon: React.FC = () => {
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
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    );
  };

  let RegisterIcon: React.FC = () => {
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
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    );
  };

  return (
    <Menu as="div" className="relative">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>Account</div>
      </Menu.Button>

      <Menu.Items className="flex flex-col w-48 absolute z-10 md:top-11 md:right-0 top-0 p-2 bg-gray-100 dark:bg-black border-l border-t border-r border-b border-gray-300 dark:border-gray-800 rounded-md">
        {userInformation.userAuthenticationToken ? (
          <>
            <Menu.Item>
              <div
                className="flex flex-auto items-center space-x-2 text-gray-800 dark:text-gray-100 hover:bg-red-200 hover:text-red-500 p-2 cursor-pointer rounded-md"
                onClick={() => dispatch(unsetUserInformation({}))}
              >
                <LogoutIcon />
                <div>Logout</div>
              </div>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item>
              <Link href="/authentication/login">
                <div className="flex flex-auto items-center space-x-2 text-gray-800 dark:text-gray-100 hover:bg-green-200 hover:text-green-500 p-2 cursor-pointer rounded-md">
                  <LoginIcon />
                  <div>Login</div>
                </div>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link href="/authentication/register">
                <div className="flex flex-auto items-center space-x-2 text-gray-800 dark:text-gray-100 hover:bg-green-200 hover:text-green-500 p-2 cursor-pointer rounded-md">
                  <RegisterIcon />
                  <div>Register</div>
                </div>
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu.Items>
    </Menu>
  );
};

export default AccountDropdown;
