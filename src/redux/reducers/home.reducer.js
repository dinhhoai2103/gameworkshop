import {
  GET_ACTION_GAME_SUCCESS,
  GET_ADVENTURE_GAME_SUCCESS,
  GET_CASUAL_GAME_SUCCESS,
  GET_MOBILE_GAME_SUCCESS,
  GET_OTHER_SUCCESS,
  GET_SAME_GAME_SUCCESS
} from "../constants";
const initialState = {
  actionGame: [],
  adventureGame: [],
  casualGame: [],
  mobileGame: [],
  other: [],
  sameGame: []
};
function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTION_GAME_SUCCESS: {
      return {
        ...state,
        actionGame: [...action.payload],
      };
    }
    case GET_ADVENTURE_GAME_SUCCESS: {
      return {
        ...state,
        adventureGame: [...action.payload],
      };
    }
    case GET_CASUAL_GAME_SUCCESS: {
      return {
        ...state,
        casualGame: [...action.payload],
      };
    }
    case GET_MOBILE_GAME_SUCCESS: {
      return {
        ...state,
        mobileGame: [...action.payload],
      };
    }
    case GET_OTHER_SUCCESS: {
      return {
        ...state,
        other: [...action.payload],
      };
    }
    case GET_SAME_GAME_SUCCESS: {
      return {
        ...state,
        sameGame: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export default homeReducer;
