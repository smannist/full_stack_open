const Notification = ({ type, message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      <p className={type}>{message}</p>
    </div>
  );
};

export default Notification;
