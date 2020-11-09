import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_ACTION_GAME,
  GET_ACTION_GAME_SUCCESS,
  GET_ACTION_GAME_FAIL,

  GET_ADVENTURE_GAME,
  GET_ADVENTURE_GAME_SUCCESS,
  GET_ADVENTURE_GAME_FAIL,

  GET_CASUAL_GAME,
  GET_CASUAL_GAME_SUCCESS,
  GET_CASUAL_GAME_FAIL,

  GET_MOBILE_GAME,
  GET_MOBILE_GAME_SUCCESS,
  GET_MOBILE_GAME_FAIL,

  GET_OTHER,
  GET_OTHER_SUCCESS,
  GET_OTHER_FAIL,

  GET_SAME_GAME,
  GET_SAME_GAME_SUCCESS,
  GET_SAME_GAME_FAIL,
  
} from '../constants';

function* getSameGameSaga(action){
  try {
    const { page, type } = action.payload;  
    const response = yield axios.get(`http://localhost:3001/gameData?_page=${page}&_limit=4&type=${type}`);
    const data = response.data;
    yield put({
      type: GET_SAME_GAME_SUCCESS,
      payload: data
    });
  }
   catch (error) {
    yield put({
      type: GET_SAME_GAME_FAIL,
      payload: error,
    });
  }
}

function* getActionGameSaga(action){
  try {
    const { page } = action.payload;  
    const response = yield axios.get(`http://localhost:3001/gameData?_page=${page}&_limit=4&type=Action`);
    const data = response.data;
    yield put({
      type: GET_ACTION_GAME_SUCCESS,
      payload: data
    });
  }
   catch (error) {
    yield put({
      type: GET_ACTION_GAME_FAIL,
      payload: error,
    });
  }
}

function* getAdventureGameSaga(action){
  try {
    const { page } = action.payload;  
    const response = yield axios.get(`http://localhost:3001/gameData?_page=${page}&_limit=4&type=Adventure`);
    const data = response.data;
    yield put({
      type: GET_ADVENTURE_GAME_SUCCESS,
      payload: data
    });
  }
   catch (error) {
    yield put({
      type: GET_ADVENTURE_GAME_FAIL,
      payload: error,
    });
  }
}

function* getCasualGameSaga(action){
  try {
    const { page } = action.payload;  
    const response = yield axios.get(`http://localhost:3001/gameData?_page=${page}&_limit=4&type=Casual`);
    const data = response.data;
    yield put({
      type: GET_CASUAL_GAME_SUCCESS,
      payload: data
    });
  }
   catch (error) {
    yield put({
      type: GET_CASUAL_GAME_FAIL,
      payload: error,
    });
  }
}

function* getMobileGameSaga(action){
  try {
    const { page } = action.payload;  
    const response = yield axios.get(`http://localhost:3001/gameData?_page=${page}&_limit=4&category=mobile`);
    const data = response.data;
    yield put({
      type: GET_MOBILE_GAME_SUCCESS,
      payload: data
    });
  }
   catch (error) {
    yield put({
      type: GET_MOBILE_GAME_FAIL,
      payload: error,
    });
  }
}

function* getOtherSaga(action){
  try {
    const { page } = action.payload;  
    const response = yield axios.get(`http://localhost:3001/gameData?_page=${page}&_limit=4&category=other`);
    const data = response.data;
    yield put({
      type: GET_OTHER_SUCCESS,
      payload: data
    });
  }
   catch (error) {
    yield put({
      type: GET_OTHER_FAIL,
      payload: error,
    });
  }
}

export default function* homeData(){
  yield takeEvery(GET_ACTION_GAME,  getActionGameSaga);
  yield takeEvery(GET_ADVENTURE_GAME,  getAdventureGameSaga);
  yield takeEvery(GET_CASUAL_GAME,  getCasualGameSaga);
  yield takeEvery(GET_MOBILE_GAME,  getMobileGameSaga);
  yield takeEvery(GET_OTHER,  getOtherSaga);
  yield takeEvery(GET_SAME_GAME,  getSameGameSaga);
}
