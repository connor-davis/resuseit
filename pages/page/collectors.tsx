import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddCollectorModal from '../../components/modals/collectors/add';
import AddIcon from '../../components/icons/add';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { getUserInformation } from '../../store/slices/user';

let CollectorsPage = () => {
  let dispatch = useDispatch();

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

      console.log(response);
    })();
  }, []);

  return (
    <div className="flex flex-col w-full h-full z-0">
      <Head>
        <title>ReUse-It | Collectors.</title>
      </Head>
      <Navbar>
        <AddCollectorModal
          show={showAddCollectorModal}
          onAdd={(collector) => console.log(collector)}
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
    </div>
  );
};
export default CollectorsPage;
