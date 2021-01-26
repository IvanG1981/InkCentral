import { inkCentralServer } from '../../utils/apiaxios'

export const COMMENT_LOADING = 'COMMENT_LOADING'
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
export const COMMENT_FAILURE = 'COMMENT_FAILURE'

export function postComment(artistId, note) {
  return async function(dispatch) {
    dispatch({ type: COMMENT_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'POST',
        url: `/comments/${artistId}`,
        data: { note },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: COMMENT_SUCCESS, payload: data.message })
    }
    catch (error) {
      dispatch({ type: COMMENT_FAILURE, payload: error })
    }
  }
}

export function deleteComment(id) {
  return async function(dispatch) {
    dispatch({ type: COMMENT_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'DELETE',
        url: `/comments/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: COMMENT_SUCCESS, payload: data.message })
    }
    catch (error) {
      dispatch({ type: COMMENT_FAILURE, payload: error })
    }
  }
}

export function updateComment(commentId, note) {
  return async function(dispatch) {
    dispatch({ type: COMMENT_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: `/comments/${commentId}`,
        data: { note },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: COMMENT_SUCCESS, payload: data.message })
    }
    catch (error) {
      dispatch({ type: COMMENT_FAILURE, payload: error })
    }
  }
}