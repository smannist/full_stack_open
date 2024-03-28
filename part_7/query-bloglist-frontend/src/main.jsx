import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./context/NotificationContext";
import { UserContextProvider } from "./context/UserContext";
import queryClient from "./queryClient";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="bg-blue-200 min-h-screen">
    <Router>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </NotificationContextProvider>
      </QueryClientProvider>
    </Router>
  </div>
);
