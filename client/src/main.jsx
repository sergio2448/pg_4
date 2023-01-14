import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-dbk-z8uv.us.auth0.com"
      clientId="ay12D2EuY0bRAPe0JZiefqMweD08h4jj"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
