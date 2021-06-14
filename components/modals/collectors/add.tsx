import React, { useState } from 'react';

import { Transition } from '@headlessui/react';

type AddCollectorModalProps = {
  show?: boolean;
  onAdd?: Function;
  onCancel?: Function;
};

let AddCollectorModal = ({ show, onAdd, onCancel }: AddCollectorModalProps) => {
  let [creationStep, setCreationStep] = useState(1);

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');

  let [email, setEmail] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [idNumber, setIdNumber] = useState('');

  let [accountNumber, setAccountNumber] = useState('');
  let [branchCode, setBranchCode] = useState('');
  let [bankName, setBankName] = useState('');

  let [addressLineOne, setAddressLineOne] = useState('');
  let [addressLineTwo, setAddressLineTwo] = useState('');
  let [city, setCity] = useState('');
  let [postalCode, setPostalCode] = useState('');
  let [province, setProvince] = useState('');
  let [country, setCountry] = useState('');

  let clearModalData = () => {
    setCreationStep(1);

    setFirstName('');
    setLastName('');

    setEmail('');
    setPhoneNumber('');
    setIdNumber('');

    setAccountNumber('');
    setBranchCode('');
    setBankName('');

    setAddressLineOne('');
    setAddressLineTwo('');
    setCity('');
    setPostalCode('');
    setProvince('');
    setCountry('');
  };

  return (
    <Transition show={show} as={React.Fragment}>
      <div
        className={`fixed inset-0 z-20 overflow-y-auto ${!show && 'hidden'}`}
        onClick={() => {}}
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
            <div className="fixed inset-0 bg-black opacity-70" />
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
            <div className="inline-block w-auto p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 dark:bg-black shadow-xl rounded-2xl border-l border-t border-r border-b border-gray-300 dark:border-gray-800">
              <div className="text-lg font-medium leading-6 text-gray-900 dark:text-white text-center mb-5">
                {creationStep === 1 && 'Details'}
                {creationStep === 2 && 'Contact Details'}
                {creationStep === 3 && 'Bank Details'}
                {creationStep === 4 && 'Location Details'}
              </div>
              <div className="mt-2">
                {creationStep === 1 && (
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="First Name"
                      value={firstName}
                      onChange={({ target: { value } }) => setFirstName(value)}
                    />
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={({ target: { value } }) => setLastName(value)}
                    />
                  </div>
                )}

                {creationStep === 2 && (
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="Email"
                      value={email}
                      onChange={({ target: { value } }) => setEmail(value)}
                    />
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={({ target: { value } }) =>
                        setPhoneNumber(value)
                      }
                    />
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="ID Number"
                      value={idNumber}
                      onChange={({ target: { value } }) => setIdNumber(value)}
                    />
                  </div>
                )}

                {creationStep === 3 && (
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={({ target: { value } }) =>
                        setAccountNumber(value)
                      }
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                        placeholder="Branch Code"
                        value={branchCode}
                        onChange={({ target: { value } }) =>
                          setBranchCode(value)
                        }
                      />
                      <input
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                        placeholder="Bank Name"
                        value={bankName}
                        onChange={({ target: { value } }) => setBankName(value)}
                      />
                    </div>
                  </div>
                )}

                {creationStep === 4 && (
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="Address Line One"
                      value={addressLineOne}
                      onChange={({ target: { value } }) =>
                        setAddressLineOne(value)
                      }
                    />
                    <input
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                      placeholder="Address Line Two"
                      value={addressLineTwo}
                      onChange={({ target: { value } }) =>
                        setAddressLineTwo(value)
                      }
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                        placeholder="City"
                        value={city}
                        onChange={({ target: { value } }) => setCity(value)}
                      />
                      <input
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={({ target: { value } }) =>
                          setPostalCode(value)
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                        placeholder="Province"
                        value={province}
                        onChange={({ target: { value } }) => setProvince(value)}
                      />
                      <input
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 outline-none rounded-md w-full"
                        placeholder="Country"
                        value={country}
                        onChange={({ target: { value } }) => setCountry(value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center mt-4 w-full space-x-2">
                <button
                  type="button"
                  className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                  onClick={() => {
                    if (creationStep >= 4) {
                      onAdd({
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        idNumber,
                        accountNumber,
                        branchCode,
                        bankName,
                        addressLineOne,
                        addressLineTwo,
                        city,
                        postalCode,
                        province,
                        country,
                      });
                      onCancel();
                      clearModalData();
                    } else setCreationStep((creationStep += 1));
                  }}
                >
                  Continue
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={() => {
                    onCancel();
                    clearModalData();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default AddCollectorModal;
