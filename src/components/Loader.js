import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container';

export function Loader(){
  return(
    <Container className="loader">
      <Spinner animation="border" role="status" variant="secondary" size="sm"/>
      <Spinner animation="border" role="status" variant="secondary" size="sm"/>
      <Spinner animation="border" role="status" variant="secondary" size="sm"/>
      <Spinner animation="border" role="status" variant="secondary" size="sm"/>
      <Spinner animation="border" role="status" variant="secondary" size="sm"/>
      <span className="sr-only">Loading...</span>
    </Container>
  )
}