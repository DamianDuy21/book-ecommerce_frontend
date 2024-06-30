import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authenReducer from './AuthenReducer/authenReducer';
import cartReducer from './CartReducer/cartReducer';
import buyNowReducer from './BuyNowReducer/buyNowReducer';
import searchNameReducer from './SearchNameReducer/searchNameReducer';
import manageReducer from './ManageReducer/manageReducer';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: ['account'] //account will not be persisted
}

const rootReducer = combineReducers({
    authen: authenReducer,
    cart: cartReducer,
    buyNow: buyNowReducer,
    searchName: searchNameReducer,
    manage: manageReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store)

export { store, persistor };

