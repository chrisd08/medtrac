export interface Context {
  url: string;
  req: Express.Request;
  user: {
    sub: string;
  };
}
