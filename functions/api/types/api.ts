export type ApiContext = {
  supabase: any;
  env: any;
  request: Request;
  pathname: string;
};

export type ApiDispatcher = (ctx: ApiContext) => Promise<Response | null>;
