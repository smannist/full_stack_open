const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      <p className="error-text">{message}</p>
    </div>
  );
};

export default Notification;
