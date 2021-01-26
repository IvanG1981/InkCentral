import '../App.css';
import { useEffect } from 'react';
import { Artists } from '../components/Artists'
import { Loader } from '../components/Loader'
import { getArtists } from '../store/artistReducer'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container';


function Home() {

  const dispatch = useDispatch()
  const { artists, loading, error, searchValue } = useSelector(
    ({ artistReducer: { artists, loading, error, searchValue }}) => {
      return { artists, loading, error, searchValue }
    })

  useEffect(() => {
    dispatch(getArtists(searchValue))
  }, [searchValue]);

  if (loading) return (
    <Container>
      <h1 className="main">Artists Data is still loading...</h1>
      <Loader/>
    </Container>)
  if (error) return <h1 className="main">Something went wrong with Artists Data</h1>
  
  if (artists.length === 0) return <h1 className="main">No Artists Available</h1>

  return (
    <div className="main">
      <Artists
        artists={ artists }
      />
    </div>
  );
}

export default Home;
