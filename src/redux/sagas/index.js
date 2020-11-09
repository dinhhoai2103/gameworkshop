import { fork } from "redux-saga/effects";

import userListSaga from "./userList.saga";
import gameDataSaga from "./gameData.saga";
import wishlistSaga from "./wishlist.saga";
import cartDataSaga from "./cart.saga";
import commentSaga from "./comment.saga";
import searchSaga from "./search.saga";
import homeData from "./home.saga";

export default function* mySaga() {
  yield fork(userListSaga);
  yield fork(gameDataSaga);
  yield fork(wishlistSaga);
  yield fork(cartDataSaga);
  yield fork(commentSaga);
  yield fork(searchSaga);
  yield fork(homeData);
}
