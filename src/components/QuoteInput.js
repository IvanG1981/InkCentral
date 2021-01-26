import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export function QuoteInput( { quote, handleChange }){
  return(
    <Card className="p-3">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Share a quote with the world: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Share a quote with the world"
          name="quote"
          onChange={handleChange}
          value={quote}
        />
      </Form.Group>
    </Card>
  )
}

