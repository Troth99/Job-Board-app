import ReactDOM from "react-dom/client";
import { I18nProvider } from "@lingui/react";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDataProvider } from "./context/UseDataContext";
import { RoleProvider } from "./context/RoleContext";
import { NotificationProvider } from "./context/NotificationContext";
import { getUserFromLocalStorage } from "./features/auth/hooks/useAuth";
import { useState } from "react";
import { FavoritesProvider } from "./context/FavouritesJobsContext";
import { HelmetProvider } from "react-helmet-async";
import { i18n } from "./i18n";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

function Main() {
  const initialUser = getUserFromLocalStorage();
  const [userId, setUserId] = useState(initialUser?._id || '')

  return (
    <HelmetProvider>
      <I18nProvider i18n={i18n}>
        <Provider store={store}> 
          <ThemeProvider>
            <UserDataProvider>
              <NotificationProvider userId={userId}>
                <RoleProvider>
                  <FavoritesProvider userId={userId}>
                    <BrowserRouter>
                      <App setUserId={setUserId} />
                      <ToastContainer position="top-center" autoClose={3000} />
                    </BrowserRouter>
                  </FavoritesProvider>
                </RoleProvider>
              </NotificationProvider>
            </UserDataProvider>
          </ThemeProvider>
        </Provider>
      </I18nProvider>
    </HelmetProvider>
  )
}
ReactDOM.createRoot(rootElement).render(<Main />);