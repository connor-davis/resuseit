import AccountDropdown from '../components/dropdowns/account';
import AccountFooter from '../components/accountFooter';
import CollectionsDropdown from '../components/dropdowns/collections';
import CollectionsIcon from '../components/icons/collections';
import CollectorsDropdown from '../components/dropdowns/collectors';
import CollectorsIcon from '../components/icons/collectors';
import Content from '../components/content';
import Footer from '../components/footer';
import Head from 'next/head';
import ItemsDropdown from '../components/dropdowns/items';
import ItemsIcon from '../components/icons/items';
import Navbar from '../components/navbar';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import SidebarItem from '../components/sidebar/sidebarItem';
import UsersDropdown from '../components/dropdowns/users';
import UsersIcon from '../components/icons/users';
import { getUserInformation } from '../store/slices/user';
import { useSelector } from 'react-redux';

const Index: React.FC = () => {
  let userInformation = useSelector(getUserInformation);

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
