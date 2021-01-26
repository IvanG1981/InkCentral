import { inkCentralServer } from '../utils/apiaxios'

const CLIENT_LOADING = 'CLIENT_LOADING'
const CLIENT_SUCCESS = 'CLIENT_SUCCESS'
const CLIENT_FAILURE = 'CLIENT_FAILURE'

const CLIENT_LOGGED_LOADING = 'CLIENT_LOGGED_LOADING'
const CLIENT_LOGGED_SUCCESS = 'CLIENT_LOGGED_SUCCESS'
const CLIENT_LOGGED_FAILED = 'CLIENT_LOGGED_FAILED'

const CLIENT_UPDATE_LOADING = 'CLIENT_UPDATE_LOADING'
const CLIENT_UPDATE_SUCCESS = 'CLIENT_UPDATE_SUCCESS'
const CLIENT_UPDATE_FAILED = 'CLIENT_UPDATE_FAILED'

const CHANGE_INPUT = 'CHANGE_INPUT'
const CLEAN_ERROR = 'CLEAN_ERROR'
const CLEAN_ISUPDATE = 'CLEAN_ISUPDATE'
const LOGOUT_CLIENT = 'LOGOUT_CLIENT'

export function getClient(clientId) {
  return async function (dispatch) {
    dispatch({ type: CLIENT_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: `/clients/profile/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data;
      dispatch({ type: CLIENT_SUCCESS, payload: data })
    }
    catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token')
      }
      dispatch({ type: CLIENT_FAILURE, payload: error })
    }
  }
}

export function getLoggedClient() {
  return async function (dispatch) {
    dispatch({ type: CLIENT_LOGGED_LOADING })
    try {
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'GET',
        url: '/clients/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = response.data
      dispatch({ type: CLIENT_LOGGED_SUCCESS, payload: data })
    }
    catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token')
      }
      dispatch({ type: CLIENT_LOGGED_FAILED, payload: error })
    }
  }
}

export function updateClient(name) {
  return async function (dispatch) {
    try {
      dispatch({ type: CLIENT_UPDATE_LOADING })
      const token = sessionStorage.getItem('token')
      const response = await inkCentralServer({
        method: 'PUT',
        url: '/clients/profile',
        data: { name },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message } = response.data
      dispatch({ type: CLIENT_UPDATE_SUCCESS, payload: message })
    }
    catch (error) {
      dispatch({ type: CLIENT_UPDATE_FAILED, payload: error })
    }
  }
}

export function changeInput(target, client) {
  return function (dispatch) {
    let data = Object.assign({}, client, { [target.name]: target.value })
    dispatch({
      type: CHANGE_INPUT,
      payload: data
    })
  }
}

export function cleanuperror() {
  return async function (dispatch) {
    dispatch({ type: CLEAN_ERROR })
  }
}

export function cleanIsUpdate() {
  return async function (dispatch) {
    dispatch({ type: CLEAN_ISUPDATE })
  }
}

export function logoutClient() {
  return async function (dispatch) {
    dispatch({ type: LOGOUT_CLIENT })
  }
}

const initialState = {
  client: {},
  loadingClient: false,
  error_client: null,
  isUpdate: false
}

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_LOADING:
      return {
        ...state,
        loadingClient: true
      }
    case CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload,
        loadingClient: false
      }
    case CLIENT_FAILURE:
      return {
        ...state,
        error_client: action.payload
      }
    case CLIENT_LOGGED_LOADING:
      return {
        ...state,
        loadingClient: true
      }
    case CLIENT_LOGGED_SUCCESS:
      return {
        ...state,
        client: action.payload,
        loadingClient: false
      }
    case CLIENT_LOGGED_FAILED:
      return {
        ...state,
        error_client: action.payload
      }
    case CLIENT_UPDATE_LOADING:
      return {
        ...state,
        loadingClient: true
      }
    case CLIENT_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdate: true
      }
    case CLIENT_UPDATE_FAILED:
      return {
        ...state,
        error_client: action.payload
      }
    case CHANGE_INPUT:
      return {
        ...state,
        client: action.payload
      }
    case CLEAN_ERROR:
      return {
        ...state,
        error_client: null
      }
    case CLEAN_ISUPDATE:
      return {
        ...state,
        isUpdate: false
      }
    case LOGOUT_CLIENT:
      return initialState
    default:
      return state
  }
}

export default clientReducer;
