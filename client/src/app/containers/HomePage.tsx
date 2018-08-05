import * as React from "react";
import {connect} from "react-redux";
import {ILog} from "../logger/Logger";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {connectToLogsServer} from "../redux/modules/logsModule";
import {IStore} from "../redux/rootReducer";

class HomePage extends React.Component<IStateToProps & IDispatchToProps, null> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  private static renderLog(value: ILog, index: number): JSX.Element {
    return <div key={index}>{value.level} {value.tag} {value.message}</div>;
  }

  public componentDidMount(): void {
    this.props.dispatch(connectToLogsServer());
  }

  public render(): JSX.Element {
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
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
