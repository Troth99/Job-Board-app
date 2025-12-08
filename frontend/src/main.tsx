
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { UserDataProvider } from "./context/UseDataContext";
import { RoleProvider } from "./context/RoleContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <UserDataProvider>
        <RoleProvider>
          <BrowserRouter>
            <App />
            <ToastContainer position="top-center" autoClose={3000} />
          </BrowserRouter>
        </RoleProvider>
      </UserDataProvider>
    </ThemeProvider>
  </Provider>
);