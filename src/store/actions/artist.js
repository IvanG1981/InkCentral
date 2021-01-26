import { inkCentralServer } from '../../utils/apiaxios'

export const ARTIST_HIDELOAD = 'ARTIST_HIDELOAD'
export const ARTIST_HIDEISOK = 'ARTIST_HIDEISOK'
export const ARTIST_HIDEFAIL = 'ARTIST_HIDEFAIL'

export const ARTIST_SHOWLOAD = 'ARTIST_SHOWLOAD'
export const ARTIST_SHOWISOK = 'ARTIST_SHOWISOK'
export const ARTIST_SHOWFAIL = 'ARTIST_SHOWFAIL'

export function hideArtist(artistId) {
  return async function (dispatch) {
    dispatch({ type: ARTIST_HIDELOAD })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: `/artists/${artistId}`,
        data: { enable: false },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message } = response.data;
      dispatch({ type: ARTIST_HIDEISOK, payload: message })
    }
    catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
      }
      dispatch({ type: ARTIST_HIDEFAIL, payload: error })
    }
  }
}

export function enableArtist(artistId) {
  return async function (dispatch) {
    dispatch({ type: ARTIST_SHOWLOAD })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: `/artists/enable/${artistId}`,
        data: { enable: true },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message } = response.data;
      dispatch({ type: ARTIST_SHOWISOK, payload: message })
    }
    catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
      }
      dispatch({ type: ARTIST_SHOWFAIL, payload: error })
    }
  }
}