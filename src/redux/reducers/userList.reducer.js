import {
  GET_USER_SUCCESS,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGOUT_SUCCESS,
  GET_USER_INFO_SUCCESS,
  CREATE_USER_SUCCESS,
  COMPLETE_PAYMENT_SUCCESS,
  COMPLETE_CART_PAYMENT_SUCCESS,
  UPDATE_INFO_SUCCESS

} from '../constants'
const initialState = {
  userList: [],
  userInfo: []
};
function userListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userList: [
          ...action.payload,
        ]
      };
    } 
    case GET_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        userList: [
          ...action.payload,
        ]
      };
    } 
    case GET_USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        userList: [
          ...action.payload,
        ]
      };
    } 
    
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: [
          ...action.payload,
        ]
      };
    } 
  
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        userList: [
          ...state.userList,
          action.payload,
        ]
      };
    }
    case UPDATE_INFO_SUCCESS: {
      return {
        ...state,
        userList: [
          action.payload,
        ]
      };
    }
    
    case COMPLETE_PAYMENT_SUCCESS: {
      return {
        ...state,
        userList: [
          action.payload,
        ]
      };
    }

    case COMPLETE_CART_PAYMENT_SUCCESS: {
      return {
        ...state,
        userList: [
          action.payload,
        ]
      };
    }

    


    
    
    default: {
      return state;
    }
  }
}

export default userListReducer;
