import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showAlertNotice } from "../../util/alert";
import {
  GET_CART_DATA,
  GET_CART_DATA_SUCCESS,
  GET_CART_DATA_FAIL,

  GET_HISTORY,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_FAIL,

  ADD_CART,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,

  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,

  DELETE_CART_DATA,
  DELETE_CART_DATA_SUCCESS,
  DELETE_CART_DATA_FAIL,

  DELETE_HISTORY,
  DELETE_HISTORY_SUCCESS,
  DELETE_HISTORY_FAIL,
  
  PAYMENT_CART,
  PAYMENT_CART_SUCCESS,
  PAYMENT_CART_FAIL,
} from "../constants";

function* getCartDataSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.get(
      `http://localhost:3001/cartdata?idUser=${id}&isPay=false`
    );
    const data = response.data;
    yield put({
      type: GET_CART_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_CART_DATA_FAIL,
      payload: error,
    });
  }
}

function* getHistorySaga(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.get(
      `http://localhost:3001/cartdata?idUser=${id}&isPay=true`
    );
    const data = response.data;
    yield put({
      type: GET_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_HISTORY_FAIL,
      payload: error,
    });
  }
}

function* addCartSaga(action) {
  try {
    const { idGame, idUser, soluong, amount } = action.payload;
    const dataCart = yield axios.get(
      `http://localhost:3001/cartdata?idGame=${idGame}&idUser=${idUser}&isPay=${false}`
    );
    let response = {};
    if (amount <= 0) {
      showAlertNotice({ type: "error", message: "Sản phẩm đã hết" });
    } else {
      if (dataCart.data.length > 0) {
        response = yield axios.patch(
          `http://localhost:3001/cartdata/${dataCart.data[0].id}`,
          {
            soluong: dataCart.data[0].soluong + soluong,
          }
        );
      } else {
        response = yield axios.post(
          `http://localhost:3001/cartdata`,
          action.payload
        );
      }
      const data = response.data;
      yield put({
        type: ADD_CART_SUCCESS,
        payload: data,
      });
      yield showAlertNotice({
        type: "success",
        message: "Thêm vào giỏ hàng thành công",
      });
    }
  } catch (error) {
    yield put({
      type: ADD_CART_FAIL,
      payload: error,
    });
  }
}

function* updateCartSaga(action) {
  try {
    const { id, soluong } = action.payload;
    const response = yield axios.patch(`http://localhost:3001/cartdata/${id}`, {
      soluong,
    });
    const data = response.data;
    yield put({
      type: UPDATE_CART_SUCCESS,
      payload: data,
    });
    yield showAlertNotice({
      type: "success",
      message: "Thay đổi giỏ hàng thành công",
    });
  } catch (error) {
    yield put({
      type: UPDATE_CART_FAIL,
      payload: error,
    });
  }
}

function* deleteCartDataSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:3001/cartdata/${id}`);
    yield put({
      type: DELETE_CART_DATA_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    yield put({
      type: DELETE_CART_DATA_FAIL,
      payload: error,
    });
  }
}

function* deleteHistorySaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:3001/cartdata/${id}`);
    yield put({
      type: DELETE_HISTORY_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    yield put({
      type: DELETE_HISTORY_FAIL,
      payload: error,
    });
  }
}

function* paymentCartSaga(action) {
  try {
    const { id, isPay, time } = action.payload;
    const response = yield axios.patch(`http://localhost:3001/cartdata/${id}`, {
      isPay,
      time,
    });
    const data = response.data;
    yield put({
      type: PAYMENT_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: PAYMENT_CART_FAIL,
      payload: error,
    });
  }
}

export default function* cartDataSaga() {
  yield takeEvery(GET_CART_DATA, getCartDataSaga);
  yield takeEvery(ADD_CART, addCartSaga);
  yield takeEvery(UPDATE_CART, updateCartSaga);
  yield takeEvery(DELETE_CART_DATA, deleteCartDataSaga);
  yield takeEvery(DELETE_HISTORY, deleteHistorySaga);
  yield takeEvery(PAYMENT_CART, paymentCartSaga);
  yield takeEvery(GET_HISTORY, getHistorySaga);
}
