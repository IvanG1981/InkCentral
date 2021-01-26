import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { regArtist, regClient } from '../store/registerReducer'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

export function Register() {

  const history = useHistory()
  const dispatch = useDispatch()

  const { loading, register } = useSelector(
    ({ registerReducer: { loading, register } }) => {
      return { loading, register }
    })

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      history.push('/')
      swal("Welcome!!", `${email}`, "success")
    }
  }, [register])

  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Client"
  })

  const handleChange = (e) => {
    setRegForm({
      ...regForm,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, userType } = regForm
    if (password === confirmPassword) {
      if (userType === "Client") {
        dispatch(regClient(email, password))
      } else {
        dispatch(regArtist(email, password))
      }
    } else {
      swal("Sorry!!", "Password and Confirm Password fields must be equal", "error")
    }
  }

  const { email, password, confirmPassword } = regForm

  return (
    <div>
      <div className="main">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form onSubmit={handleRegister} className="registerForm">
                <h1>Sign Up</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckBox" className="userTypeRadio" >
                  <Form.Check
                    type="radio"
                    label="Artist"
                    name="userType"
                    value="Artist"
                    onChange={handleChange} />
                  <Form.Check
                    type="radio"
                    label="Client"
                    name="userType"
                    value="Client"
                    defaultChecked
                    onChange={handleChange} />
                </Form.Group>

                <Button variant="success" type="submit"
                  className="form-control"
                  disabled={loading}>
                  Sign Up
                </Button>
                <br></br>
                <br></br>
                <hr></hr>
                <LinkContainer to="/login" variant="info">
                  <Button>Login</Button>
                </LinkContainer>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
