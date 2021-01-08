import { dateOfAction } from '../utils/dates'


export function TransactionArtist({ amount, service, consumer, invoiceNumber, date }) {
  const transactionDate = dateOfAction(date)
  return(
    <tr>
      <td>{ invoiceNumber }</td>
      <td>${ amount } </td>
      <td>{ service }</td>
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

export function TransactionClient({ amount, service, provider, invoiceNumber, date }) {
  const transactionDate = dateOfAction(date)
  return(
    <tr>
      <td>{ invoiceNumber }</td>
      <td>${ amount }</td>
      <td>{ service }</td>
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