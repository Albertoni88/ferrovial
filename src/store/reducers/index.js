import { combineReducers } from 'redux';
import incidenciaReducer from './incidenciaReducer';
import userReducer from './userReducer';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import {applyMiddleware, createStore} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import {MODE} from 'react-native-dotenv';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistStore, persistReducer} from 'redux-persist';
// import thunk from 'redux-thunk';
// import promise from 'redux-promise-middleware';



const appReducer = combineReducers({
  user: userReducer,
  incidencia: incidenciaReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const middleware = [thunk];
const composeEnhancers =
  global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
// const store = createStore(reducer, {}, enhancer);
const store = createStore(rootReducer, {}, enhancer);


// let middleware;
// if (MODE === 'dev') {
//   middleware = composeWithDevTools(
//     applyMiddleware(promise, thunk),
//   );
// } else {
//   middleware = composeWithDevTools(applyMiddleware(promise, thunk));
// }

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   timeout: null,
// };


// const persistedReducer = persistReducer(persistConfig, rootReducer);


// const store = createStore(persistedReducer, middleware);

// let persistor = persistStore(store);

// export {store, persistor};
//export default rootReducer;
export default store;