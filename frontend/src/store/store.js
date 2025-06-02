//! createStore is deprecated... use createStore as alias
//! Don't mix old redux old redux packages with configureStore
//! UNABLE TO USE configureStore without refactoring file; cannot mix old Redux with Redux Tookit
// Import { configureStore as createStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// Import ALL Reducers
import sessionReducer from './session';
import spotsReducer from './spots';
import spotImagesReducer from './spotImages';
// import reviewImagesReducer from './reviewImages';
import reviewsReducer from './reviews';


//! TESTS ==================================================================================
/*const store = configureStore();

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
//! ====================================== END OF TESTS ======================================

const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  session: sessionReducer,
  spots: spotsReducer,
  images: combineReducers({
    spot: spotImagesReducer,
    // review: reviewImagesReducer
  }),
  reviews: reviewsReducer
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
  //! CANNOT use createStore as alias of configureStore; using deprecated createStore
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
