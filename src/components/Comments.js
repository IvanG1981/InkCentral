import { Comment } from './Comment'
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge'

export function Comments({ notes }) {

  const { userType } = useSelector(
    ({ loginReducer: { userType } }) => {
      return { userType }
    })

  const { userTypeR } = useSelector(
    ({ registerReducer: { userTypeR } }) => {
      return { userTypeR }
    })

  let user = userType || userTypeR

  return (
    <>
      { !!notes && notes.length ?
        <h5 className="text-muted mb-4">
          <> Comments <Badge variant="secondary">{notes.length}</Badge> </> 
        </h5> : null
      }
      <section className="overflow-auto comments">
        { user === 'client' && !notes.length ? (
          <div className="alert alert-secondary" role="alert">
              <h4 className="alert-heading">No comments yet</h4>          
              <p className="mb-0">Be the first comment</p>
            </div>
          ) : null
        }
        
        {!!notes && 
          notes.length > 0 && 
          notes.map(({ _id, note, clientAuthor, updatedAt }) => {
            return (
              <Comment className="overflow-auto"
                key={_id}
                id={_id}
                note={note}
                from={clientAuthor}
                date={updatedAt}               
              />
            )
        })}
      </section>
    </>
  )
}