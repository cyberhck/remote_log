import * as React from "react";
import {connect} from "react-redux";
import {classes, style} from "typestyle";
import {ILog, LogLevel} from "../logger/Logger";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {connectToLogsServer} from "../redux/modules/logsModule";
import {IStore} from "../redux/rootReducer";

const styles = {
    levels: {
        alert: style({
            borderLeft: "5px solid",
            color: "#f50057"
        }),
        critical: style({
            borderLeft: "5px solid",
            color: "#d500f9"
        }),
        debug: style({
            borderLeft: "5px solid #c6c8ca",
            color: "#1b1e21"
        }),
        emergency: style({
            borderLeft: "5px solid",
            color: "#ab003c"
        }),
        error: style({
            borderLeft: "5px solid",
            color: "#b23c17"
        }),
        info: style({
            borderLeft: "5px solid",
            color: "#33bccd"
        }),
        notice: style({
            borderLeft: "5px solid",
            color: "#004085"
        }),
        warning: style({
            borderLeft: "5px solid",
            color: "#fba333"
        })
    },
    log: style({display: "flex", flexDirection: "row", borderLeft: "5px solid #ccc", padding: "5px 10px 5px 15px", marginTop: 5}),
    logs: style({display: "flex", flexDirection: "column"}),
    message: style({color: "#000"}),
    tag: style({width: 200, overflow: "hidden"})
};
class HomePage extends React.Component<IStateToProps & IDispatchToProps, null> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  private static renderLog(value: ILog, index: number): JSX.Element {
    return (
        <div className={classes(styles.log, styles.levels[HomePage.logLevelToClass(value.level)])} key={index}>
            <div className={styles.tag}>{value.tag}</div>
            <div className={styles.message}>{value.message}</div>
        </div>
    );
  }
  private static logLevelToClass(level: LogLevel): "info" | "warning" | "debug" | "error" | "notice" | "critical" | "alert" | "emergency" {
      switch (level) {
          case LogLevel.DEBUG:
            return "debug";
          case LogLevel.INFO:
            return "info";
          case LogLevel.NOTICE:
            return "notice";
          case LogLevel.WARNING:
            return "warning";
          case LogLevel.ERROR:
            return "error";
          case LogLevel.CRITICAL:
            return "critical";
          case LogLevel.ALERT:
            return "alert";
          case LogLevel.EMERGENCY:
            return "emergency";
          default:
            return "debug";
      }
  }

  public componentDidMount(): void {
    this.props.dispatch(connectToLogsServer());
  }

  public render(): JSX.Element {
    return (
      <div className={styles.logs}>
        {this.props.logs.map((value, index) => HomePage.renderLog(value, index))}
      </div>
    );
  }
  private handleClick(value: number): void {
      this.setState({value});
  }
}

interface IStateToProps {
  pending: boolean;
  connected: boolean;
  logs: ILog[];
}

const mapStateToProps = (store: IStore): IStateToProps => {
    return {
      connected: store.logs.connected,
      logs: store.logs.logs,
      pending: store.logs.pending
    };
};

const connectedPage = connect<IStateToProps, IDispatchToProps, null>(mapStateToProps, null)(HomePage);
export {connectedPage as HomePage, HomePage as unconnectedHomePage};
