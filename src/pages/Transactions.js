
import { useSelector } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Loader } from '../components/Loader';
import Container from 'react-bootstrap/Container';
import { TransactionsTable } from '../components/TransactionsTable';



export function Transactions() { 
  const { loggedArtist, loggedArtistloading } = useSelector(
    ({ artistReducer: { loggedArtist, loggedArtistloading }}) => {
      return { loggedArtist, loggedArtistloading }
    }
  )
  const { client, loadingClient } = useSelector(
    ({ clientReducer: { client, loadingClient }}) => {
      return { client, loadingClient }
    }
  )
  const { userType } = useSelector(
    ({ loginReducer: { userType } }) => {
      return { userType }
    }
  )
  
  const { payments } = (userType === 'artist' ? loggedArtist : client)
  
  
  if( loggedArtistloading || loadingClient ) return(
    <Container>
      <h1 className="main">...Loading data </h1>
      <Loader />
    </Container>
  )
  
  return (
    <div>
      <Jumbotron>
        <h1 style={{ textAlign: "center" }}>Transactions History </h1>
      </Jumbotron>
      <TransactionsTable 
        userType={ userType }
        payments={ payments } 
      />
    </div>
  )
}