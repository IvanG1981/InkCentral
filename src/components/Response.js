import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logClientAfterPayment } from '../store/loginReducer';
import { createPayment } from '../store/actions/payment';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { Loader } from './Loader';
import moment from 'moment'

export function Response() {
  const location = useLocation();
  const dispatch = useDispatch();
  const refPayco = new URLSearchParams(location.search).get("ref_payco");

  const [payLoading, setPayLoading] = useState(true)
  const [payResponse, setPayResponse] = useState( { payResponse: {} })
  const [payError, setPayError] = useState(null)
  
  useEffect( async () => {
    dispatch(logClientAfterPayment())
    try{
      const response = await axios({
        method: 'GET',
        url: `https://secure.epayco.co/validation/v1/reference/${refPayco}`
      })
      const { data } = response.data
      setPayResponse( {
        ...data
      } )
      setPayLoading(false)
    }
    catch(error){
      setPayError(error)
    }
  }, []);

  const artistName = payResponse['x_extra1'];
  const clientName = payResponse['x_extra2'];
  const artistId = payResponse['x_extra3'];
  const schedule = payResponse['x_extra4'];
  const service = payResponse['x_description'];
  const amount = payResponse['x_amount'];
  const invoiceNumber = payResponse['x_ref_payco'];

  const when = moment(schedule).format('ddd, MMM D, yyyy h:mma')

  useEffect(()=>{
      if(!payLoading){
        dispatch(createPayment( artistId, amount, service, invoiceNumber, schedule )) 
      } 
  }, [payLoading])

  if(payLoading) return (
    <Container>
      <h1 className="main">...Just a few seconds more </h1>
      <Loader/>
    </Container>)
  if(payError) return <h1 className='main'>Oops something went wrong!</h1>
  return (
    <div>
      <Jumbotron>
        <h1>Successful Transaction!!</h1>
        <ListGroup variant="flush">
          <ListGroup.Item>{clientName}, you have purchased a: { service } </ListGroup.Item>
          <ListGroup.Item>For the amount of: ${ amount } COP </ListGroup.Item>
          <ListGroup.Item>To be completed by: { artistName } </ListGroup.Item>
          <ListGroup.Item>On: { when } </ListGroup.Item>
          <ListGroup.Item>Your transaction invoice number is: { invoiceNumber } </ListGroup.Item>
        </ListGroup>
    </Jumbotron>
  </div>
  )
}


