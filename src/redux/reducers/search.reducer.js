import { GET_SEARCH_DATA_SUCCESS } from "../constants";
const initialState = {
  searchData: [],
};
function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_DATA_SUCCESS: {
      return {
        ...state,
        searchData: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export default searchReducer;
