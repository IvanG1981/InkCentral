import { dateOfAction } from '../utils/dates'
import moment from 'moment'


export function TransactionArtist({ amount, service, consumer, invoiceNumber, date, schedule }) {
  const transactionDate = dateOfAction(date)

  const when = moment(schedule).format('ddd, MMM D, yyyy h:mma')

  return(
    <tr>
      <td>{ invoiceNumber }</td>
      <td>${ amount } </td>
      <td>{ service }</td>
      <td>{ when }</td>
      <td> { consumer.name }</td> 
      <td> { consumer.email }</td>
      <td> 
          {
            `${transactionDate[0]} 
             ${transactionDate[1]} 
             ${transactionDate[2]}`
          }  
      </td>
    </tr>
  )
}

export function TransactionClient({ amount, service, provider, invoiceNumber, date, schedule }) {
  const transactionDate = dateOfAction(date)

  const when = moment(schedule).format('ddd, MMM D, yyyy h:mma')

  return(
    <tr>
      <td>{ invoiceNumber }</td>
      <td>${ amount }</td>
      <td>{ service }</td>
      <td>{ when }</td>
      <td> { provider.name }</td>
      <td> { provider.email }</td>
      <td> 
          {
            `${transactionDate[0]} 
             ${transactionDate[1]} 
             ${transactionDate[2]}`
          }  
      </td>
    </tr>
  )
}
