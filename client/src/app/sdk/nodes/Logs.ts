import {Client, IFetchRequest, Service} from "@crazyfactory/tinka";
import {ILog} from "../../logger/Logger";

export interface ILogsResponse {
  data: ILog[];
}
export class Logs extends Service {
    constructor(api: Client) {
        super(api);
        this.list = this.list.bind(this);
    }
    public list(): Promise<ILogsResponse> {
        const options: IFetchRequest = {
            method: "GET",
            url: "/logs"
        };
        return this.client.process(options);
    }
}
