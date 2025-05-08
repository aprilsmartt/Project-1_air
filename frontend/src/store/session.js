import { csrfFetch } from './csrf';

// Action Types
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// Action Creators (functions)
const setUser = (user) => {
    return {
        type: SET_USER,  // type tells reducer what kind of change to make
        payload: user  // payload is data sent with action
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER, //type tells reducer what kind of change to make
    };
};

// Thunk is a function returning a function
// Thunk Action for Login
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password
      })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
  
  const initialState = { user: null };
  
  // Session Uaer's Redux Reducer
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.payload };
      case REMOVE_USER:
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  export default sessionReducer;
  


