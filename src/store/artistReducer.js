import { inkCentralServer } from '../utils/apiaxios'
import {
  ARTIST_HIDELOAD, ARTIST_HIDEISOK, ARTIST_HIDEFAIL,
  ARTIST_SHOWLOAD, ARTIST_SHOWISOK, ARTIST_SHOWFAIL,
} from './actions/artist'

const ARTISTS_LOADING = 'ARTISTS_LOADING'
const ARTISTS_SUCCESS = 'ARTISTS_SUCCESS'
const ARTISTS_FAILURE = 'ARTISTS_FAILURE'

const ARTIST_LOADING = 'ARTIST_LOADING'
const ARTIST_SUCCESS = 'ARTIST_SUCCESS'
const ARTIST_FAILURE = 'ARTIST_FAILURE'

const ARTIST_LOGGED_LOADING = 'ARTIST_LOGGED_LOADING'
const ARTIST_LOGGED_SUCCESS = 'ARTIST_LOGGED_SUCCESS'
const ARTIST_LOGGED_FAILED = 'ARTIST_LOGGED_FAILED'

const ARTIST_UPDATE_LOADING = 'ARTIST_UPDATE_LOADING'
const ARTIST_UPDATE_SUCCESS = 'ARTIST_UPDATE_SUCCESS'
const ARTIST_UPDATE_FAILED = 'ARTIST_UPDATE_FAILED'

const CHANGE_INPUT = 'CHANGE_INPUT'
const CHANGE_IMAGE_INPUT = 'CHANGE_IMAGE_INPUT'

const CLEAN_ERROR = 'CLEAN_ERROR'
const CLEAN_ISUPDATE = 'CLEAN_ISUPDATE'
const LOGOUT_ARTIST = 'LOGOUT_ARTIST'

const SEARCH_VALUE = 'SEARCH_VALUE'

export function getArtists(searchValue) {
  const path = searchValue !== '' ? `?inputSearch=${searchValue}` : ''

  return async function(dispatch) {
    dispatch({ type: ARTISTS_LOADING })
    try {
      const response = await inkCentralServer({
        method: 'GET',
        url: `/artists${path}`
      })
      const { data } = response.data
      dispatch({ type: ARTISTS_SUCCESS, payload: data })
    }
    catch(error) {
      dispatch({ type: ARTISTS_FAILURE, payload: error })
    }
  }
}

export function getArtist(artistId){
  return async function(dispatch) {
    dispatch({ type: ARTIST_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: `/artists/profile/${artistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data;
      dispatch({ type: ARTIST_SUCCESS, payload: data })
    }
    catch(error){
      if(error.response.status === 401) {
        sessionStorage.removeItem('token');
      }
      dispatch({ type: ARTIST_FAILURE, payload: error })
    }
  }
}

export function getLoggedArtist(){
  return async function(dispatch){
    dispatch({ type: ARTIST_LOGGED_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: '/artists/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: ARTIST_LOGGED_SUCCESS, payload: data })
    }
    catch(error){
      if(error.response.status === 401) {
        sessionStorage.removeItem('token');
      }
      dispatch({ type: ARTIST_LOGGED_FAILED, payload: error })
    }
  }
}

export function updateArtist( data ){
  return async function(dispatch) {
    try {
      dispatch({ type: ARTIST_UPDATE_LOADING })
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: '/artists/profile',
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      const { message } = response.data
      dispatch({ type: ARTIST_UPDATE_SUCCESS, payload: message })
    }
    catch(error){
      dispatch({ type: ARTIST_UPDATE_FAILED, payload: error })
    }
  }
}

export function changeImageInput(target, loggedArtist){
  return function (dispatch){
    let data = Object.assign( {}, loggedArtist, { 'image': target } )
    dispatch({
      type: CHANGE_IMAGE_INPUT,
      payload: data
    })
  }
}

export function changeInput(target, loggedArtist){
  return function (dispatch){
    let data = Object.assign( {}, loggedArtist, { [target.name]: target.value })
    dispatch({
      type: CHANGE_INPUT,
      payload: data
    })
  }
}

export function cleanuperror(){
  return async function(dispatch) {
    dispatch({ type: CLEAN_ERROR  })
  }
}

export function cleanIsUpdate(){
  return async function(dispatch) {
    dispatch({ type: CLEAN_ISUPDATE })
  }
}

export function logoutArtist() {
  return async function(dispatch) {
    dispatch({ type: LOGOUT_ARTIST })
  }
}

export function searchInputBar(value) {
  return async function(dispatch) {
    dispatch({ type: SEARCH_VALUE, payload: value})
  }
}

const initialState = {
  artists: [],
  artist: {},
  loggedArtist:{},
  loading: false,
  loggedArtistLoading: false,
  error_artists: null,
  error_artist: null,
  isUpdate: false,
  isUpdating: false,
  delMessage: null,
  searchValue: ''
}

function artistReducer(state = initialState, action) {
  switch(action.type) {
    case ARTISTS_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTIST_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTISTS_SUCCESS:
      return {
        ...state,
        artists: action.payload,
        loading: false
      }
    case ARTIST_SUCCESS:
      return {
        ...state,
        artist: action.payload,
        loading: false
      }
    case ARTISTS_FAILURE:
      return {
        ...state,
        error_artists: action.payload
      }
    case ARTIST_FAILURE:
      return {
        ...state,
        error_artist: action.payload
      }
    case ARTIST_LOGGED_LOADING:
      return {
        ...state,
        loggedArtistLoading: true
      }
    case ARTIST_LOGGED_SUCCESS:
      return {
        ...state,
        loggedArtist: action.payload,
        loggedArtistLoading: false
      }
    case ARTIST_LOGGED_FAILED:
      return {
        ...state,
        error_artist: action.payload
      }
    case ARTIST_UPDATE_LOADING:
      return {
        ...state,
        loading: true,
        isUpdating: true
      }
    case ARTIST_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdate: true,
        loading: false,
        isUpdating: false
      }
    case ARTIST_UPDATE_FAILED:
      return {
        ...state,
        error_artist: action.payload
      }
    case CHANGE_INPUT:
      return {
        ...state,
        loggedArtist: action.payload
      }
    case CHANGE_IMAGE_INPUT:
      return {
        ...state,
        loggedArtist: action.payload
      }
    case CLEAN_ERROR:
      return {
        ...state,
        error_artist: null,
        error_artists: null
      }
    case CLEAN_ISUPDATE:
      return {
        ...state,
        isUpdate: false,
        isUpdating: false
      }
    case LOGOUT_ARTIST:
      return initialState
    case ARTIST_HIDELOAD:
      return {
        ...state,
        loading: true,
      }
    case ARTIST_HIDEISOK:
      return {
        ...state,
        delMessage: action.payload,
        loading: false
      }
    case ARTIST_HIDEFAIL:
      return {
        ...state,
        error_artist: action.payload
      }
    case ARTIST_SHOWLOAD:
      return {
        ...state,
        loading: true,
      }
    case ARTIST_SHOWISOK:
      return {
        ...state,
        delMessage: action.payload,
        loading: false
      }
    case ARTIST_SHOWFAIL:
      return {
        ...state,
        error_artist: action.payload
      }
    case SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload
      }
    default:
      return state
  }
}

export default artistReducer;
