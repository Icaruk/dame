export type Response = {
    isError: boolean;
    code: number;
    status: string;
    response: any;
    error: any | null;
};
export type Config = {
    headers: any;
    /**
     * Number of miliseconds for the timeout.
     */
    timeout: number;
    /**
     * Request or fetch extra options.
     */
    requestOptions: any;
};
export type GetFnc = (url: any, config?: Config) => Promise<Response>;
export type PostFnc = (url: any, body: any, config?: Config) => Promise<Response>;
export type NewFnc = (config?: Config) => any;
/**
 * @typedef Response
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/
/**
 * @typedef Config
 * @property {Object} headers
 * @property {number} timeout Number of miliseconds for the timeout.
 * @property {*} requestOptions Request or fetch extra options.
*/
/**
 * @callback GetFnc
 * @param {Url} url Full URL or path. If it starts with `http://` or `https://` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl`.
 * @param {Config} [config] Config
 *
 * @returns {Promise<Response>}
*/
/**
 * @callback PostFnc
 * @param {Url} url Full URL or path. If it starts with `http://` or `https://` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl`.
 * @param {Object} body Body of the request.
 * @param {Config} [config] Config
 *
 * @returns {Promise<Response>}
*/
/**
 * @callback NewFnc
 * @param {Config} [config] Config
*/
declare class Dame {
    constructor(constructorOptions?: {});
    baseUrl: any;
    options: any;
    headers: any;
    checkIsError: any;
    timeout: any;
    /** @type {GetFnc} */
    get: GetFnc;
    /** @type {PostFnc} */
    post: PostFnc;
    /** @type {PostFnc} */
    put: PostFnc;
    /** @type {PostFnc} */
    patch: PostFnc;
    /** @type {PostFnc} */
    delete: PostFnc;
    /**
     * Creates a new instance of dame with pre-set configuration.
     * @param {Config} config
     * @param {string} [instanceName] If set, the instance will be saved on `dame.instances.<instanceName>`.
     * @returns
    */
    new: (config: Config, instanceName?: string) => Dame;
    instances: {};
}
export declare const baseUrl: any;
export declare const options: any;
export declare const headers: any;
export declare const checkIsError: any;
export declare const timeout: any;
export declare const get: GetFnc;
export declare const post: PostFnc;
export declare const put: PostFnc;
export declare const patch: PostFnc;
declare const _delete: PostFnc;
export declare function _new(config: Config, instanceName?: string): Dame;
export declare const instances: {};
export { _delete as delete, _new as new };
