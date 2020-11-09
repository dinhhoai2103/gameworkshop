import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { showAlertNotice } from '../../util/alert';
import {
  GET_WISHLIST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
 
  UPDATE_WISHLIST,
  UPDATE_WISHLIST_SUCCESS,
  UPDATE_WISHLIST_FAIL,
  
  DELETE_WISHLIST,
  DELETE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_FAIL
} from '../constants';

function* getWishlistSaga(action){
  try {
    const { id } = action.payload
    const response = yield axios.get(`http://localhost:3001/wishlist?idUser=${id}`);
    const data = response.data;
    yield put({
      type: GET_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_WISHLIST_FAIL,
      payload: error,
    });
  }
}

function* updateWishlistSaga(action){
  try {
    const { idGame, idUser } = action.payload;
    const wishlistData = yield axios.get(`http://localhost:3001/wishlist?idGame=${idGame}&idUser=${idUser}`)
    let response = {}
    if (wishlistData.data.length > 0) {
      showAlertNotice({type: 'error', message: 'Sản phẩm đã có trong danh sách yêu thích'})
    } else {
      yield response = yield axios.post(`http://localhost:3001/wishlist`, action.payload);
      const data = response.data;
      yield put({
        type: UPDATE_WISHLIST_SUCCESS,
        payload: data,
      });
      yield showAlertNotice({type: 'success', message: 'Thêm vào danh sách yêu thích thành công'});
    }
  } catch (error) {
    yield put({
      type: UPDATE_WISHLIST_FAIL,
      payload: error,
    });
  }
}

function* deleteWishlistSaga(action){
  try {
    const { id } = action.payload
    yield axios.delete(`http://localhost:3001/wishlist/${id}`);
    yield put({
      type: DELETE_WISHLIST_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    yield put({
      type: DELETE_WISHLIST_FAIL,
      payload: error,
    });
  }
}

export default function* wishlistSaga(){
  yield takeEvery(GET_WISHLIST,  getWishlistSaga);
  yield takeEvery(UPDATE_WISHLIST, updateWishlistSaga);
  yield takeEvery(DELETE_WISHLIST, deleteWishlistSaga);
}
