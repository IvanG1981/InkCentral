import Card from 'react-bootstrap/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getArtist, searchInputBar } from '../store/artistReducer'
import { LinkContainer } from 'react-router-bootstrap'

export function Artist ({ id, name, nickname, email, image}) {
  const dispatch = useDispatch();
  const { login } = useSelector(
    ({ loginReducer: { login }}) => {
      return { login }
    })

  const { register } = useSelector(
    ({ registerReducer: { register }}) => {
      return { register }
    })

  const { searchValue } = useSelector(
    ({ artistReducer: { searchValue }}) => {
        return { searchValue }
    })

  const token = sessionStorage.getItem('token');

  function handleClick(){
    if(login || register ){
      dispatch(getArtist(id))  
      dispatch(searchInputBar(''))
    }
  }

  return (
    <LinkContainer 
      to={!token ? '/login': `/artists/${id}`} 
      style={{ borderRadius: "25px" }}
    >
      <Card  
        bg="dark" 
        text="light" 
        className='artistCards'
        onClick={handleClick}
      >
        <Card.Img 
          variant="bottom" 
          src={image[0]} 
          className="cardImage"
          style={
            { borderRadius: "25px", 
              borderBottomLeftRadius: "0px", 
              borderBottomRightRadius:"0px" 
            }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle 
            className="mb-2 text-muted"
          >
            {nickname}
          </Card.Subtitle>
          <Card.Text>{email}</Card.Text>
        </Card.Body>
      </Card> 
    </LinkContainer>
  )
}