/**
 * Full URL you want to request
 */
export type Url = string;
export type Body = any;
export type Options = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};
export type Response = {
    isError: boolean;
    code: number;
    status: string;
    response: any;
    error: any | null;
};
