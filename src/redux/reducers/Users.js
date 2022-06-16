import types from "../types";

const initialState = {
    users: [],
    userprofile: {}
}


function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.USERS_DATA:
            return { ...state, users: action.payload }
        case types.USER_PROFILE:
            return { ...state, userprofile: action.payload }
        default:
            return state;
    }
}

export default userReducer