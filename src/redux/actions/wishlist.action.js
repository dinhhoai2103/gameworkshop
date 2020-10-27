import {
  GET_WISHLIST,
  UPDATE_WISHLIST,
  DELETE_WISHLIST
} from '../constants'


export function getWishlist(params) {
  return {
    type: GET_WISHLIST,
    payload: params,
  }
}
export function updateWishlist(params) {
  return {
    type: UPDATE_WISHLIST,
    payload: params,
  }
}
export function deleteWishlist(params) {
  return {
    type: DELETE_WISHLIST,
    payload: params,
  }
}


