import {
  PAYMENT_LOADING,
  PAYMENT_CREATED,
  PAYMENT_FAILURE
} from './actions/payment'

const initialState = {
  paymentMessage: null,
  paymentLoading: false,
  paymentError: null
    
}

function paymentReducer( state = initialState, action ){
  switch(action.type) {
    case PAYMENT_LOADING:
      return {
        ...state,
        paymentLoading: true
      }
    case PAYMENT_CREATED:
      return {
        ...state,
        paymentLoading: false,
        paymentMessage: action.payload
      }
    case PAYMENT_FAILURE:
      return {
        ...state,
        paymentError: action.payload
      }
    default:
      return state
  }
}

export default paymentReducer;
