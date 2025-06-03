import { csrfFetch } from './csrf';

// Action Types
const CREATE_SPOT = 'spots/CREATE_SPOT';
const READ_SPOT = 'spots/READ_SPOT'; // GET a spot
const READ_ALL_SPOTS = 'spots/READ_ALL_SPOTS'; // GET all spots
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const SET_SPOT_DETAILS = 'spots/SET_SPOT_DETAILS';

// Action Creators (functions)
const createSpot = (newSpot) => ({
    type: CREATE_SPOT,  // type tells reducer what kind of change to make
    payload: newSpot  // payload is data sent with action
});

const readSpot = (spot) => ({
    type: READ_SPOT, //type tells reducer what kind of change to make
    payload: spot
});

const readAllSpots = (spots) => ({
    type: READ_ALL_SPOTS, //type tells reducer what kind of change to make
    payload: spots
});

const updateSpot = (spot) => ({
    type: UPDATE_SPOT, //type tells reducer what kind of change to make
    payload: spot
});

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT, //type tells reducer what kind of change to make
    payload: spotId
});

const setSpotDetails = (spot) => ({
    type: SET_SPOT_DETAILS,
    payload: spot
});



// Thunk is a function returning a function
// Thunk Action to Add a spot 
export const createSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    const data = await response.json();
    dispatch(createSpot(data));
    return data;
};

// Thunk Action to Get a spot by id (read/fetch)
export const getSpotByIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(readSpot(data));
    return data;
};

// Thunk Action to Get all spots (read/fetch)
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);
    const data = await response.json();
    console.log("DATA", data[0])
    dispatch(readAllSpots(data));
    return data.Spots;
};

// Thunk Action to Get all details
export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok) {
      const spotData = await res.json();
    
console.log("🟢 Spot data fetched:", spotData); // Add this

      dispatch(setSpotDetails(spotData));
      return spotData;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to load spot details');
    }
  } catch (err) {
    console.error("Error fetching spot details:", err);
    throw err;
  }
};

// // Thunk to load all spots
// export const loadAllSpots = () => async dispatch => {
//     const res = await fetch('/api/spots');
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(readAllSpots(data.spots));
//     }
// };

// Thunk Action to Update a spot
export const updateSpotThunk = (spotId, updatedData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    const data = await response.json();
    dispatch(updateSpot(data));
    return data;
};

// Thunk Action to Delete a spot 
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }

    return response;
};

const initialState = {
    // allSpots: {},
    // singleSpot: {}
};

// Spot Redux Reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT:
        case UPDATE_SPOT:
            return {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [action.payload.id]: action.payload
                }
            };

        case READ_ALL_SPOTS: {
            const allSpots = {};
            action.payload.forEach(spot => {
                allSpots[spot.id] = spot;
            });

            return {
                ...state,
                allSpots
            };
        }

        case DELETE_SPOT: {
            const newAllSpots = { ...state.allSpots };
            delete newAllSpots[action.payload];

            return {
                ...state,
                allSpots: newAllSpots
            };
        }

        case SET_SPOT_DETAILS:
            return {
                ...state,
                singleSpot: action.payload
            };


        default:
            return state;
    }
};


export default spotsReducer;



