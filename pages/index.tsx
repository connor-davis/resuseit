import AccountDropdown from '../components/dropdowns/account';
import CollectionsDropdown from '../components/dropdowns/collections';
import CollectorsDropdown from '../components/dropdowns/collectors';
import Footer from '../components/footer';
import Head from 'next/head';
import ItemsDropdown from '../components/dropdowns/items';
import Navbar from '../components/navbar';
import React from 'react';

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>ReUse-It | Welcome.</title>
      </Head>
      <div className="flex flex-col relative h-screen w-screen">
        <Navbar title="ReUse-It">
          <CollectionsDropdown />
          <CollectorsDropdown />
          <ItemsDropdown />
          <AccountDropdown />
        </Navbar>
        <div className="mb-auto"></div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Index;
