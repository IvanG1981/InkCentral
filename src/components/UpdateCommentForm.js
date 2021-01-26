import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateComment } from '../store/actions/comment';
import { getArtist } from '../store/artistReducer';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function UpdateCommentForm(id) {

  const [noteText, setNoteText] = useState({
    note: ''  
  })

  const { loading } = useSelector(
    ({ commentReducer: { loading }}) => {
      return { loading }
    }
  )

  const { artistId } = useParams()  
  
  const handleChange = e => {
    setNoteText({
      note: e.target.value
    })
  }

  const dispatch = useDispatch()

  const commentId = id.id

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!!note) {
      await dispatch(updateComment(commentId, note))
      dispatch(getArtist(artistId))
    }
    setNoteText({
      note: ''
    }) 
  }

  const { note } = noteText
  
  return(
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm="8">
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3" >
              <Form.Control
                placeholder="Update your comment to the artist (Max. Length: 96)"
                maxLength='96'
                name="note"
                value={note}
                onChange={handleChange}
              />
              { note ? (
                <InputGroup.Append>          
                  <Button 
                    variant="outline-secondary" 
                    type="submit"
                    disabled={loading}
                  >Update
                  </Button>
                </InputGroup.Append>
                ) : ( <></> )            
              }                
            </InputGroup>      
          </form>
        </Col>
      </Row>
    </Container>
  )
}