import { combineReducers } from "redux";

import userListReducer from "./userList.reducer";
import gameDataReducer from "./gameData.reducer";
import wishlistReducer from "./wishlist.reducer";
import cartDataReducer from "./cart.reducer";
import commentReducer from "./comment.reducer";
import searchReducer from "./search.reducer";
import homeReducer from "./home.reducer";
export default combineReducers({
  userListReducer,
  gameDataReducer,
  wishlistReducer,
  cartDataReducer,
  commentReducer,
  searchReducer,
  homeReducer,
});
