import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./NotificationContext";
import queryClient from "./queryClient";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
);
