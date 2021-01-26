import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export function ContactInformationInput( 
{ 
  name, 
  email, 
  phone, 
  location, 
  handleChange 
})
{
  return(
    <Card className="p-6 cardTitle">
      <div className="card-body">
        <Card.Body>
          <Card.Text >
            <h2>My Contact Information</h2>
          </Card.Text>
        </Card.Body>
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
            type="text"
            name="email"
            placeholder="email"
            onChange={handleChange}
            value={email}
            disabled
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
      </div>
    </Card>
  )
}
