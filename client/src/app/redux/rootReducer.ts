import {combineReducers, Reducer} from "redux";
import {router5Reducer, RouterState} from "redux-router5";
import {ILogsState, logsReducer} from "./modules/logsModule";

export interface IStore {
    logs: ILogsState;
    router: RouterState;
}

export const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  logs: logsReducer,
  router: router5Reducer
});
