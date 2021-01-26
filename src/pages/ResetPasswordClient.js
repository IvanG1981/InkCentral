import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inkCentralServer } from '../utils/apiaxios'
import swal from 'sweetalert';
import { Loader } from '../components/Loader';



export function ResetPasswordClient(){
  const [ isLoading, setIsLoading ] = useState(true)
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ error, setError ] =useState(null)
  const [ isUpdated, setIsUpdated ] = useState(false)

  const { token } = useParams();
  useEffect( async () => {
    try{
      const response = await inkCentralServer({
        method: 'GET',
        url:`/clients/reset/${token}`
      })
      const { data } = response.data;
      setEmail(data)
      setIsLoading(false)
    }
    catch(error){
      setError(true)
    }
  }, []);

  const handleChange = e => {
    setPassword(e.target.value)
  }

  const updatePassword = async e => {
    e.preventDefault();
    try{
      const response = await inkCentralServer({
        method: 'PUT',
        url: 'clients/updatePassword',
        data: { 
          email,
          password
        }
      })
      setIsUpdated(true)
    }
    catch (error) {
      setError(true)
    }
  }
  if(error){
    return(
      <div className="main">
        <Form className="passwordResetForm">
          <h4>Problem resetting password. Please request another link </h4>
            <LinkContainer to='/forgot-password'>
              <Button variant="link">Forgot your password?</Button>
            </LinkContainer>
            <LinkContainer to='/'>
              <Button variant="link">Go Home</Button>
            </LinkContainer>
        </Form>
      </div>
    )
  }  
  if(isLoading) {
    return (
      <Container>
        <h1 className="main"> Loading user data...</h1>
        <Loader />
      </Container>
    )
  }
  return (
    <div className="main">
      {!isUpdated ? 
      <Container >
        <Row className="justify-content-md-center">
          <Col md="4">
            <Form className="passwordResetForm" onSubmit= { updatePassword } >
              <h1>Password Reset</h1>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className="form-control"
                variant="primary"
                type="submit"
                >Update Password
              </Button>
              <br></br>
              <br></br>
              <hr></hr>
              <LinkContainer to="/register" variant="dark">
                <Button>Register</Button>
              </LinkContainer>
            </Form>
          </Col>
        </Row>
      </Container> :
       <Container >
       <Row className="justify-content-md-center">
         <Col md="4">
           <Form className="passwordResetSuccess" >
             <p>Your password has been succesfully reset, please try login in again</p>
             <br></br>
             <br></br>
             <hr></hr>
             <LinkContainer to="/login" variant="primary">
               <Button >Login</Button>
             </LinkContainer>
           </Form>
         </Col>
       </Row>
     </Container> }
    </div>
  )
}


