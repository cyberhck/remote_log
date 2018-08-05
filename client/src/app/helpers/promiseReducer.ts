export interface IRequestType {
  PENDING: string;
  SUCCESS: string;
  FAILURE: string;
}

export interface IPromiseActions {
    PENDING: string;
    FULFILLED: string;
    REJECTED: string;
}

export const promiseAction = (baseAction: string): IPromiseActions => {
    return {
        FULFILLED: baseAction + "_FULFILLED",
        PENDING: baseAction + "_PENDING",
        REJECTED: baseAction + "_REJECTED"
    };
};
