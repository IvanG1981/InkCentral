import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import  {
  getArtists,
  ARTISTS_LOADING,
  ARTISTS_SUCCESS,
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
  'should request artists and dispatch an ARTISTS_SUCCESS action with a payload',
  async ()=>{
    const { dispatch, getActions } = mockStore()
    const mockSearchValue = 'ciudad'

    getArtists(mockSearchValue)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    console.log(req)
    console.log(moxios.requests)
    await req.respondWith({
      status: 200,
      response: mockArtists
    })
    // moxios.wait(()=> {
    //   const request = moxios.requests.mostRecent()
    //   request.respondWith(
    //   { 
    //     status: 200, 
    //     response: mockArtists 
    //   })
    // })
    console.log(req);
    const actions = getActions();
    console.log(actions)
    expect(actions[0].type).toBe(ARTISTS_LOADING)
    expect(actions[1].type).toBe(ARTISTS_SUCCESS)
    //   .then(()=>{
    //     let actions = getActions()
    //     console.log(actions)
    //     expect(actions[0].type).toBe(ARTISTS_LOADING)
    //     expect(actions[1].type).toBe(ARTISTS_SUCCESS)
    //     expect(actions[1].payload).toMatchObject(mockTasks)
    //     console.log(actions);
    //   })
      
    // })

    // const actions = getActions()
    // console.log(actions);
    // expect(actions[0].type).toBe(ARTISTS_LOADING)
  })

  it(
    'should return initialState by Default if invalid action',
    ()=>{
      const state = artistReducer(undefined, { type:'INVALID' })
      expect(state).toMatchObject(initialState)
    })
})

