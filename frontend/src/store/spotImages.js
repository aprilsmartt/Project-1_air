import { csrfFetch } from './csrf';

// Action Types
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE';
const DELETE_SPOT_IMAGE = 'spots/DELETE_SPOT_IMAGE';

// Action Creators (functions)
const createSpotImage = (spotImage) => ({
    type: CREATE_SPOT_IMAGE,  // type tells reducer what kind of change to make
    payload: spotImage  // payload is data sent with action
});

const deleteSpotImage = (spotImageId) => ({
    type: DELETE_SPOT_IMAGE, //type tells reducer what kind of change to make
    payload: spotImageId
});

// Thunk is a function returning a function
// Thunk Action to Add a spot image
export const createSpotImageThunk = (spotId, spotImage) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotImage)
    });

    const data = await response.json();
    dispatch(createSpotImage(data));
    return data;
};

// Thunk Action to Delete a spot image
export const deleteSpotImageThunk = (spotImageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spotImages/${spotImageId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSpotImage(spotImageId));
    }

    return response; 
};

const initialState = {};

// Spot Image Redux Reducer
const spotImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT_IMAGE:
            return {
                ...state,
                // Dynamic key:value
                [action.payload.id]: action.payload
            };
        case DELETE_SPOT_IMAGE: {
            const newState = { ...state };
            delete newState[action.payload]
            return newState;
        }
        
        default:
            return state;
    }
};


export default spotImageReducer;



