import { dateOfAction } from '../utils/dates'
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { deleteComment } from '../store/actions/comment'
import { getArtist } from '../store/artistReducer'
import swal from 'sweetalert';
import jwt_decode from "jwt-decode";
import { useState } from 'react'
import { UpdateCommentForm } from './UpdateCommentForm'

export function Comment({ id, note, from, date }) {

  const dateComment = dateOfAction(date)

  const dispatch = useDispatch()

  const { userType } = useSelector(
    ({ loginReducer: { userType } }) => {
      return { userType }
    })

  const { userTypeR } = useSelector(
    ({ registerReducer: { userTypeR } }) => {
      return { userTypeR }
    })

  let user = userType || userTypeR

  const { artistId } = useParams()

  const token = sessionStorage.getItem('token')
  const decoded = jwt_decode(token); 
  const own = from._id === decoded.id
  
  const delComment = (id) => {
    if(user === 'client' && own) {
      swal({
        title: "Are you sure to delete your comment?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async(willDelete) => {
        if(willDelete) {
          await dispatch(deleteComment(id))
          dispatch(getArtist(artistId))
        } else {
          swal("Your comments are safe here")
        }
      })
    }
  }

  const [update, setUpdate] = useState(false)

  const updateComment = () => {
    setUpdate(!update)
  }

  return (
    <>
      <div className="media mb-3">
        <div className="media-body p-2 shadow-sm rounded bg-light border">
          <small className="float-right text-muted">
            {format(date)} 
            {` (${dateComment[0]} ${dateComment[1]} ${dateComment[2]})`}
            { own ? 
              <>
                <div className="d-flex justify-content-end">
                  <small className="float-right text-muted">
                    <i className="fas fa-pencil-alt xs-e" 
                      onClick={ () => updateComment() }></i>
                  </small>                
                </div>
                <div className="d-flex justify-content-end">
                  <small className="float-right text-muted">
                    <i className="fas fa-trash-alt xs-d" 
                      onClick={ () => delComment(id) }></i>
                  </small>
                </div>
              </> : null
            }
          </small>
          { from.name ? (
            <h6 className="mt-0 mb-1 text-muted">{from.name}</h6> 
            ) : (
              <h6 className="mt-0 mb-1 text-muted">{from.email}</h6>
            )
          }
          {note}
        </div>
      </div>
      { update ? <UpdateCommentForm id={id}/> : null }
    </>
  )
}


