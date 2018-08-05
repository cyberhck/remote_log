import {promiseAction} from "../../helpers/promiseReducer";
import {ILog} from "../../logger/Logger";
import {IAction} from "./baseModule";

export const ADD_LOG = "logs/ADD";
export const LOAD_LOGS = "logs/LOAD";
export const CONNECT = "logs/CONNECT";

export interface ILogsState {
    connected: boolean;
    pending: boolean;
    logs: ILog[];
}

const initialState: ILogsState = {
    connected: false,
    logs: [],
    pending: false
};

export function logsReducer(state: ILogsState = initialState, action: IAction<ILog | ILog[]>): ILogsState {
    switch (action.type) {
      case ADD_LOG:
        return {...state, logs: state.logs.concat(action.payload), pending: false};
      case promiseAction(LOAD_LOGS).PENDING:
        return {...state, pending: true};
      case promiseAction(CONNECT).FULFILLED:
        return {...state, connected: true};
      default:
        return {...state};
    }
}

export const addLogs = (log: ILog | ILog[]): IAction<ILog | ILog[]> => {
  return {
    payload: log,
    type: ADD_LOG
  };
};

export const connectToLogsServer = (): IAction<void> => {
  return {type: CONNECT};
};
