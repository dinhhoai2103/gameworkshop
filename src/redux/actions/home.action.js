import {
  GET_ACTION_GAME,
  GET_ADVENTURE_GAME,
  GET_CASUAL_GAME,
  GET_MOBILE_GAME,
  GET_OTHER,
  GET_SAME_GAME,
} from "../constants";

export function getActionGame(params) {
  return {
    type: GET_ACTION_GAME,
    payload: params,
  };
}
export function getAdventureGame(params) {
  return {
    type: GET_ADVENTURE_GAME,
    payload: params,
  };
}
export function getCasualGame(params) {
  return {
    type: GET_CASUAL_GAME,
    payload: params,
  };
}
export function getMobileGame(params) {
  return {
    type: GET_MOBILE_GAME,
    payload: params,
  };
}
export function getOther(params) {
  return {
    type: GET_OTHER,
    payload: params,
  };
}
export function getSameGame(params) {
  return {
    type: GET_SAME_GAME,
    payload: params,
  };
}
