import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import artistReducer from './artistReducer'
import registerReducer from './registerReducer'
import loginReducer from './loginReducer'
import clientReducer from './clientReducer'
import commentReducer from './commentReducer'
import paymentReducer from './paymentReducer'

import { persistReducer, persistStore } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistenceConfigs = {
  key: "root",
  storage: storageSession
};

const reducers = combineReducers({
  artistReducer,
  registerReducer,
  loginReducer,
  commentReducer,
  clientReducer,
  paymentReducer
})

const middlewares = applyMiddleware(thunk)

const persistedReducer = persistReducer(persistenceConfigs, reducers)

const store = createStore(
  persistedReducer,
  middlewares
);
const persistedStore = persistStore(store)

export { store, persistedStore }
