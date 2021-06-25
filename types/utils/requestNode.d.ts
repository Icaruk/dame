declare function _exports({ method, fullUrl, headers, body, }: Options): Promise<ResponseNode>;
export = _exports;
export type Options = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    fullUrl: string;
    headers: any;
    body: any;
};
export type ResponseNode = {
    isError: boolean;
    code: number;
    status: string;
    response: any;
    error: any | null;
};
