import '../styles/global.css';

import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '../store/store';

import AccountDropdown from '../components/dropdowns/account';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import CollectionsIcon from '../components/icons/collections';
import CollectorsIcon from '../components/icons/collectors';
import Footer from '../components/footer';
import ItemsIcon from '../components/icons/items';
import LoginPage from './authentication/login';
import Navbar from '../components/navbar';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import SidebarItem from '../components/sidebar/sidebarItem';
import UsersIcon from '../components/icons/users';
import { getMode } from '../store/slices/mode';
import { getUserInformation } from '../store/slices/user';

let ModeProvider = ({ children }) => {
  let mode = useSelector(getMode);
  return <div className={mode}>{children}</div>;
};

let UserProvidedNavbar = () => {
  let userInformation = useSelector(getUserInformation);

  return (
    <Navbar title="ReUse-It">
      <AccountDropdown />
    </Navbar>
  );
};

let AuthenticationGuard = ({ Component, pageProps }: AppProps) => {
  let userInformation = useSelector(getUserInformation);

  return userInformation.userAuthenticationToken ? (
    <div className="outline-none font-sans flex flex-col w-screen h-screen text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-black select-none">
      <UserProvidedNavbar />
      <div className="outline-none font-sans relative flex flex-row justify-start w-full h-full text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-black select-none">
        <Sidebar>
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
