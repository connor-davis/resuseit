import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddCollectionModal from '../../components/modals/collections/add';
import AddIcon from '../../components/icons/add';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { getUserInformation } from '../../store/slices/user';

let CollectionsPage = () => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

  let [page, setPage] = useState(1);
  let [sortBy, setSortBy] = useState({ userLastName: 'asc' });

  let [showAddCollectionModal, setShowAddCollectionModal] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await axios.get('/api/collections', {
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
        <title>ReUse-It | Collections.</title>
      </Head>
      <Navbar title="Collections">
        <AddCollectionModal
          show={showAddCollectionModal}
          onAdd={(collection) => console.log(collection)}
          onCancel={() => setShowAddCollectionModal(false)}
        />

        <div
          className="flex justify-center z-0 items-center bg-green-300 text-green-600 px-2 py-1 space-x-2 rounded-md cursor-pointer"
          onClick={() => setShowAddCollectionModal(true)}
        >
          <AddIcon />
          <div>Add</div>
        </div>
      </Navbar>
    </div>
  );
};
export default CollectionsPage;
