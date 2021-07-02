export type Response = {
    isError: boolean;
    code: number;
    status: string;
    response: any;
    error: any | null;
};
export type Options = {
    headers: any;
};
export type GetFnc = (url: any, configGroup?: string | Options, options?: Options) => Promise<Response>;
export type PostFnc = (url: any, body: any, configGroup?: string | Options, options?: Options) => Promise<Response>;
