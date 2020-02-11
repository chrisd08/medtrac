import { UserAPI } from "../api";

interface API {
  user?: UserAPI;
}

export interface Context {
  dataSources?: API;
  url: string;
  req: Express.Request;
  user: {
    sub: string;
  };
}
