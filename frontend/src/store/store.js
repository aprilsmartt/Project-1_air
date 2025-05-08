import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
// import { login } from './session'; 
// import configureStore from './store';

// /*const store = configureStore();*/

/*
const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'hello':
      console.log('Received hello action');
      return { ...state, message: 'Hello received' };
    default:
      return state;
  }
};
*/

const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  session: sessionReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Configure the store and export the function to create the store
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

  // // Expose store and login to the window for DevTools testing
  // if (import.meta.env.DEV) {
  //     restoreCSRF();
  //   window.store = store;
  //   window.sessionActions = sessionActions;
  // }

export default configureStore;
