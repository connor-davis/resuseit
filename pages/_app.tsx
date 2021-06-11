import '../styles/global.css';

import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '../store/store';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { PersistGate } from 'redux-persist/integration/react';
import { getMode } from '../store/slices/mode';

let ModeProvider = ({ children }) => {
  let mode = useSelector(getMode);
  return <div className={mode}>{children}</div>;
};

let MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={() => <div>Loading</div>}>
        <ModeProvider>
          <div className="outline-none font-sans flex flex-col w-screen h-screen text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-black select-none">
            <Component {...pageProps} />
          </div>
        </ModeProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
