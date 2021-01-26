
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getLoggedClient } from '../store/clientReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { v4 as uuid_v4 } from "uuid";


const handler = window.ePayco.checkout.configure({
  key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
  test: true,
});

export function Payment({ artist, service, amount, schedule }) {
  const invoice_number = uuid_v4();
  const dispatch = useDispatch();
  const { client } = useSelector(
    ({ clientReducer: { client } }) => {
      return { client }
    }
  )
  const { userType } = useSelector(
    ({ loginReducer: { userType } }) => {
      return { userType }
    }
  )
  
  useEffect(() => {
    if( userType === "client"){
      dispatch(getLoggedClient())
    } 
  },[])

  function handleClick() {

    handler.open({
      external: 'false',
      autoclick: false,

      amount: amount,
      name: 'Tattoo',
      description: service,
      currency: 'cop',

      country: 'CO',
      lang: 'en',
      tax: '0',
      tax_base: '0',

      invoice: invoice_number,
      extra1: artist.name,
      extra2: client.name || client.email,
      extra3: artist._id,
      extra4: schedule,

      response: `${process.env.REACT_APP_BASE_URL}/response`,

      name_billing: client.name,
      address_billing: `${client.name}`,
      type_doc_billing: 'cc',
      number_doc_billing: '5452454542',
      mobilephone_billing: '3164587954'
    })
  }
  
  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm="4">
          <button
            className="form-control btn btn-success"
            type="button"
            onClick={handleClick}
          >
            Pay
          </button>
        </Col>
      </Row>
    </Container>
  )
}