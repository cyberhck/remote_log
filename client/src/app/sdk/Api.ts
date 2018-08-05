import {Client, IFetchRequest, Service} from "@crazyfactory/tinka";
import {WrapMw} from "./middlewares/WrapMw";
import {Logs} from "./nodes/Logs";

export class Api extends Service {
  private static instance: Api = null;

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api(Api.setupMiddlewares(Api.getClient()));
    }
    return Api.instance;
  }

  public static getClient(): Client {
    const request: IFetchRequest = {baseUrl: Api.getEndpoint()};
    return new Client(request);
  }

  public static getEndpoint(): string {
      // tslint:disable-next-line
      return "http://localhost:9999";
  }
  public get logs(): Logs {
    return new Logs(this.client);
  }

  private static setupMiddlewares(client: Client): Client {
    client.addMiddleware(new WrapMw());
    return client;
  }
}
