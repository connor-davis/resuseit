import { getUserInformation, unsetUserInformation } from '../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

let AccountFooter: React.FC = () => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

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

  return (
    userInformation.userAuthenticationToken && (
      <div className="flex justify-between items-center space-x-2 p-2 border-t border-gray-300 dark:border-gray-800">
        <div className="flex justify-between items-center space-x-2">
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
          <div>
            {userInformation.userAuthenticationToken
              ? userInformation.userFirstName +
                ' ' +
                userInformation.userLastName
              : 'Account'}
          </div>
        </div>
        <div
          className="text-gray-800 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-500 p-2 cursor-pointer rounded-md"
          onClick={() => dispatch(unsetUserInformation({}))}
        >
          <LogoutIcon />
        </div>
      </div>
    )
  );
};

export default AccountFooter;
