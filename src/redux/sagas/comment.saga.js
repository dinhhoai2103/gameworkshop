import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,

  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL
} from '../constants';

function* getComment(){
  try {
    const response = yield axios.get(`http://localhost:3001/comment`);
    const data = response.data;
    yield put({
      type: GET_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_FAIL,
      payload: error,
    });
  }
}
function* createComment(action){
  try {
    const response = yield axios.post(`http://localhost:3001/comment`, action.payload);
    const data = response.data;
    yield put({
      type: CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_COMMENT_FAIL,
      payload: error,
    });
  }
}

export default function* commentSaga(){
  
  yield takeEvery(GET_COMMENT,  getComment);
  yield takeEvery(CREATE_COMMENT,  createComment);

}
