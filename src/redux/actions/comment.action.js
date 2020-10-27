
import { 
  GET_COMMENT,
  CREATE_COMMENT
} from '../constants'


export function getComment(params) {
  return {
    type: GET_COMMENT,
    payload: params,
  }
}
export function createComment(params) {
  return {
    type: CREATE_COMMENT,
    payload: params,
  }
}


