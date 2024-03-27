import { useNotificationMessage } from "../context/NotificationContext";

const Notification = () => {
  const { className, message } = useNotificationMessage();

  if (message === null) {
    return null;
  }

  return (
    <div>
      <p className={className}>{message}</p>
    </div>
  );
};

export default Notification;
