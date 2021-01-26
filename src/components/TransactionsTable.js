import Table from 'react-bootstrap/Table';
import { TransactionArtist, TransactionClient } from './Transaction.js';


export function TransactionsTable({ userType, payments }){
  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th> Invoice #</th>
          <th>Amount (COP)</th>
          <th>Service</th>
          <th>Schedule</th>
          <th>{ userType === 'artist' ? 'Client' : 'Artist' } </th>
          <th>Email</th>
          <th>Paid on</th>
        </tr>
      </thead>
      <tbody>
        { userType === 'artist' ? 
          !!payments && 
          payments.length > 0 && 
          payments.map(({_id, 
                         amount, 
                         service,
                         schedule,
                         consumer, 
                         invoiceNumber,
                         createdAt }) => {
           return(
             <TransactionArtist
               key={_id}
               id={_id}
               amount={amount}
               service={service}
               schedule={schedule}
               consumer={consumer}
               invoiceNumber={invoiceNumber}
               date={createdAt}               
             />
           )
          })
          :
          !!payments && 
          payments.length > 0 && 
          payments.map(({_id, 
                         amount, 
                         service,
                         schedule,
                         provider, 
                         invoiceNumber,
                         createdAt }) => {
           return(
             <TransactionClient
               key={_id}
               id={_id}
               amount={amount}
               service={service}
               schedule={schedule}
               provider={provider}
               invoiceNumber={invoiceNumber}
               date={createdAt}
             />
           )
          })
        }
      </tbody>
    </Table>
  )
}