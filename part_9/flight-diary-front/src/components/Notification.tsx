import { NotificationProps } from "../types";

const Notification = ({ message }: NotificationProps) => {
  if (message === null) {
    return null;
  }

  const style = {
    color: "red",
  };

  return (
    <div>
      <p style={style}>{message}</p>
    </div>
  );
};

export default Notification;
