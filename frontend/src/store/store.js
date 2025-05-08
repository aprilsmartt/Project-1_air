import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { login } from './session'; 

const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'hello':
      console.log('Received hello action');
      return { ...state, message: 'Hello received' };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  test: testReducer,
  // login: loginReducer
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

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

  // // Expose store and login to the window for DevTools testing
  // if (import.meta.env.DEV) {
  //   window.store = store;
  //   window.login = login;
  // }


export default configureStore;
