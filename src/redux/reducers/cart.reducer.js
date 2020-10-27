import {
  GET_CART_DATA_SUCCESS,
  GET_HISTORY_SUCCESS,
  ADD_CART_SUCCESS,
  UPDATE_CART_SUCCESS,
  DELETE_CART_DATA_SUCCESS,
  DELETE_HISTORY_SUCCESS,
  PAYMENT_CART_SUCCESS
} from '../constants'
const initialState = {
  cartData: [],
  historyData: []
};
function cartDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_DATA_SUCCESS: {
      return {
        ...state,
        cartData: [
          ...action.payload,
        ]
      };
    } 

    case GET_HISTORY_SUCCESS: {
      return {
        ...state,
        historyData: [
          ...action.payload,
        ]
      };
    } 

    case ADD_CART_SUCCESS: {
      const { id, soluong } = action.payload;
      const newCartData = state.cartData;
      const taskIndex = state.cartData.findIndex((item) => item.id === id);
      const editedTask = {
        ...state.cartData[taskIndex],
        soluong
      };
      newCartData.splice(taskIndex, 1, editedTask);
      return {
        ...state,
        cartData: [
          ...newCartData,
        ]
      };
    }
    case PAYMENT_CART_SUCCESS: {
      return {
        ...state,
        cartData: [
          action.payload,
        ]
      };
    }
    case UPDATE_CART_SUCCESS: {
      const { id, soluong } = action.payload;
      const newCartData = state.cartData;
      const taskIndex = state.cartData.findIndex((item) => item.id === id);
      const editedTask = {
        ...state.cartData[taskIndex],
        soluong
      };
      newCartData.splice(taskIndex, 1, editedTask);
      return {
        ...state,
        cartData: [
          ...newCartData,
        ]
      };
    }
    
   
    case DELETE_CART_DATA_SUCCESS: {
      const { id } = action.payload;
      const newCartData = state.cartData;
      const taskIndex = state.cartData.findIndex((item) => item.id === id);
      newCartData.splice(taskIndex, 1);
      return {
        ...state,
        cartData: [
          ...newCartData
        ]
      };
    }

    case DELETE_HISTORY_SUCCESS: {
      const { id } = action.payload;
      const newHistoryData = state.historyData;
      const taskIndex = state.historyData.findIndex((item) => item.id === id);
      newHistoryData.splice(taskIndex, 1);
      return {
        ...state,
        historyData: [
          ...newHistoryData
        ]
      };
    }
    default: {
      return state;
    }
  }
}

export default cartDataReducer;
