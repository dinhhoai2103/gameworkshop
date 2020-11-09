import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  GET_GAME_BY_TYPE,
  GET_GAME_BY_TYPE_SUCCESS,
  GET_GAME_BY_TYPE_FAIL,

  GET_GAME_BY_CATEGORY,
  GET_GAME_BY_CATEGORY_SUCCESS,
  GET_GAME_BY_CATEGORY_FAIL,

  GET_GAME_DETAIL,
  GET_GAME_DETAIL_SUCCESS,
  GET_GAME_DETAIL_FAIL,

  GET_GAME_DATA,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_DATA_FAIL,

  GET_GAME_LIST,
  GET_GAME_LIST_SUCCESS,
  GET_GAME_LIST_FAIL,
} from "../constants";

function* getGameDataSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.get(`http://localhost:3001/gameData/${id}`);
    const data = response.data;
    yield put({
      type: GET_GAME_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_GAME_DATA_FAIL,
      payload: error,
    });
  }
}

function* getGameListSaga() {
  try {
    const response = yield axios.get(`http://localhost:3001/gameData`);
    const data = response.data;
    yield put({
      type: GET_GAME_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_GAME_LIST_FAIL,
      payload: error,
    });
  }
}

function* getGameByTypeSaga(action) {
  try {
    const { type, page, more, sort, order } = action.payload;
    const response = yield axios({
      method: "GET",
      url: "http://localhost:3001/gameData",
      params: {
        _page: page,
        _limit: 12,
        _sort: sort,
        _order: order,
        style: "type",
        ...(type && { type }),
      },
    });
    const data = response.data;
    yield put({
      type: GET_GAME_BY_TYPE_SUCCESS,
      payload: {
        data,
        more,
      },
    });
  } catch (error) {
    yield put({
      type: GET_GAME_BY_TYPE_FAIL,
      payload: error,
    });
  }
}

function* getGameByCategorySaga(action) {
  try {
    const { type, page, more, sort, order } = action.payload;

    let APIUrl = type
      ? `http://localhost:3001/gameData?_page=${page}&_limit=12&category=${type}&_sort=${sort}&_order=${order}`
      : `http://localhost:3001/gameData?_page=${page}&_limit=12&_sort=${sort}&_order=${order}`;
    const response = yield axios.get(APIUrl);

    const data = response.data;
    yield put({
      type: GET_GAME_BY_CATEGORY_SUCCESS,
      payload: {
        data,
        more,
      },
    });
  } catch (error) {
    yield put({
      type: GET_GAME_BY_CATEGORY_FAIL,
      payload: error,
    });
  }
}

function* getGameDetailSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield axios.get(`http://localhost:3001/gameDetail/${id}`);
    const data = response.data;
    yield put({
      type: GET_GAME_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_GAME_DETAIL_FAIL,
      payload: error,
    });
  }
}

export default function* gameDataSaga() {
  yield takeEvery(GET_GAME_DATA, getGameDataSaga);
  yield takeEvery(GET_GAME_LIST, getGameListSaga);
  yield takeEvery(GET_GAME_BY_TYPE, getGameByTypeSaga);
  yield takeEvery(GET_GAME_BY_CATEGORY, getGameByCategorySaga);
  yield takeEvery(GET_GAME_DETAIL, getGameDetailSaga);
}
