import {
  GET_GAME_BY_TYPE_SUCCESS,
  GET_GAME_BY_CATEGORY_SUCCESS,
  GET_GAME_DETAIL_SUCCESS,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_LIST_SUCCESS,
} from "../constants";
const initialState = {
  gameData: [],
  gameDetail: [],
  game: [],
  gameList: [],
  gameType: [],
};
function gameDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAME_BY_TYPE_SUCCESS: {
      const { data, more } = action.payload;
      if (more) {
        return {
          ...state,
          gameType: [...state.gameType, ...data],
        };
      }
      return {
        ...state,
        gameType: [...data],
      };
    }
    case GET_GAME_BY_CATEGORY_SUCCESS: {
      const { data, more } = action.payload;
      if (more) {
        return {
          ...state,
          gameData: [...state.gameData, ...data],
        };
      }
      return {
        ...state,
        gameData: [...data],
      };
    }
    case GET_GAME_DETAIL_SUCCESS: {
      return {
        ...state,
        gameDetail: [action.payload],
      };
    }
    case GET_GAME_DATA_SUCCESS: {
      return {
        ...state,
        game: [action.payload],
      };
    }
    case GET_GAME_LIST_SUCCESS: {
      return {
        ...state,
        gameList: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export default gameDataReducer;
