import { UserAPI } from "../api";

interface API {
  user?: Partial<UserAPI>;
}

export interface Context {
  dataSources?: Partial<API>;
  url: string;
  req: Express.Request;
  user: {
    sub: string;
  };
}
