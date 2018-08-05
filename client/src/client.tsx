import * as e6p from "es6-promise";
(e6p as any).polyfill();
import "isomorphic-fetch";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router5";
import {setStylesTarget} from "typestyle";

import {App} from "./app/containers";
import {configureStore} from "./app/redux/configureStore";
import {configureRouter} from "./app/routes/configureRouter";
import {INIT_STORE} from "./app/sagas/InitSaga";
import rootSaga from "./app/sagas/rootSaga";

const appConfig = require("../config/main");

const ReactHotLoader = appConfig.env !== "production"
  ? require("react-hot-loader").AppContainer
  : ({ children }) => React.Children.only(children);

const router = configureRouter();
const store = configureStore(router, window.__INITIAL_STATE__);
router.start();
store.runSaga(rootSaga);
store.dispatch({type: INIT_STORE});

ReactDOM.render(
  <ReactHotLoader>
    <Provider store={store} key="provider">
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
    </Provider>
  </ReactHotLoader>,
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));

if ((module as any).hot) {
  (module as any).hot.accept("./app/containers", () => {
    const {NewApp} = require("./app/containers");
    ReactDOM.render(
      <ReactHotLoader>
        <Provider store={store}>
          <RouterProvider router={router}>
            <NewApp/>
          </RouterProvider>
        </Provider>
      </ReactHotLoader>,
      document.getElementById("app")
    );
  });
}
