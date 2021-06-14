import React, { useEffect, useState } from 'react';
import {
  addCollector,
  getCollectors,
  setCollectors,
} from '../../store/slices/collectors';
import {
  getUserInformation,
  unsetUserInformation,
} from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import AddCollectorModal from '../../components/modals/collectors/add';
import AddIcon from '../../components/icons/add';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import axios from 'axios';

let CollectorsPage = () => {
  let dispatch = useDispatch();

  let collectors = useSelector(getCollectors);
  let userInformation = useSelector(getUserInformation);

  let [page, setPage] = useState(1);
  let [sortBy, setSortBy] = useState({ userLastName: 'asc' });

  let [showAddCollectorModal, setShowAddCollectorModal] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await axios.get('/api/collectors', {
        headers: {
          Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
          page,
          sortBy,
        },
      });

      if (response.status === 200)
        dispatch(setCollectors(response.data.collectors));
    })();
  }, []);

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
      .then((response) => dispatch(addCollector(response)))
      .catch(() => dispatch(unsetUserInformation({})));
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

        <div
          className="flex justify-center z-0 items-center bg-green-300 text-green-600 px-2 py-1 space-x-2 rounded-md cursor-pointer"
          onClick={() => setShowAddCollectorModal(true)}
        >
          <AddIcon />
          <div>Add</div>
        </div>
      </Navbar>

      <div className="flex flex-col">
        {collectors.length > 0 &&
          collectors.map((collector) => (
            <div key={collector.collectorIdNumber}>
              {collector.collectorFirstName + ' ' + collector.collectorLastName}
            </div>
          ))}
      </div>
    </div>
  );
};
export default CollectorsPage;
