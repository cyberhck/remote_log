import {effects} from "redux-saga";
import {Api} from "../sdk/Api";
import {InitSaga} from "./InitSaga";

export default function* rootSaga(): any {
    const api = Api.getInstance();
    yield effects.all([
        ...(new InitSaga(api)).watch()
    ]);
}
