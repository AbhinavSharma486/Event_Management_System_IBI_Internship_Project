import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice.js";
import eventReducer from "./slices/eventSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'events']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'persist/PAUSE',
        'persist/FLUSH',
        'persist/PURGE',
        'persist/REGISTER',
      ]
    }
  })
});

export const persistor = persistStore(store);
export default store;