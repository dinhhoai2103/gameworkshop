import {
  DELETE_CART_DATA,
  ADD_CART,
  UPDATE_CART,
  GET_CART_DATA,
  PAYMENT_CART,
  GET_HISTORY,
  DELETE_HISTORY,
} from "../constants";

export function getCartData(params) {
  return {
    type: GET_CART_DATA,
    payload: params,
  };
}
export function getHistory(params) {
  return {
    type: GET_HISTORY,
    payload: params,
  };
}
export function deleteCartData(params) {
  return {
    type: DELETE_CART_DATA,
    payload: params,
  };
}
export function deleteHistory(params) {
  return {
    type: DELETE_HISTORY,
    payload: params,
  };
}
export function addCart(params) {
  return {
    type: ADD_CART,
    payload: params,
  };
}
export function paymentCart(params) {
  return {
    type: PAYMENT_CART,
    payload: params,
  };
}
export function updateCart(params) {
  return {
    type: UPDATE_CART,
    payload: params,
  };
}
