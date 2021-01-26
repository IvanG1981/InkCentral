import { useState } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import { Payment } from '../components/Payment'
import 'react-datepicker/dist/react-datepicker.css'
import swal from 'sweetalert'
import moment from 'moment'

const date = new Date()
const exactHour = 1000 * 60 * 60
const today = new Date(Math.round(date.getTime() / exactHour) * exactHour)
const later = new Date()
later.setMonth(today.getMonth() + 1)
const minTime = new Date(new Date().setHours(6))
const maxTime = new Date(new Date().setHours(20))

export function Appointment() {

  const { artist } = useSelector(
    ({ artistReducer: { artist } }) => {
      return { artist }
    })

  const [appointment, setAppointment] = useState({
    service: 'Small Tattoo Design',
    amount: '70000',
    schedule: today,
    isOk: false,        
  })   

  const onChangeDate = (date) => {
    setAppointment({
      ...appointment,
      schedule: date
    })
  }

  const rates = {
    'Artistic Advice': '35000',
    'Small Tattoo Design': '70000',
    'Medium Tattoo Design': '140000',
  }

  const onOptionChange = (e) => {  
    const amount = rates[e.target.value]
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
      amount
    })
  }  

  const onAmountChange = (e) => {     
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    })
  }  

  const excludes = []
  artist.payments.map(({schedule}) => {    
    const when = moment(schedule).format('MMMM D, yyyy h:mm A')
    excludes.push(when)
    excludes.sort()
  })

  const verifyService = (e) => {
    e.preventDefault()
    const myDate = moment(schedule).format('MMMM D, yyyy h:mm A') 
    const isBusy = excludes.includes(myDate)
    if (isBusy) {
      swal(
        'This date has been chosen, pick one different to', 
        `${excludes.join('\n')}`,
        'info'
      )      
    } else {
      setAppointment({
        ...appointment,
        isOk: true,      
      })
      swal({
        title: 'Great, now you can press Pay or Edit your appointment',
        icon: 'success'
      })
    }       
  }

  const editService = (e) => {
    e.preventDefault()    
    setAppointment({
      ...appointment,      
      isOk: false
    })
  }

  const { service, amount, schedule, isOk } = appointment
   
  return (
    <form onSubmit={verifyService}>
      <div className="card card-body">
        <div className="form-group">
          <select
            className="form-control"
            name="service"
            onChange={onOptionChange}
            disabled={isOk}
          >
            <option value='Small Tattoo Design'>Small Tattoo Design</option>
            <option value='Medium Tattoo Design'>Medium Tattoo Design</option>
            <option value='Artistic Advice'>Artistic Advice</option>
            <option value='Pay a Tattoo'>Pay a Tattoo</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="amount"
            onChange={onAmountChange}
            value={ amount || '' }
            placeholder={
              service === 'Pay a Tattoo' ? 
              'Enter a value between $35.000 and $200.000 (in multiples of $1.000)' : ''
            }
            disabled={
              service === 'Pay a Tattoo' && !isOk ? false : true
            }
            step='1000'
            min='35000'
            max='200000'
            required>
          </input>
        </div>
        <div className="form-group">
          <DatePicker
            className="form-control"
            selected={schedule}
            minDate={today}
            minTime={minTime}
            maxDate={later}
            maxTime={maxTime}
            showTimeSelect
            timeFormat='h:mm a'
            dateFormat='MMMM d, yyyy h:mma'
            timeIntervals={60}            
            onChange={onChangeDate}
            disabled={isOk}
          />
        </div>
      
        <div className="d-flex form-group justify-content-around">
          <button          
            className="form-control btn btn-success col-sm-5"
            type="submit"
            disabled={isOk}
          >
            Book your appointment
          </button>
          <button          
            className="form-control btn btn-primary col-sm-5"
            onClick={editService}
            disabled={!isOk}
          >
            Edit appointment
          </button>
        </div>

        { !!isOk && 
          <div className="form-group">
            <Payment 
              artist={ artist }
              service= { service }
              amount= { amount }
              schedule= { schedule }
            />
          </div>
        }        

      </div>
    </form>
  )
}