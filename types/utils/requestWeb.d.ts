declare function _exports({ method, fullUrl, body, config, instance, }: Options): Promise<ResponseWeb>;
export = _exports;
export type Options = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    fullUrl: string;
    headers: any;
    body: any;
};
export type ResponseWeb = {
    isError: boolean;
    code: number;
    status: string;
    response: any;
    error: any | null;
};
