import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export function NicknameInput( { nickname, handleChange }){
  return(
    <Card className="p-3">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Your nickname: </Form.Label>
        <Form.Control
          type="text"
          placeholder="nickname"
          name="nickname"
          onChange={handleChange}
          value={nickname}
        />
      </Form.Group>
    </Card>
  )
}