import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_SEARCH_DATA,
  GET_SEARCH_DATA_SUCCESS,
  GET_SEARCH_DATA_FAIL,

} from '../constants';

function* getSearchData(action){
  try {
    const { input } = action.payload
    const response = yield axios.get(`http://localhost:3001/gameData?q=${input}`);
    const data = response.data;
    yield put({
      type: GET_SEARCH_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_SEARCH_DATA_FAIL,
      payload: error,
    });
  }
}


export default function* searchSaga(){
  
  yield takeEvery(GET_SEARCH_DATA, getSearchData);


}
