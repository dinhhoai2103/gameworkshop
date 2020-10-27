import {
  GET_GAME_BY_CATEGORY,
  GET_GAME_BY_TYPE,
  GET_GAME_DETAIL,
  GET_GAME_DATA,
  GET_GAME_LIST,
} from '../constants'

export function getGameByType(params) {
  return {
    type: GET_GAME_BY_TYPE,
    payload: params,
  }
}
export function getGameByCategory(params) {
  return {
    type: GET_GAME_BY_CATEGORY,
    payload: params,
  }
}
export function getGameDetail(params) {
  return {
    type: GET_GAME_DETAIL,
    payload: params,
  }
}
export function getGameData(params) {
  return {
    type: GET_GAME_DATA,
    payload: params,
  }
}

export function getGameList(params) {
  return {
    type: GET_GAME_LIST,
    payload: params,
  }
}




