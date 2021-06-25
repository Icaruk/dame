/**
 * @typedef Options
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * @property {string} fullUrl
 * @property {*} headers
 * @property {*} body
*/
/**
 * @typedef ResponseWeb
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/
/**
 * @param {Options}
 * @returns {Promise<ResponseWeb>}
*/
declare function requestWeb({ method, fullUrl, headers, body, }: Options): Promise<ResponseWeb>;
type Options = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    fullUrl: string;
    headers: any;
    body: any;
};
type ResponseWeb = {
    isError: boolean;
    code: number;
    status: string;
    response: any;
    error: any | null;
};
