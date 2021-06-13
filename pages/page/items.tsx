import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddIcon from '../../components/icons/add';
import AddItemModal from '../../components/modals/items/add';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { getUserInformation } from '../../store/slices/user';

let ItemsPage = () => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

  let [page, setPage] = useState(1);
  let [sortBy, setSortBy] = useState({ userLastName: 'asc' });

  let [showAddItemModal, setShowAddItemModal] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await axios.get('/api/items', {
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
      <Navbar title="Items">
        <AddItemModal
          show={showAddItemModal}
          onAdd={(item) => console.log(item)}
          onCancel={() => setShowAddItemModal(false)}
        />

        <div
          className="flex justify-center z-0 items-center bg-green-300 text-green-600 px-2 py-1 space-x-2 rounded-md cursor-pointer"
          onClick={() => setShowAddItemModal(true)}
        >
          <AddIcon />
          <div>Add</div>
        </div>
      </Navbar>
    </div>
  );
};
export default ItemsPage;
