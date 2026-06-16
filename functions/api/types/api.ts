export type ApiContext = {
  db: D1Database;
  env: any;
  request: Request;
  pathname: string;
};

export type ApiDispatcher = (ctx: ApiContext) => Promise<Response | null>;
