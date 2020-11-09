import { GET_COMMENT_SUCCESS, CREATE_COMMENT_SUCCESS } from "../constants";
const initialState = {
  comment: [],
};
function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT_SUCCESS: {
      return {
        ...state,
        comment: [...action.payload],
      };
    }
    case CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        comment: [...state.comment, action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export default commentReducer;
