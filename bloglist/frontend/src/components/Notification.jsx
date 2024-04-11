const Notification = ({ message, type }) => {
  const notifStyles =
    type === 'info'
      ? 'bg-lightgray text-green-600 italic border border-solid border-green-600 rounded-lg p-4 mb-4'
      : 'bg-lightgray text-red-600 border border-solid border-red-600 rounded-lg p-4 mb-4'
  if (!message) return null
  return <div className={notifStyles}>{message}</div>
}

export default Notification
