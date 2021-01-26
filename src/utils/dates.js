export function dateOfAction(date) {
  const actionDate = new Date(date)
  const actionYear = actionDate.getFullYear()
  const months = ['Jan', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec' ]
  const actionMonth = months[actionDate.getMonth()];
  const actionDay = actionDate.getDate()
  return [ actionDay, actionMonth, actionYear]
}

