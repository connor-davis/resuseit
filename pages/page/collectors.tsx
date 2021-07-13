import React, { useEffect, useState } from 'react';
import {
  addCollector,
  getCollectors,
  removeCollector,
  setCollectors,
  updateCollector
} from '../../store/slices/collectors';
import {
  getUserInformation,
  unsetUserInformation
} from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import AddCollectorModal from '../../components/modals/collectors/add';
import AddIcon from '../../components/icons/add';
import EditCollectorModal from '../../components/modals/collectors/edit';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

let CollectorsPage = () => {
  let dispatch = useDispatch();

  let collectors = useSelector(getCollectors);
  let userInformation = useSelector(getUserInformation);

  let [page, setPage] = useState(1);
  let [pages, setPages] = useState(0);
  let [buttons, setButtons] = useState([]);
  let [sortBy, setSortBy] = useState({});
  let [loading, setLoading] = useState(true);

  let [showAddCollectorModal, setShowAddCollectorModal] = useState(false);
  let [showEditCollectorModal, setShowEditCollectorModal] = useState(false);

  let [editingCollector, setEditingCollector] = useState();

  useEffect(() => {
    setSortBy({ collectorFirstName: 'asc' });
    getPage(1, { sortBy: { collectorFirstName: 'asc' } });
  }, []);

  let getPage = (p, ...body) => {
    (async () => {
      let response = await axios.post('/api/collectors', body, {
        headers: {
          Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
        },
      });

      if (response.status === 200) {
        dispatch(setCollectors(response.data.collectors));

        setPage(response.data.page);
        setPages(response.data.pages);

        setTimeout(() => {
          setLoading(false);
        }, 2500);
      }
    })();
  };

  let createCollector = async (collectorData) => {
    for (let key in collectorData) {
      let data = collectorData[key];
      collectorData[
        'collector' +
          key.split('')[0].toUpperCase() +
          key.substring(1, key.length)
      ] = data;
      delete collectorData[key];
    }

    axios
      .post(
        '/api/collectors',
        {
          ...collectorData,
          collectorStreetAddress:
            collectorData.collectorAddressLineOne +
            ', ' +
            collectorData.collectorAddressLineTwo,
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
          },
        }
      )
      .then((response) => dispatch(addCollector(response.data.collector)))
      .catch(() => dispatch(unsetUserInformation({})));
  };

  let editCollector = async (collectorId, collectorData) => {
    for (let key in collectorData) {
      let data = collectorData[key];
      collectorData[
        'collector' +
          key.split('')[0].toUpperCase() +
          key.substring(1, key.length)
      ] = data;
      delete collectorData[key];
    }

    axios
      .put(
        '/api/collectors/' + collectorId,
        {
          ...collectorData,
          collectorStreetAddress: `${collectorData.collectorAddressLineOne}, ${collectorData.collectorAddressLineTwo}`,
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
          },
        }
      )
      .then((response) => dispatch(updateCollector(response.data.collector)))
      .catch(() => dispatch(unsetUserInformation({})));
  };

  let deleteCollector = async (collectorId) => {
    axios
      .delete('/api/collectors/' + collectorId, {
        headers: {
          Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
        },
      })
      .then((response) => dispatch(removeCollector(response.data.collectorId)))
      .catch(() => dispatch(unsetUserInformation({})));
  };

  let sortCollectors = (collectorsList) => {
    if (Object.values(sortBy)[0] === 'asc') {
      dispatch(
        setCollectors(
          collectorsList.sort((a, b) => {
            if (a[Object.keys(sortBy)[0]] > b[Object.keys(sortBy)[0]]) {
              return -1;
            }
            if (b[Object.keys(sortBy)[0]] < a[Object.keys(sortBy)[0]]) {
              return 1;
            }
            return 0;
          })
        )
      );
    } else if (Object.values(sortBy)[0] === 'desc') {
      dispatch(
        setCollectors(
          collectorsList.sort((a, b) => {
            if (a[Object.keys(sortBy)[0]] < b[Object.keys(sortBy)[0]]) {
              return -1;
            }
            if (b[Object.keys(sortBy)[0]] > a[Object.keys(sortBy)[0]]) {
              return 1;
            }
            return 0;
          })
        )
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-full z-0">
      <Head>
        <title>ReUse-It | Collectors.</title>
      </Head>
      <Navbar title="Collectors">
        <AddCollectorModal
          show={showAddCollectorModal}
          onAdd={createCollector}
          onCancel={() => setShowAddCollectorModal(false)}
        />

        <EditCollectorModal
          data={editingCollector}
          show={showEditCollectorModal}
          onEdit={editCollector}
          onCancel={() => setShowEditCollectorModal(false)}
        />

        <div
          className="flex justify-center z-0 items-center bg-green-300 text-green-600 px-2 py-1 space-x-2 rounded-md cursor-pointer"
          onClick={() => setShowAddCollectorModal(true)}
        >
          <AddIcon />
          <div>Add</div>
        </div>
      </Navbar>

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="64px"
              height="64px"
              viewBox="0 0 128 128"
            >
              <path
                fill="#10b981"
                id="ball1"
                className="cls-1"
                d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;"
                  dur="1800ms"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
              <path
                fill="#10b981"
                id="ball2"
                className="cls-1"
                d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;"
                  dur="1800ms"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
              <path
                fill="#10b981"
                id="ball3"
                className="cls-1"
                d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;"
                  dur="1800ms"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-2">
          <table className="table-fixed overflow-x-scroll border-l border-r border-gray-300 dark:border-gray-800 rounded-tl-md rounded-tr-md">
            <thead>
              <tr className="border-t border-b border-gray-300 dark:border-gray-800 rounded-tl-md rounded-tr-md">
                <th className="w-auto border-r border-gray-300 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div
                      onClick={() => {
                        setSortBy({ collectorFirstName: 'desc' });
                        setTimeout(() => {
                          sortCollectors([...collectors]);
                        }, 500);
                      }}
                    >
                      First Name
                    </div>
                    {Object.keys(sortBy)[0] === 'collectorFirstName' && (
                      <div
                        className="hover:text-green-500"
                        onClick={() => {
                          if (Object.values(sortBy)[0] === 'asc') {
                            setSortBy({ collectorFirstName: 'desc' });
                            setTimeout(() => {
                              sortCollectors([...collectors]);
                            }, 500);
                          } else if (Object.values(sortBy)[0] === 'desc') {
                            setSortBy({ collectorFirstName: 'asc' });
                            setTimeout(() => {
                              sortCollectors([...collectors]);
                            }, 500);
                          }
                        }}
                      >
                        {Object.values(sortBy)[0] === 'asc' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </th>
                <th className="w-auto border-r border-gray-300 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div
                      onClick={() => {
                        setSortBy({ collectorLastName: 'desc' });
                        setTimeout(() => {
                          sortCollectors([...collectors]);
                        }, 500);
                      }}
                    >
                      Last Name
                    </div>

                    {Object.keys(sortBy)[0] === 'collectorLastName' && (
                      <div
                        className="hover:text-green-500"
                        onClick={() => {
                          if (Object.values(sortBy)[0] === 'asc') {
                            setSortBy({ collectorLastName: 'desc' });
                            setTimeout(() => {
                              sortCollectors([...collectors]);
                            }, 500);
                          } else if (Object.values(sortBy)[0] === 'desc') {
                            setSortBy({ collectorLastName: 'asc' });
                            setTimeout(() => {
                              sortCollectors([...collectors]);
                            }, 500);
                          }
                        }}
                      >
                        {Object.values(sortBy)[0] === 'asc' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </th>
                <th className="w-auto border-r border-gray-300 dark:border-gray-800">
                  ID Number
                </th>
                <th className="w-auto border-r border-gray-300 dark:border-gray-800">
                  Phone Number
                </th>
                <th className="w-auto border-r border-gray-300 dark:border-gray-800">
                  Email Address
                </th>
                <th className="w-auto border-r border-gray-300 dark:border-gray-800">
                  Address
                </th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="w-full">
              {collectors.length > 0 &&
                collectors.map((collector) => (
                  <tr
                    key={collector.collectorIdNumber}
                    className="border-b border-gray-300 dark:border-gray-800"
                  >
                    <td className="p-2 border-r border-gray-300 dark:border-gray-800">
                      {collector.collectorFirstName}
                    </td>
                    <td className="p-2 border-r border-gray-300 dark:border-gray-800">
                      {collector.collectorLastName}
                    </td>
                    <td className="p-2 border-r border-gray-300 dark:border-gray-800">
                      {collector.collectorIdNumber}
                    </td>
                    <td className="p-2 border-r border-gray-300 dark:border-gray-800">
                      {collector.collectorPhoneNumber}
                    </td>
                    <td className="p-2 border-r border-gray-300 dark:border-gray-800">
                      {collector.collectorEmail}
                    </td>
                    <td className="p-2 border-r border-gray-300 dark:border-gray-800 truncate">
                      {collector.collectorStreetAddress +
                        ', ' +
                        collector.collectorCity}
                    </td>
                    <td className="p-2 flex justify-center items-center space-x-2">
                      <div
                        className="w-6 h-6 bg-yellow-300 text-white flex justify-center items-center rounded-full cursor-pointer"
                        onClick={() => {
                          setEditingCollector(undefined);
                          setTimeout(() => {
                            setEditingCollector(collector);
                            setShowEditCollectorModal(true);
                          }, 500);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </div>
                      <div
                        className="w-6 h-6 bg-red-500 text-white flex justify-center items-center rounded-full cursor-pointer"
                        onClick={() => deleteCollector(collector.collectorId)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={'Previous'}
            previousClassName={
              'mr-auto px-2 border-l border-t border-r border-b border-gray-300 dark:border-gray-800 rounded-md'
            }
            nextLabel={'Next'}
            nextClassName={
              'ml-auto space-x-2 px-2 border-l border-t border-r border-b border-gray-300 dark:border-gray-800 rounded-md'
            }
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(page) => getPage(page.selected + 1)}
            containerClassName={'flex items-center p-2'}
            activeClassName={'text-green-300'}
            pageClassName={
              'flex justify-center items-center space-x-2 mx-1 border-l border-t border-r border-b border-gray-300 cursor-pointer dark:border-gray-800 p-2 w-6 h-6 rounded-md'
            }
          />
        </div>
      )}
    </div>
  );
};

export default CollectorsPage;
