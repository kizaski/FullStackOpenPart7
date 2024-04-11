import clsx from 'clsx'

const Notification = ({ message, type }) => {
  const notifStyles = clsx({
    'bg-lightgray text-green-600 italic border border-solid border-green-600 rounded-lg p-4 mb-4':
      type === 'info',
    'bg-lightgray text-red-600 border border-solid border-red-600 rounded-lg p-4 mb-4':
      type === 'error',
  })
  if (!message) return null
  return <div className={notifStyles}>{message}</div>
}

export default Notification
