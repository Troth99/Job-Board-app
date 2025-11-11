
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";



const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}> 
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>
);