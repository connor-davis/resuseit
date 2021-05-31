import React, { useEffect } from 'react';

import AccountDropdown from '../components/dropdowns/account';
import CollectionsDropdown from '../components/dropdowns/collections';
import CollectorsDropdown from '../components/dropdowns/collectors';
import Footer from '../components/footer';
import Head from 'next/head';
import ItemsDropdown from '../components/dropdowns/items';
import Navbar from '../components/navbar';
import { getUserInformation } from '../store/slices/user';
import { useSelector } from 'react-redux';

const Index: React.FC = () => {
  let userInformation = useSelector(getUserInformation);

  return (
    <>
      <Head>
        <title>ReUse-It | Welcome.</title>
      </Head>
      <div className="flex flex-col relative h-screen w-screen">
        <Navbar title="ReUse-It">
          {userInformation.userAuthenticationToken ? (
            <>
              <CollectionsDropdown />
              <CollectorsDropdown />
              <ItemsDropdown />
            </>
          ) : (
            <div>Please authenticate.</div>
          )}
          <AccountDropdown />
        </Navbar>
        <div className="mb-auto"></div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Index;
