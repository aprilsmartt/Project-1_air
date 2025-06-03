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
// Thunk Action for Login  //! changed from login to loginUser
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data;
    } else {
        // Throw response so caller can handle error
        throw response;
    }
};

// Thunk Action for Logout    //! changed from logout to logoutUser
export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    dispatch(removeUser());
    return response;
};

// Thunk Action for Restore User
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// Thunk Action for Sign Up   //! changed from signup to signupUser
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
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



