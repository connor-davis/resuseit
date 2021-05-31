import '../styles/global.css';

import { persistor, store } from '../store/store';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

let MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="outline-none font-sans flex flex-col w-screen h-screen text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-black select-none">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={() => <div>Loading</div>}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default MyApp;
