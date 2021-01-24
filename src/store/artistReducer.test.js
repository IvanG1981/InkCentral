import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import  {
  getArtists,
  getArtist,
  getLoggedArtist,
  updateArtist,
  ARTISTS_LOADING,
  ARTIST_LOADING,
  ARTISTS_SUCCESS,
  ARTIST_SUCCESS,
  ARTISTS_FAILURE,
  ARTIST_FAILURE,
  ARTIST_LOGGED_LOADING,
  ARTIST_LOGGED_SUCCESS,
  ARTIST_LOGGED_FAILED,
  ARTIST_UPDATE_LOADING,
  ARTIST_UPDATE_SUCCESS,
  ARTIST_UPDATE_FAILED,
  CHANGE_INPUT,
  CHANGE_IMAGE_INPUT,
  CLEAN_ERROR,
  CLEAN_ISUPDATE,
  LOGOUT_ARTIST,
  SEARCH_VALUE,
  ARTIST_DELLOAD,
  ARTIST_DELISOK,
  ARTIST_DELFAIL,
  artistReducer,
  initialState,
  changeInput,
  changeImageInput,
  cleanuperror, 
  cleanIsUpdate,
  logoutArtist,
  searchInputBar
 
} from './artistReducer'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const mockLoggedArtist = {
  _id: 'asdkriwehrjksxxxx', 
  name: 'Artist 1', 
  nickname: 'nickname1', 
  location: 'bogota', 
  phone: '343414314', 
  instagram:'sadfa', 
  facebook:'sfasd',
  whatsapp:'dagsd',
  email:'eadfe',
  quote:'evweFG',
  twitter:'dfgdsFD',
  image: ['afds','dagsg','dagas']
}
const mockArtists = [
  { 
    _id: 'asdkriwehrjksxxxx', 
    name: 'Artist 1', 
    nickname: 'nickname1', 
    location: 'bogota', 
    phone: '343414314', 
    instagram:'sadfa', 
    facebook:'sfasd',
    whatsapp:'dagsd',
    email:'eadfe',
    quote:'evweFG',
    twitter:'dfgdsFD',
    image: ['afds','dagsg','dagas']
   },
   { 
    _id: 'asdkriwehrjksadhf', 
    name: 'Artist 2', 
    nickname: 'nickname1', 
    location: 'city1', 
    phone: '343414314', 
    instagram:'sadfa', 
    facebook:'sfasd',
    whatsapp:'dagsd',
    email:'eadfe',
    quote:'evweFG',
    twitter:'dfgdsFD',
    image: ['afds','dagsg','dagas']
  },
  { 
    _id: 'asdkriwehrjksadhf', 
    name: 'Artist 3', 
    nickname: 'nickname1', 
    location: 'city1', 
    phone: '343414314', 
    instagram:'sadfa', 
    facebook:'sfasd',
    whatsapp:'dagsd',
    email:'eadfe',
    quote:'evweFG',
    twitter:'dfgdsFD',
    image: ['afds','dagsg','dagas']
 },
]


describe('artistReducer', ()=> {
  beforeEach(()=> {
    moxios.install()
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
    jest.spyOn(Storage.prototype, 'removeItem')
  })

  afterEach(()=>{
    moxios.uninstall()
    sessionStorage.setItem.mockRestore()
    sessionStorage.getItem.mockRestore()
    sessionStorage.removeItem.mockRestore()
  })

  it(
  'should request artists and dispatch an ARTISTS_LOADING and ARTISTS_SUCCESS action with a payload',
  async ()=>{
    const { dispatch, getActions } = mockStore()
    const mockSearchValue = 'Bogota'

    const mockResponse = {
      data: mockArtists[0]
    }

    getArtists(mockSearchValue)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: mockResponse
    })
    const actions = getActions();
    expect(actions[0].type).toBe(ARTISTS_LOADING)
    expect(actions[1].type).toBe(ARTISTS_SUCCESS)
    expect(actions[1].payload).toMatchObject(mockArtists[0])

  })
  it(
    'should request artists and dispatch an ARTISTS_LOADING and ARTISTS_FAILURE action with a payload error',
    async ()=>{
      const { dispatch, getActions } = mockStore()
      const mockError = {
        statusText: 'something went wrong'
      }
      getArtists()(dispatch)
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 400,
        response: mockError
      
      })
      const actions = getActions();
      expect(actions[0].type).toBe(ARTISTS_LOADING)
      expect(actions[1].type).toBe(ARTISTS_FAILURE)
      expect(actions[1].payload.response.data).toMatchObject(mockError)
  
    })
  it(
    'should request artist and dispatch an ARTIST_LOADING and ARTIST_SUCCESS action with a payload',
    async ()=>{
      const { dispatch, getActions } = mockStore()
      const mockArtistId = 'asdkriwehrjksxxxx'
  
      const mockResponse = {
        data: mockArtists[0]
      }
  
      getArtist(mockArtistId)(dispatch)
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 200,
        response: mockResponse
      })
      const actions = getActions();
      
      expect(actions[0].type).toBe(ARTIST_LOADING)
      expect(actions[1].type).toBe(ARTIST_SUCCESS)
      expect(actions[1].payload).toMatchObject(mockArtists[0])
  
    })
  it(
    'should request artist and dispatch an ARTIST_LOADING and ARTIST_FAILURE action with a payload ERROR',
    async ()=>{
      const { dispatch, getActions } = mockStore()
      const mockArtistId = 'asdkriwehrjksxxxx'
  
      const mockError = {
        statusText: 'something went wrong'
      }
  
      getArtist(mockArtistId)(dispatch)
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 401,
        response: mockError
      })
      const actions = getActions();
      expect(actions[0].type).toBe(ARTIST_LOADING)
      expect(actions[1].type).toBe(ARTIST_FAILURE)
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('token');
      expect(actions[1].payload.response.data).toMatchObject(mockError);
  
    })
  it(
    'should request artist and dispatch an ARTIST_LOGGED_LOADING and ARTIST_LOGGED_SUCCESS action with a payload',
    async ()=>{
      const { dispatch, getActions } = mockStore()
      getLoggedArtist()(dispatch)

      const mockResponse = {
        data: mockArtists[0]
      }
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 200,
        response: mockResponse
      })
      const actions = getActions();
      expect(actions[0].type).toBe(ARTIST_LOGGED_LOADING)
      expect(actions[1].type).toBe(ARTIST_LOGGED_SUCCESS)
      expect(actions[1].payload).toMatchObject(mockArtists[0]);

    })
  it(
    'should request artist and dispatch an ARTIST_LOGGED_LOADING and ARTIST_LOGGED_FAILED action with a payload ERROR',
    async ()=>{
      const { dispatch, getActions } = mockStore()
    
      const mockError = {
        statusText: 'something went wrong'
      }
      getLoggedArtist()(dispatch)
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 401,
        response: mockError
      })
      const actions = getActions();
      expect(actions[0].type).toBe(ARTIST_LOGGED_LOADING)
      expect(actions[1].type).toBe(ARTIST_LOGGED_FAILED)
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('token');
      expect(actions[1].payload.response.data).toMatchObject(mockError);
  
    })

  it(
    'should request artist and dispatch an ARTIST_UPDATE_LOADING and ARTIST_UPDATE_SUCCESS action with a payload MESSAGE',
    async ()=>{
      const { dispatch, getActions } = mockStore()
      const mockData = 
      {
        _id: 'asdkriwehrjksadhf', 
        name: 'Artist 4', 
        nickname: 'nickname4', 
        location: 'city1', 
        phone: '3434143144', 
        instagram:'sadfa', 
        facebook:'sfasd',
        whatsapp:'dagsd',
        email:'eadfe',
        quote:'evweFG',
        twitter:'dfgdsFD',
        image: ['afds','dagsg','dagas']

      }
      const mockResponse = 
      {
        message: 'Artist Updated'
      }
      
      updateArtist(mockData)(dispatch)
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 200,
        response: mockResponse
      })
      const actions = getActions();
      expect(actions[0].type).toBe(ARTIST_UPDATE_LOADING)
      expect(actions[1].type).toBe(ARTIST_UPDATE_SUCCESS)
      expect(actions[1].payload).toMatch(/Artist Updated/i);
  
    })
  it(
    'should request artist and dispatch an ARTIST_UPDATE_LOADING and ARTIST_UPDATE_FAILED action with a payload ERROR',
    async ()=>{
      const { dispatch, getActions } = mockStore()
      const mockData = 
      {
        _id: 'asdkriwehrjksadhf', 
        name: 'Artist 4', 
        nickname: 'nickname4', 
        location: 'city1', 
        phone: '3434143144', 
        instagram:'sadfa', 
        facebook:'sfasd',
        whatsapp:'dagsd',
        email:'eadfe',
        quote:'evweFG',
        twitter:'dfgdsFD',
        image: ['afds','dagsg','dagas']

      }
      const mockError = 
      {
        message: 'something went wrong'
      }
      
      updateArtist(mockData)(dispatch)
  
      await moxios.wait(jest.fn)
      const req = moxios.requests.mostRecent()
      await req.respondWith({
        status: 400,
        response: mockError
      })
      const actions = getActions();
      expect(actions[0].type).toBe(ARTIST_UPDATE_LOADING)
      expect(actions[1].type).toBe(ARTIST_UPDATE_FAILED)
      expect(actions[1].payload.response.data).toMatchObject(mockError);
  
    })


  it(
    'should  dispatch a CHANGE_INPUT action',
    ()=>{
      const { dispatch, getActions } = mockStore()
      const mockEntry = {
        name: 'nickname',
        value: 'HanSolo'
      } 
      const changedData = {
        _id: 'asdkriwehrjksxxxx', 
        name: 'Artist 1', 
        nickname: 'HanSolo', 
        location: 'bogota', 
        phone: '343414314', 
        instagram:'sadfa', 
        facebook:'sfasd',
        whatsapp:'dagsd',
        email:'eadfe',
        quote:'evweFG',
        twitter:'dfgdsFD',
        image: ['afds','dagsg','dagas']
      }
      changeInput(mockEntry, mockLoggedArtist)(dispatch)
      
      const actions = getActions();
      expect(actions[0].type).toBe(CHANGE_INPUT)
      expect(actions[0].payload).toMatchObject(changedData)

      
  
    })
  it(
    'should  dispatch a CHANGE_IMAGE_INPUT action',
    ()=>{
      const { dispatch, getActions } = mockStore()
      const mockEntryImage = ['x','y','z'] 
      const changedImageData = {
        _id: 'asdkriwehrjksxxxx', 
        name: 'Artist 1', 
        nickname: 'nickname1', 
        location: 'bogota', 
        phone: '343414314', 
        instagram:'sadfa', 
        facebook:'sfasd',
        whatsapp:'dagsd',
        email:'eadfe',
        quote:'evweFG',
        twitter:'dfgdsFD',
        image: ['x','y','z']
      }
      changeImageInput(mockEntryImage, mockLoggedArtist)(dispatch)
      const actions = getActions();
      expect(actions[0].type).toBe(CHANGE_IMAGE_INPUT)
      expect(actions[0].payload).toMatchObject(changedImageData)
    })

  it(
    'should  dispatch a CLEAN_ERROR action',
    ()=>{
      const { dispatch, getActions } = mockStore()
      cleanuperror()(dispatch)
      const actions = getActions();
      expect(actions[0].type).toBe(CLEAN_ERROR) 
    })

  it(
    'should  dispatch a CLEAN_ISUPDATE action',
    ()=>{
      const { dispatch, getActions } = mockStore()
      cleanIsUpdate()(dispatch)
      const actions = getActions();
      expect(actions[0].type).toBe(CLEAN_ISUPDATE) 
    })
  it(
    'should  dispatch a LOGOUT_ARTIST action',
    ()=>{
      const { dispatch, getActions } = mockStore()
      logoutArtist()(dispatch)
      const actions = getActions();
      expect(actions[0].type).toBe(LOGOUT_ARTIST) 
    })
  it(
    'should  dispatch a SEARCH_VALUE action with a payload value',
    ()=>{
      const { dispatch, getActions } = mockStore()
      const mockValue = 'Bogota'
      searchInputBar(mockValue)(dispatch)
      const actions = getActions();
      expect(actions[0].type).toBe(SEARCH_VALUE) 
      expect(actions[0].payload).toBe(mockValue) 

    })


  it(
    'should return initialState by Default if invalid action',
    ()=>{
      const state = artistReducer(undefined, { type:'INVALID' })
      expect(state).toMatchObject(initialState)
    })
  it(
    'should change loading when ARTISTS_LOADING action is dispatched',
    ()=>{
      const state = artistReducer(undefined, { type:'ARTISTS_LOADING' })
      expect(state).toMatchObject({...initialState, loading: true })
    })

  it(
    'should change loading when ARTIST_LOADING action is dispatched',
    ()=>{
      const state = artistReducer(undefined, { type:'ARTIST_LOADING' })
      expect(state).toMatchObject({...initialState, loading: true })
    })
  it(
    'should change loading when ARTISTS_SUCCESS action is dispatched, and assign payload to artists',
    ()=>{
      const state = artistReducer(undefined, { type:'ARTISTS_SUCCESS', payload: mockArtists })
      expect(state).toMatchObject({...initialState, loading: false, artists: mockArtists  })
    })
  it(
    'should change loading when ARTIST_SUCCESS action is dispatched, and assign payload to artist',
    ()=>{
      const state = artistReducer(undefined, { type:'ARTIST_SUCCESS', payload: mockArtists[0] })
      expect(state).toMatchObject({...initialState, loading: false, artist: mockArtists[0]  })
    })
  it(
    'should change error_artists when ARTISTS_FAILURE action is dispatched, and assign payload to error_artists',
    ()=>{
      const mockError = {
        statusText: 'something went wrong'
      }
      const state = artistReducer(undefined, { type:'ARTISTS_FAILURE', payload: mockError })
      expect(state).toMatchObject({...initialState, loading: false, error_artists: mockError  })
    })
  it(
    'should change error_artists when ARTIST_FAILURE action is dispatched, and assign payload to error_artist',
    ()=>{
      const mockError = {
        statusText: 'something went wrong'
      }
      const state = artistReducer(undefined, { type:'ARTIST_FAILURE', payload: mockError })
      expect(state).toMatchObject({...initialState, loading: false, error_artist: mockError  })
    })
  it(
    'should change loggedArtistLoading when ARTIST_LOGGED_LOADING action is dispatched',
    ()=>{
      const state = artistReducer(undefined, { type:'ARTIST_LOGGED_LOADING' })
      expect(state).toMatchObject({...initialState, loggedArtistLoading: true })
    })
  it(
    'should change loggedArtistLoading when ARTIST_LOGGED_SUCCESS action is dispatched, and assign payload to loggedArtist',
    ()=>{
      const mockResponse = {
        data: mockArtists[0]
      }
      const state = artistReducer(undefined, { type:'ARTIST_LOGGED_SUCCESS', payload: mockResponse  })
      expect(state).toMatchObject({...initialState, loggedArtistLoading: false, loggedArtist: mockResponse })
    })
  it(
    'should change error_artist when ARTIST_LOGGED_FAILED action is dispatched, and assign payload to error_artist',
    ()=>{
      const mockError = {
        statusText: 'something went wrong'
      }
      const state = artistReducer(undefined, { type:'ARTIST_LOGGED_FAILED', payload: mockError  })
      expect(state).toMatchObject({...initialState, error_artist: mockError })
    })
  it(
    'should change loading and isUpdating when ARTIST_UPDATE_LOADING action is dispatched',
    ()=>{    
      const state = artistReducer(undefined, { type:'ARTIST_UPDATE_LOADING' })
      expect(state).toMatchObject({...initialState, loading: true, isUpdating: true })
    })
  it(
    'should change loading, isUpdating, isUpdate when ARTIST_UPDATE_SUCCESS action is dispatched',
    ()=>{    
      const state = artistReducer(undefined, { type:'ARTIST_UPDATE_SUCCESS' })
      expect(state).toMatchObject({...initialState, loading: false, isUpdating: false, isUpdate: true })
    })
  it(
    'should change error_artist when ARTIST_UPDATE_FAILED action is dispatched',
    ()=>{   
      const mockError = {
        statusText: 'something went wrong'
      } 
      const state = artistReducer(undefined, { type:'ARTIST_UPDATE_FAILED', payload: mockError })
      expect(state).toMatchObject({...initialState, error_artist: mockError })
    })
  it(
    'should assign payload to loggedArtist when CHANGE_INPUT action is dispatched',
    ()=>{   
      const state = artistReducer(undefined, { type:'CHANGE_INPUT', payload: mockArtists[0] })
      expect(state).toMatchObject({...initialState, loggedArtist: mockArtists[0] })
    })
  it(
    'should assign payload to loggedArtist when CHANGE_IMAGE_INPUT action is dispatched',
    ()=>{   
      const state = artistReducer(undefined, { type:'CHANGE_IMAGE_INPUT', payload: mockArtists[0] })
      expect(state).toMatchObject({...initialState, loggedArtist: mockArtists[0] })
    })
  it(
    'should change error_artist and error_artists to null when CLEAN_ERROR action is dispatched',
    ()=>{   
      const state = artistReducer(undefined, { type:'CLEAN_ERROR' })
      expect(state).toMatchObject({...initialState, error_artist: null, error_artists: null })
    })
  it(
    'should change isUpdate to false when CLEAN_ISUPDATE action is dispatched',
    ()=>{   
      const state = artistReducer(undefined, { type:'CLEAN_ISUPDATE' })
      expect(state).toMatchObject({...initialState, isUpdate: false })
    })
  it(
    'should reset initialState  when LOGOUT_ARTIST action is dispatched',
    ()=>{   
      const state = artistReducer(undefined, { type:'LOGOUT_ARTIST' })
      expect(state).toMatchObject({...initialState })
    })
    it(
      'should change loading to true  when ARTIST_DELLOAD action is dispatched',
      ()=>{   
        const state = artistReducer(undefined, { type:'ARTIST_DELLOAD' })
        expect(state).toMatchObject({...initialState, loading: true })
      })
    it(
      'should change loading to true  when ARTIST_DELISOK action is dispatched',
      ()=>{ 
        const mockResponse = { message: 'Artist Deleted' }  
        const state = artistReducer(undefined, { type:'ARTIST_DELISOK', payload: mockResponse })
        expect(state).toMatchObject({...initialState, loading: false, delMessage: mockResponse  })
      })
    it(
      'should change error_artist to a payload when ARTIST_DELFAIL action is dispatched',
      ()=>{ 
        const mockError = { statusText: 'something went wrong' }  
        const state = artistReducer(undefined, { type:'ARTIST_DELFAIL', payload: mockError })
        expect(state).toMatchObject({...initialState, error_artist: mockError  })
      })
    it(
      'should assing searchValue a payload when SEARCH_VALUE action is dispatched',
      ()=>{ 
        const mockValue = 'Bogota'
        const state = artistReducer(undefined, { type:'SEARCH_VALUE', payload: mockValue })
        expect(state).toMatchObject({...initialState, searchValue: mockValue  })
      })
})

