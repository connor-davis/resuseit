import React, { useEffect } from 'react';
import { getUserInformation, unsetUserInformation } from '../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import axios from 'axios';

const Index: React.FC = () => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

  useEffect(() => {
    axios
      .get('/api/collections', {
        headers: {
          Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
        },
      })
      .then((response) => {
        if (response.status === 401) dispatch(unsetUserInformation({}));
      })
      .catch(() => {
        dispatch(unsetUserInformation({}));
      });
  }, []);

  return (
    <>
      <Head>
        <title>ReUse-It | Welcome.</title>
      </Head>
      <div className="flex flex-col"></div>
    </>
  );
};

export default Index;
