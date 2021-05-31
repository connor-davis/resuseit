import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

let LoginPage: React.FC = () => {
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
              />

              <input
                className="outline-none px-2 py-1 bg-gray-200 w-full rounded-md"
                placeholder="Password"
              />
            </div>

            <div className="flex flex-row justify-between items-center w-full space-x-2">
              <Link href="/">
                <div className="text-center text-green-500 cursor-pointer">
                  Cancel
                </div>
              </Link>

              <div className="text-center bg-green-500 text-white rounded-md px-2 py-1 cursor-pointer">
                Continue
              </div>
            </div>

            <div className="flex flex-row space-x-2 justify-start w-full">
              <div>Don't have an account?</div>
              <Link href="/authentication/register">
                <div className="text-center text-green-500 cursor-pointer">
                  Register.
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
