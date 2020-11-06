
import { put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';
import history from '../../util/history';
import { showAlertNotice } from '../../util/alert';

import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_LOGIN,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAIL,
  GET_USER_LOGOUT,
  GET_USER_LOGOUT_SUCCESS,
  GET_USER_LOGOUT_FAIL,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  UPDATE_INFO,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAIL,
  COMPLETE_PAYMENT,
  COMPLETE_PAYMENT_SUCCESS,
  COMPLETE_PAYMENT_FAIL,
  COMPLETE_CART_PAYMENT,
  COMPLETE_CART_PAYMENT_SUCCESS,
  COMPLETE_CART_PAYMENT_FAIL

} from '../constants';

function* getUserSaga(action){
  try {
    const { email } = action.payload
    const response = yield axios.get(`http://localhost:3001/userlist?email=${email}`);
    const data = response.data;
    yield put({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_FAIL,
      payload: error,
    });
  }
}

function* getUserLoginSaga(action){
  try {
    
    const { email, password } = action.payload
    const response = yield axios.get(`http://localhost:3001/userlist?email=${email}&password=${password}`);
    const data = response.data;
    if (data.length > 0) {
      yield localStorage.setItem("Auth User", JSON.stringify(data[0]));
      yield showAlertNotice({type: 'success', message: 'Đăng nhập thành công'});
      yield history.push('/');
    } else {
      yield showAlertNotice({type: 'error', message: 'Sai tài khoản hoặc mật khẩu'});
    }
    yield put({
      type: GET_USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_LOGIN_FAIL,
      payload: error,
    });
  }
}
function* getUserLogoutSaga(){
  try {
    const response = yield axios.get(`http://localhost:3001/userlist`);
    const data = response.data;
    yield localStorage.clear();
    yield showAlertNotice({type: 'success', message: 'Đăng xuất thành công'})
    yield put({
      type: GET_USER_LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_LOGOUT_FAIL,
      payload: error,
    });
  }
}
function* getUserInfoSaga(){
  try {
    const response = yield axios.get(`http://localhost:3001/userInfo`);
    const data = response.data;
    yield put({
      type: GET_USER_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_INFO_FAIL,
      payload: error,
    });
  }
}
function* createUserSaga(action){
  try {
    const { email } = action.payload
    const registerData = yield axios.get(`http://localhost:3001/userlist?email=${email}`);
    const response = (registerData.data.length <= 0) 
    ? 
    (
      yield axios.post(`http://localhost:3001/userlist`, action.payload),
      yield showAlertNotice({type: 'success', message: 'Đăng ký thành công'}),
      yield history.push('/login')
    ) :
    (
      yield showAlertNotice({type: 'error', message: 'Email đã tồn tại'})
    ) 
    const data = response.data
    yield put({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_USER_FAIL,
      payload: error,
    });
  }
}
function* changePasswordSaga(action){
  try {
    const { id, password } = action.payload
    const response = yield axios.patch(`http://localhost:3001/userlist/${id}`, {password} );
    const data = response.data;
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data
    });
    yield showAlertNotice({type: 'success', message: 'Đổi mật khẩu thành công'})
  } catch (error) {
    yield put({
      type: CHANGE_PASSWORD_FAIL,
      payload: error,
    });
  }
}
function* updateInfoSaga(action){
  try {
    const { id, firstname, lastname, phone } = action.payload
    const response = yield axios.patch(`http://localhost:3001/userlist/${id}`, {firstname, lastname, phone} );
    const data = response.data;
    yield localStorage.setItem("Auth User", JSON.stringify(data));
    yield put({
      type: UPDATE_INFO_SUCCESS,
      payload: data
    });
    yield showAlertNotice({type: 'success', message: 'Thay đổi thông tin thành công'})
  } catch (error) {
    yield put({
      type: UPDATE_INFO_FAIL,
      payload: error,
    });
  }
}
function* completePaymentSaga(action){
  try {
    const { id, money } = action.payload
    const response = yield axios.patch(`http://localhost:3001/userlist/${id}`, { money } );
    const data = response.data;
    yield localStorage.setItem("Auth User", JSON.stringify(data));
    yield put({
      type: COMPLETE_PAYMENT_SUCCESS,
      payload: data
    });
    yield showAlertNotice({type: 'success', message: 'Nạp tiền thành công'})
  } catch (error) {
    yield put({
      type: COMPLETE_PAYMENT_FAIL,
      payload: error,
    });
  }
}
function* completeCartPaymentSaga(action){
  try {
    const { id, money } = action.payload
    const response = yield axios.patch(`http://localhost:3001/userlist/${id}`, { money } );
    const data = response.data;
    yield localStorage.setItem("Auth User", JSON.stringify(data));
    yield put({
      type: COMPLETE_CART_PAYMENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: COMPLETE_CART_PAYMENT_FAIL,
      payload: error,
    });
  }
}





export default function* userListSaga(){
  
  yield takeEvery(GET_USER, getUserSaga);
  yield takeEvery(GET_USER_LOGIN, getUserLoginSaga);
  yield takeEvery(GET_USER_LOGOUT, getUserLogoutSaga);
  yield takeEvery(GET_USER_INFO, getUserInfoSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(CHANGE_PASSWORD, changePasswordSaga);
  yield takeEvery(UPDATE_INFO, updateInfoSaga);
  yield takeEvery(COMPLETE_PAYMENT, completePaymentSaga);
  yield takeEvery(COMPLETE_CART_PAYMENT, completeCartPaymentSaga);
}
