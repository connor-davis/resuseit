import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import axios from 'axios';
import { getUserInformation } from '../store/slices/user';

const Index: React.FC = () => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

  return (
    <>
      <Head>
        <title>ReUse-It | Dashboard.</title>
      </Head>
      <div className="flex flex-col"></div>
    </>
  );
};

export default Index;
