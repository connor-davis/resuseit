import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { collectorsSlice } from './slices/collectors';
import { modeSlice } from './slices/mode';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './slices/user';

let collectorsReducer = collectorsSlice.reducer;
let userReducer = userSlice.reducer;
let modeReducer = modeSlice.reducer;

let persistConfig = {
  key: 'root',
  storage,
};

function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log(action);
      next(action);
      console.log(store.getState());
    };
  };
}

let rootReducer = combineReducers({
  collectorsReducer,
  userReducer,
  modeReducer,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    loggerMiddleware,
  ],
});

let persistor = persistStore(store);

export { store, persistor };
