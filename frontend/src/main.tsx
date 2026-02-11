import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { UserDataProvider } from "./context/UseDataContext";
import { RoleProvider } from "./context/RoleContext";
import { NotificationProvider } from "./context/NotificationContext";
import { getUserFromLocalStorage } from "./hooks/useAuth";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const user = getUserFromLocalStorage();
const userId = user._id;

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <UserDataProvider>
            <NotificationProvider userId={userId}>
        <RoleProvider>
          <BrowserRouter>
              <App />
              <ToastContainer position="top-center" autoClose={3000} />
          </BrowserRouter>
        </RoleProvider>
            </NotificationProvider>
      </UserDataProvider>
    </ThemeProvider>
  </Provider>,
);
