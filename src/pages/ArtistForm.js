import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getLoggedArtist,
  getArtist,
  updateArtist,
  changeInput,
  changeImageInput,
  cleanIsUpdate,
  cleanuperror
} from '../store/artistReducer';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import { Loader } from '../components/Loader';


export function ArtistForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loggedArtist, isUpdate, error_artist, isUpdating } = useSelector(
    ({ artistReducer: { loggedArtist, isUpdate, error_artist, isUpdating } }) => {
      return { loggedArtist, isUpdate, error_artist, isUpdating }
    }
  )
  const handleImageChange = e => {
    dispatch(changeImageInput( e.target.files, loggedArtist ))
  }
  const handleChange = e => {
    dispatch(changeInput(e.target, loggedArtist))
  }
  const handleUpdate = async e =>{
    e.preventDefault()
    
    const { name, nickname, phone, location, instagram, 
            facebook, twitter, whatsapp, image } = loggedArtist
    
    const data = new FormData()
    data.append('name', name);
    data.append('nickname', nickname);
    data.append('phone', phone);
    data.append('location', location);
    data.append('instagram', instagram);
    data.append('facebook', facebook);
    data.append('twitter', twitter);
    data.append('whatsapp', whatsapp);
    data.append('image', image);
    dispatch(updateArtist( data ))
  }

  useEffect(() => {
      if(isUpdate){
        swal({
          title: "Your data has been updated",
          text:`${loggedArtist.name}`,
          icon:"success",
          buttons: true
        })
        .then(()=>{
          dispatch(cleanIsUpdate())
          dispatch(getArtist(loggedArtist._id))
          history.push(`/artists/${loggedArtist._id}`)
        })
      }
      else {
        dispatch(getLoggedArtist())
      }
  }, [isUpdate, dispatch, history] );

  useEffect(() => {
    if(error_artist){
      const statusError = error_artist.response.statusText
      swal("Sorry!!",`${statusError} Please Login again`, "error")
      dispatch( cleanuperror() )
      history.push('/login')
    }
  }, [error_artist])

  const { name, email, nickname, phone, instagram, 
          facebook, twitter, whatsapp, location } = loggedArtist

  if (isUpdating) return (
    <Container>
      <h1 className="main">Updating your profile information...</h1>
      <Loader />
    </Container>
  )
  
  return(
    <div >
      <div className="main">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form  className="updateForm" onSubmit={handleUpdate} >
                <h2>Update Artist Form</h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
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
                    placeholder="email"
                    onChange={handleChange}
                    value={email}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nickname"
                    name="nickname"
                    onChange={handleChange}
                    value={nickname}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    onChange={handleChange}
                    value={phone}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    name="location"
                    onChange={handleChange}
                    value={location}
                  />
                </Form.Group>

                
              </Form>
            </Col>

            <Col md="4">
              <Form  
                className="updateForm" 
                onSubmit={handleUpdate} >
                <h2>Social Media</h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Instagram user"
                    name="instagram"
                    onChange={handleChange}
                    value={instagram}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Facebook user"
                    name="facebook"
                    onChange={handleChange}
                    value={facebook}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Twitter user"
                    name="twitter"
                    onChange={handleChange}
                    value={twitter}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Whatsapp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Whatsapp"
                    name="whatsapp"
                    onChange={handleChange}
                    value={whatsapp}
                  />
                </Form.Group>
              </Form>

              <Col md="12">
                <Form  
                   
                  onSubmit={handleUpdate} >
                    <div>
                      <Button 
                        variant="primary" 
                        className="form-control" 
                        style={{ marginTop: '5px' }} onClick={handleShow}>
                        Add Images
                      </Button>
                      <Modal 
                        show={show} 
                        onHide={handleClose} 
                        animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add Images</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Please choose your image to upload:
                          <br></br>
                          <label htmlFor="file">Image(s): </label>
                          <input 
                            type="file"
                            accept="image/*"
                            multiple
                            name="file"
                            id="file"
                            onChange={handleImageChange}
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button 
                            variant="secondary" 
                            onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <Button
                      variant="warning"
                      type="submit"
                      className="form-control"
                      style={{ marginTop: '5px' }}
                    >Update
                    </Button>
                </Form>
              </Col>

            </Col>

            

          </Row>
        </Container>
      </div>
    </div>
  )
}
