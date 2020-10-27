import {
  GET_WISHLIST_SUCCESS,
  UPDATE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_SUCCESS
} from '../constants'
const initialState = {
  wishlist: []
};
function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST_SUCCESS: {
      return {
        ...state,
        wishlist: [
          ...action.payload,
        ]
      };
    } 
   
    case UPDATE_WISHLIST_SUCCESS: {
      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          action.payload,
        ]
      };
    }
    
    case DELETE_WISHLIST_SUCCESS: {
      const { id } = action.payload;
      const newWishlistData = state.wishlist;
      const taskIndex = state.wishlist.findIndex((item) => item.id === id);
      newWishlistData.splice(taskIndex, 1);
      return {
        ...state,
        wishlist: [
          ...newWishlistData
        ]
      };
    }
    default: {
      return state;
    }
  }
}

export default wishlistReducer;
