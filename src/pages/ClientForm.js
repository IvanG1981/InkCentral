import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getLoggedClient,
  updateClient,
  changeInput,
  cleanIsUpdate,
  cleanuperror
} from '../store/clientReducer';
import swal from 'sweetalert';


export function ClientForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { client, isUpdate, error_client } = useSelector(
    ({ clientReducer: { client, isUpdate, error_client } }) => {
      return { client, isUpdate, error_client }
    }
  )

  const handleChange = e => {
    dispatch(changeInput(e.target, client))
  }

  const handleUpdate = async e =>{
    e.preventDefault()
    const { name } = client

    dispatch(updateClient(name))
  }

  useEffect(() => {
    if(isUpdate) {
      swal("Your data has been updated",`${client.name}`,"success")
      dispatch(cleanIsUpdate())
      history.push('/')
    }
    else {
      dispatch(getLoggedClient())
    }
  }, [isUpdate, dispatch, history]);

  useEffect(() => {
    if(error_client) {
      swal("Sorry!!",
           `${error_client.response.statusText} Please Login again`,
           "error"
          )
      dispatch( cleanuperror() )
      history.push('/login')
    }
  }, [error_client])

  const { name, email } = client
  return(
    <div >
      <div className="main">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form  className="updateForm" onSubmit={handleUpdate} >
                <h2>Update Form</h2>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                    value={name}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={email}
                    disabled
                  />
                </Form.Group>

                <Button variant="warning"
                        type="submit"
                        className="form-control"
                        style={{ marginTop: '5px' }}
                        >
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
