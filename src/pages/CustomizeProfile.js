import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
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
import { Loader } from '../components/Loader';
import CardColumns from 'react-bootstrap/CardColumns';
import { NicknameInput } from '../components/NicknameInput';
import { ImageInput } from '../components/ImageInput';
import { QuoteInput } from '../components/QuoteInput';
import { SocialMediaInput } from '../components/SocialMediaInput';
import { ContactInformationInput } from '../components/ContactInformationInput';
import { Cover } from '../components/Cover';
import { EnableProfile } from '../components/EnableProfile';

export function CustomizeProfile() { 
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
  // const handleImageChange = e => {
  //   dispatch(changeImageInput(e.target.files, loggedArtist ))
  // }
  
  function handleImageChange(imageFiles){
    dispatch(changeImageInput(imageFiles, loggedArtist))
  }
  const handleChange = e => {
    dispatch(changeInput(e.target, loggedArtist ))
  }
  const handleUpdate = async e => {
    e.preventDefault()
    const { name, nickname, phone, location, instagram,
            facebook, twitter, whatsapp, image, quote } = loggedArtist
    const data = new FormData()
    data.append('name', name)
    data.append('nickname', nickname)
    data.append('phone', phone)
    data.append('location', location)
    data.append('instagram', instagram)
    data.append('facebook', facebook)
    data.append('twitter', twitter)
    data.append('whatsapp', whatsapp)
    data.append('quote', quote)  
    if(image instanceof FileList){
      for(let i=0; i < image.length; i++){
        data.append('image', image[i])
      } 
    }
    dispatch(updateArtist( data ))
}
  useEffect(() => {
    if(isUpdate){
      swal({
        title: "Your data has been updated",
        text:`${loggedArtist.name}`,
        icon:"success",
      })
      .then(()=>{
        dispatch(cleanIsUpdate())
        dispatch(getArtist(loggedArtist._id))
        history.push(`/artists/${loggedArtist._id}`)
      })
    }
    else {
      dispatch(cleanIsUpdate())
      dispatch(getLoggedArtist())
    }
}, [isUpdate, dispatch, history] );

  useEffect(() => {
    if(error_artist){
      const statusError = error_artist. response.statusText
      swal("Sorry!!!",`${statusError} Please Login again`, "error")
      dispatch(cleanuperror())
      history.push('/login')
    }
  },[error_artist])

  const { name, email, nickname, phone, instagram, enable,
          facebook, twitter, whatsapp, location, quote, image } = loggedArtist

  if(isUpdating) return (
    <Container>
      <h1 className="main">Updating your profile information...</h1>
      <Loader />
    </Container>
  )
  return (
    <div className="artistProfileContainer">
        <Form  onSubmit={handleUpdate}>
          <Cover />          
          <CardColumns>
            <ImageInput 
              image={image}
              show={show}
              handleShow={handleShow}
              handleClose={handleClose}
              handleImageChange={handleImageChange}
            />
            <QuoteInput 
              quote={quote}
              handleChange={handleChange}
            />   
            <NicknameInput 
            nickname={nickname}
            handleChange={handleChange}
            />  
            <SocialMediaInput 
              instagram={instagram}
              facebook={facebook}
              twitter={twitter}
              whatsapp={whatsapp}
              handleChange={handleChange}
            />
            <ContactInformationInput
              name={name}
              email={email}
              phone={phone}
              location={location}
              handleChange={handleChange}
            />
          </CardColumns>
          <Container className="updateButton" >
            <Button
              variant="warning"
              type="submit"
              style={{width: "300px"}}
            >Update
            </Button>
          </Container>
        </Form>
        <div className="p-3 d-flex justify-content-center">
          <EnableProfile 
            artist={enable}
          />
        </div>
    </div>
  )
}