import  { 
  COMMENT_LOADING,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
} from './actions/comment'

const initialState = {
  loading: false,
  error: null,
  message: null
}

function commentReducer( state = initialState, action ) {
  switch(action.type) {
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default commentReducer;