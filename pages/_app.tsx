import '../styles/global.css';

import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getUserInformation, unsetUserInformation } from '../store/slices/user';
import { persistor, store } from '../store/store';

import AccountDropdown from '../components/dropdowns/account';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import CollectionsIcon from '../components/icons/collections';
import CollectorsIcon from '../components/icons/collectors';
import DashboardIcon from '../components/icons/dashboard';
import Footer from '../components/footer';
import ItemsIcon from '../components/icons/items';
import Link from 'next/link';
import LoginPage from './authentication/login';
import Navbar from '../components/navbar';
import { PersistGate } from 'redux-persist/integration/react';
import Sidebar from '../components/sidebar/sidebar';
import SidebarItem from '../components/sidebar/sidebarItem';
import UsersIcon from '../components/icons/users';
import axios from 'axios';
import { getMode } from '../store/slices/mode';

let ModeProvider = ({ children }) => {
  let mode = useSelector(getMode);
  return <div className={mode}>{children}</div>;
};

let UserProvidedNavbar = () => {
  let userInformation = useSelector(getUserInformation);

  return (
    <Navbar title="ReUse-It">
      {userInformation.userAuthenticationToken && (
        <>
          <div className="md:hidden">
            <Link href="/">
              <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-300 relative dark:hover:bg-gray-800 transition duration-500 ease-in-out focus:outline-none rounded-md">
                <DashboardIcon />
                <div>Dashboard</div>
              </div>
            </Link>
            <Link href="/page/collections">
              <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-300 relative dark:hover:bg-gray-800 transition duration-500 ease-in-out focus:outline-none rounded-md">
                <CollectionsIcon />
                <div>Collections</div>
              </div>
            </Link>
            <Link href="/page/collectors">
              <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-300 relative dark:hover:bg-gray-800 transition duration-500 ease-in-out focus:outline-none rounded-md">
                <CollectorsIcon />
                <div>Collectors</div>
              </div>
            </Link>
            <Link href="/page/users">
              <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-300 relative dark:hover:bg-gray-800 transition duration-500 ease-in-out focus:outline-none rounded-md">
                <UsersIcon />
                <div>Users</div>
              </div>
            </Link>
            <Link href="/page/items">
              <div className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-300 relative dark:hover:bg-gray-800 transition duration-500 ease-in-out focus:outline-none rounded-md">
                <ItemsIcon />
                <div>Items</div>
              </div>
            </Link>
          </div>
        </>
      )}
      <AccountDropdown />
    </Navbar>
  );
};

let AuthenticationGuard = ({ Component, pageProps }: AppProps) => {
  let dispatch = useDispatch();

  let userInformation = useSelector(getUserInformation);

  useEffect(() => {
    (async () => {
      axios
        .get('/api/authentication/login', {
          headers: {
            Authorization: 'Bearer ' + userInformation.userAuthenticationToken,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch(() => dispatch(unsetUserInformation({})));
    })();
  }, []);

  return userInformation.userAuthenticationToken ? (
    <div className="outline-none font-sans flex flex-col w-screen h-screen text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-black select-none">
      <UserProvidedNavbar />
      <div className="outline-none font-sans relative flex flex-row justify-start w-full h-full text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-black select-none">
        <Sidebar>
          <SidebarItem itemStart={[<DashboardIcon />]} path="/">
            Dashboard
          </SidebarItem>
          <SidebarItem
            itemStart={[<CollectionsIcon />]}
            path="/page/collections"
          >
            Collections
          </SidebarItem>
          <SidebarItem itemStart={[<CollectorsIcon />]} path="/page/collectors">
            Collectors
          </SidebarItem>
          <SidebarItem itemStart={[<UsersIcon />]} path="/page/users">
            Users
          </SidebarItem>
          <SidebarItem itemStart={[<ItemsIcon />]} path="/page/items">
            Items
          </SidebarItem>
        </Sidebar>
        <div className="flex flex-col w-full h-full">
          <Component {...pageProps} />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <LoginPage />
  );
};

let MyApp = (props: AppProps) => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={() => <div>Loading</div>}>
      <ModeProvider>
        <AuthenticationGuard {...props} />
      </ModeProvider>
    </PersistGate>
  </Provider>
);

export default MyApp;
