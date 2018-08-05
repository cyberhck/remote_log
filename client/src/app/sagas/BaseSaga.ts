import {effects} from "redux-saga";
import {Api} from "../sdk/Api";

export type Listener = () => IterableIterator<effects.ForkEffect>;

export abstract class BaseSaga {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(protected api: Api) {
    }

    public watch(): effects.ForkEffect[] {
        return this.registerListeners().map((listener) => effects.fork(listener));
    }

    protected abstract registerListeners(): Listener[];
}
