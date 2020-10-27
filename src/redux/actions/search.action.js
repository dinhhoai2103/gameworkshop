
import { 
  GET_SEARCH_DATA
} from '../constants'


export function getSearchData(params) {
  return {
    type: GET_SEARCH_DATA,
    payload: params,
  }
}
