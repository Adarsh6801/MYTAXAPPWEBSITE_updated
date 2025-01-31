import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";

import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import Loading from "./components/Loading";

import "./i18n";
import "normalize.css";
import "antd/dist/antd.less";
import "./index.css";
import "./global/Extensions";

const RootNavigation = loadable(() => import("./navigation"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootNavigation fallback={<Loading />} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
