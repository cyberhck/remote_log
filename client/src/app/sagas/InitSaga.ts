// tslint:disable-next-line:no-submodule-imports
import {CallEffect, PutEffect, takeLatest} from "redux-saga/effects";
import {connect} from "socket.io-client";
import {call, put} from "../../../node_modules/redux-saga/effects";
import {promiseAction} from "../helpers/promiseReducer";
import {ILog} from "../logger/Logger";
import {addLogs, CONNECT, LOAD_LOGS} from "../redux/modules/logsModule";
import {Api} from "../sdk/Api";
import {ILogsResponse} from "../sdk/nodes/Logs";
import {BaseSaga, Listener} from "./BaseSaga";
import Socket = SocketIOClient.Socket;

export const INIT_STORE = "STORE/INIT";

export class InitSaga extends BaseSaga {
  constructor(api: Api) {
    super(api);
    this.loadLogs = this.loadLogs.bind(this);
    this.loadLogsListener = this.loadLogsListener.bind(this);
    this.connect = this.connect.bind(this);
    this.connectListener = this.connectListener.bind(this);
    this.listenNewData = this.listenNewData.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
  }

  public* loadLogsListener(): IterableIterator<any> {
    yield takeLatest(INIT_STORE, this.loadLogs);
  }

  public* loadLogs(): IterableIterator<any> {
    try {
      yield put({type: promiseAction(LOAD_LOGS).PENDING});
      const payload: ILogsResponse = yield call(this.api.logs.list);
      yield put(addLogs(payload.data));
    } catch (e) {
      console.error(e);
      yield put({type: promiseAction(LOAD_LOGS).REJECTED});
    }
  }

  public* connectListener(): IterableIterator<any> {
    yield takeLatest(CONNECT, this.connect);
  }

  public connectSocket(): Promise<Socket> {
    const socket = connect("localhost:9999", {autoConnect: true, reconnection: true, reconnectionAttempts: 5});
    return new Promise((resolve) => {
      socket.on("connect", () => {
        resolve(socket);
      });
    });
  }
  public listenNewData(socket: Socket): Promise<ILog> {
    return new Promise<ILog>((resolve) => {
      socket.on("data", (log: ILog) => {
        resolve(log);
      });
    });
  }

  public* connect(): IterableIterator<PutEffect<any> | CallEffect> {
    yield put({type: promiseAction(CONNECT).PENDING});
    const socket = yield call(this.connectSocket);
    yield put({type: promiseAction(CONNECT).FULFILLED});
    // tslint:disable-next-line
    while (true) {
      const payload = yield call(this.listenNewData, socket);
      yield put(addLogs(payload));
    }
  }

  protected registerListeners(): Listener[] {
    return [this.loadLogsListener, this.connectListener];
  }
}
