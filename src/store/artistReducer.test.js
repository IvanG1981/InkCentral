import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import  {
  getArtists,
  ARTISTS_LOADING,
  ARTISTS_SUCCESS,
  ARTISTS_FAILURE,
  artistReducer,
  initialState
 
} from './artistReducer'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const mockArtists = [
  { 
    _id: 'asdkriwehrjksadhf', 
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
  })

  afterEach(()=>{
    moxios.uninstall()
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
    'should return initialState by Default if invalid action',
    ()=>{
      const state = artistReducer(undefined, { type:'INVALID' })
      expect(state).toMatchObject(initialState)
    })
})

