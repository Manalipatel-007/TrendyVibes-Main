const initialState = {
    jwt: null,
    user: null,
    // Add other initial state properties here
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_JWT':
            return {
                ...state,
                jwt: action.payload,
            };
        // Add other cases here
        default:
            return state;
    }
};

export default authReducer;
