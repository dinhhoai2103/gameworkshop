import {
  GET_USER,
  GET_USER_LOGIN,
  GET_USER_LOGOUT,
  GET_USER_INFO,
  CREATE_USER,
  CHANGE_PASSWORD, 
  UPDATE_INFO,
  COMPLETE_PAYMENT,
  COMPLETE_CART_PAYMENT
 
} from '../constants'

export function getUser(params) {
  return {
    type: GET_USER,
    payload: params,
  }
}
export function getUserLogin(params) {
  return {
    type: GET_USER_LOGIN,
    payload: params,
  }
}
export function getUserLogout(params) {
  return {
    type: GET_USER_LOGOUT,
    payload: params,
  }
}
export function getUserInfo(params) {
  return {
    type: GET_USER_INFO,
    payload: params,
  }
}

export function createUser(params) {
  return {
    type: CREATE_USER,
    payload: params,
  }
}
export function changePassword(params) {
  return {
    type: CHANGE_PASSWORD,
    payload: params,
  }
}
export function updateInfo(params) {
  return {
    type: UPDATE_INFO,
    payload: params,
  }
}
export function completePayment(params) {
  return {
    type: COMPLETE_PAYMENT,
    payload: params,
  }
}
export function completeCartPayment(params) {
  return {
    type: COMPLETE_CART_PAYMENT,
    payload: params,
  }
}




