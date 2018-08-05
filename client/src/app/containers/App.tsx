import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {State as IRouteState} from "router5";
import {cssRaw, cssRule, style} from "typestyle";

import {Header} from "../components";
import {IStore} from "../redux/rootReducer";
import {HomePage} from "./HomePage";

const appConfig = require("../../../config/main");

// Global style
cssRaw(`@import url(https://fonts.googleapis.com/css?family=Roboto);`);
normalize();
setupPage("#app");
cssRule(`html, body`, {
  fontFamily: "Roboto",
  height: "auto"
});

// App container style
const styles = {
  container: style({
    margin: "0 auto",
    maxWidth: "65.125rem",
    padding: 0
  })
};

class App extends React.Component<IStateToProps, null> {
  private components: {[key: string]: React.ComponentClass} = {
    home: HomePage
  };

  constructor(props: IStateToProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {route} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
        <div>
          <Header/>
          <section className={styles.container}>
            <Helmet {...appConfig.app.head}/>
            {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>Not found</div>}
          </section>
        </div>
    );
  }
}

interface IStateToProps {
  route: IRouteState;
}

const mapStateToProps = (state: Partial<IStore> & {router: RouterState}) => ({
  ...createRouteNodeSelector("")(state)
});

const connectedApp = connect<IStateToProps, null, null>(mapStateToProps, null)(App);

export {connectedApp as App, App as UnconnectedApp, mapStateToProps, styles};
