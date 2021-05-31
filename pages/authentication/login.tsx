import React, { useEffect, useState } from 'react';
import {
  getUserInformation,
  setUserInformation,
} from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

let LoginPage: React.FC = () => {
  let dispatch = useDispatch();
  let router = useRouter();

  let userInformation = useSelector(getUserInformation);

  let [userNameOrPhoneNumber, setUserNameOrPhoneNumber] = useState('');
  let [password, setPassword] = useState('');

  useEffect(() => {
    if (userInformation.userAuthenticationToken) router.push('/');
  }, [userInformation]);

  let perform = async () => {
    let data = {};

    if (
      userNameOrPhoneNumber.startsWith('+') ||
      userNameOrPhoneNumber.startsWith('0') ||
      parseInt(userNameOrPhoneNumber)
    )
      data = {
        phoneNumber: userNameOrPhoneNumber,
        password,
      };
    else {
      data = {
        username: userNameOrPhoneNumber,
        password,
      };
    }

    let response = await axios.post(
      'http://localhost:3000/api/authentication/login',
      data
    );

    if (response.data.success) dispatch(setUserInformation(response.data.data));
    else console.log(response.data);
  };

  return (
    <>
      <Head>
        <title>ReUse-It | Authenticate.</title>
      </Head>

      <div className="flex flex-row justify-center items-center w-screen bg-gray-100 dark:bg-black">
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-black">
          <div className="flex flex-col items-center px-3 py-2 space-y-5 rounded-lg border-l border-t border-r border-b border-gray-300 dark:border-gray-800d bg-gray-100 dark:bg-black w-64 md:w-auto">
            <div className="text-lg md:text-xl font-bold my-5">
              Authenticate.
            </div>

            <div className="flex flex-col space-y-2 w-full">
              <input
                className="outline-none px-2 py-1 bg-gray-200 w-full rounded-md"
                placeholder="Username or Phone Number"
                value={userNameOrPhoneNumber}
                onChange={({ target: { value } }) =>
                  setUserNameOrPhoneNumber(value)
                }
              />

              <input
                className="outline-none px-2 py-1 bg-gray-200 w-full rounded-md"
                placeholder="Password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </div>

            <div className="flex flex-row justify-between items-center w-full space-x-2">
              <Link href="/">
                <div className="text-center text-green-500 cursor-pointer">
                  Cancel
                </div>
              </Link>

              <div
                className="text-center bg-green-500 text-white rounded-md px-2 py-1 cursor-pointer"
                onClick={() => perform()}
              >
                Continue
              </div>
            </div>

            {/* <div className="flex flex-row space-x-2 justify-start w-full">
              <div>Don't have an account?</div>
              <Link href="/authentication/register">
                <div className="text-center text-green-500 cursor-pointer">
                  Register.
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
