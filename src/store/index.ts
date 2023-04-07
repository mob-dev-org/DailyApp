import { configureStore } from '@reduxjs/toolkit';
import createDebugger from 'redux-flipper';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import createSecureStorage from './createSecureStorage';
import rootReducer from './reducers';

// Secure storage
const storage = createSecureStorage();

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

/* eslint-disable  @typescript-eslint/no-explicit-any */
const middleware: any[] = [];
if (__DEV__) {
    middleware.push(createDebugger());
}

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(middleware),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
