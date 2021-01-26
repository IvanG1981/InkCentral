import { hideArtist, enableArtist } from '../store/actions/artist'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { cleanLogin } from '../store/loginReducer'
import { resetUserType } from '../store/registerReducer'
import { logoutArtist } from '../store/artistReducer'
import { logoutClient } from '../store/clientReducer'
import swal from 'sweetalert'
import jwt_decode from "jwt-decode"

export function EnableProfile({ artist }) {

  const dispatch = useDispatch()
  const history = useHistory();

  const handleHide = () => {

    const token = sessionStorage.getItem('token')
    const decoded = jwt_decode(token);

    swal({
      title: "Are you sure to hide your profile?",
      text: "You can still login and set your profile visible",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(hideArtist(decoded.id))
          sessionStorage.clear();
          dispatch(cleanLogin())
          dispatch(resetUserType())
          dispatch(logoutArtist())
          dispatch(logoutClient())
          history.push('/login')
        } else {
          swal("Your profile are safe here")
        }
      })
  }

  const handleShow = () => {

    const token = sessionStorage.getItem('token')
    const decoded = jwt_decode(token);

    swal({
      title: "Are you sure to show your profile?",
      text: "You will be redirected to login",
      icon: "info",
      buttons: true,
    })
      .then((willShow) => {
        if (willShow) {
          dispatch(enableArtist(decoded.id))
          sessionStorage.clear();
          dispatch(cleanLogin())
          dispatch(resetUserType())
          dispatch(logoutArtist())
          dispatch(logoutClient())
          history.push('/login')
        } else {
          swal("We hope see you soon")
        }
      })
  }

  return (
    <>
      {
        artist ?
          <>
            <button
              className="btn btn-danger col-sm-4"
              type="button"
              onClick={handleHide}
            > Hide my profile and Logout
          </button>
          </> :
          <>
            <button
              className="btn btn-success col-sm-4"
              type="button"
              onClick={handleShow}
            > Show my profile and Logout
          </button>
          </>
      }
    </>
  )
}