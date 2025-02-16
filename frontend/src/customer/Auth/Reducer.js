
const initialState = {
  jwt: null,
  isLoading: false,
  error: null,
  // ...other state properties...
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // ...other cases...
    default:
      return state;
  }
};

export default authReducer;
