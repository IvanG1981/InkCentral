import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export function SocialMediaInput( 
{ 
  instagram, 
  facebook, 
  twitter, 
  whatsapp, 
  handleChange 
})
{
  return(
    <Card className="p-6 cardTitle">
      <div className="card-body">
        <Card.Body>
          <Card.Text >
            <h2>My Social Networks</h2>
          </Card.Text>
        </Card.Body>
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
      </div>
    </Card>
  )
}
