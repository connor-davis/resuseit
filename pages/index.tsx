import AccountDropdown from '../components/dropdowns/account';
import CollectionsDropdown from '../components/dropdowns/collections';
import CollectorsDropdown from '../components/dropdowns/collectors';
import Footer from '../components/footer';
import Head from 'next/head';
import ItemsDropdown from '../components/dropdowns/items';
import Navbar from '../components/navbar';
import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import UsersDropdown from '../components/dropdowns/users';
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
              <UsersDropdown />
              <ItemsDropdown />
            </>
          ) : (
            <div>Please authenticate.</div>
          )}
          <AccountDropdown />
        </Navbar>
        <div className="mb-auto">
          <Sidebar>
            {userInformation.userAuthenticationToken ? (
              <>
                <CollectionsDropdown />
                <CollectorsDropdown />
                <UsersDropdown />
                <ItemsDropdown />
              </>
            ) : (
              <div>Please authenticate.</div>
            )}
            <AccountDropdown />
          </Sidebar>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Index;
