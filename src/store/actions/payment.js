import { inkCentralServer } from '../../utils/apiaxios'

export const PAYMENT_LOADING = "PAYMENT_LOADING"
export const PAYMENT_CREATED = "PAYMENT_CREATED"
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE'

export function createPayment(artistId, amount, service, invoiceNumber, schedule ){
  return async function(dispatch){
    dispatch({ type: PAYMENT_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'POST',
        url: `/payments/${artistId}`,
        data:  {
          amount,
          service,
          invoiceNumber,
          schedule
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data 
      dispatch({ type: PAYMENT_CREATED, payload: data.message })
    }
    catch (error) {
      dispatch({ type: PAYMENT_FAILURE, payload: error })
    }
  }
}
