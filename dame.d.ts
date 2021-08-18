declare module "utils/buildUrl" {
    function _exports(url: any, dameInstance: any): any;
    export = _exports;
}
declare module "utils/buildHeaders" {
    function _exports(config: any, dameInstance?: {}): any;
    export = _exports;
}
declare module "utils/buildTimeout" {
    function _exports(config: any, instance: any): any;
    export = _exports;
}
declare module "utils/raceTimeout" {
    function _exports(promise: any, options: any, dameInstance: any): any;
    export = _exports;
}
declare module "utils/checkIsError" {
    function _exports(code: any): boolean;
    export = _exports;
}
declare module "utils/buildMaxRedirects" {
    function _exports(config: any, instance: any): any;
    export = _exports;
}
declare module "utils/requestWeb" {
    export function _exports({ method, fullUrl, body, config, instance, }: RequestWebOptions): Promise<ResponseWeb>;
    export type RequestWebOptions = {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        fullUrl: string;
        body: any;
        config: any;
        /**
         * Dame instance
         */
        instance: any;
    };
    export type ResponseWeb = {
        isError: boolean;
        code: number;
        status: string;
        response: any;
        error: any | null;
    };
}
declare module "utils/requestNode" {
    export function _exports({ method, fullUrl, body, config, instance, }: RequestNodeOptions): Promise<ResponseNode>;
    export type RequestNodeOptions = {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        fullUrl: string;
        body: any;
        config: any;
        /**
         * Dame instance
         */
        instance: any;
    };
    export type ResponseNode = {
        isError: boolean;
        code: number;
        status: string;
        response: any;
        error: any | null;
    };
}
declare module "src/dame" {
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
        timeout?: number;
        /**
         * Max redirects to follow. Default 20. Use 0 to disable redirects.
         */
        maxRedirects?: number;
        /**
         * Request or fetch extra options.
         */
        requestOptions: any;
    };
    export type GetFnc = (url: any, config?: Config) => Promise<Response>;
    export type PostFnc = (url: any, body: any, config?: Config) => Promise<Response>;
    /**
     * Creates a new instance of dame with pre-set configuration.
     */
    export type NewFnc = (config: Config, instanceName?: string) => DameInstance;
    export type DameInstance = {
        get: GetFnc;
        post: PostFnc;
        put: PostFnc;
        patch: PostFnc;
        delete: PostFnc;
        new: NewFnc;
        baseUrl: string;
        options: any;
        headers: any;
        checkIsError: Function;
        timeout: number;
        maxRedirects: number;
    };
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
     * @property {number} [timeout] Number of miliseconds for the timeout.
     * @property {number} [maxRedirects=20] Max redirects to follow. Default 20. Use 0 to disable redirects.
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
     * Creates a new instance of dame with pre-set configuration.
     * @callback NewFnc
     * @param {Config} config
     * @param {string} [instanceName] If set, the instance will be saved on `dame.instances.<instanceName>`.
     * @returns {DameInstance}
    */
    /**
     * @typedef DameInstance
     * @property {GetFnc} get
     * @property {PostFnc} post
     * @property {PostFnc} put
     * @property {PostFnc} patch
     * @property {PostFnc} delete
     * @property {NewFnc} new
     *
     * @property {string} baseUrl
     * @property {*} options
     * @property {*} headers
     * @property {function} checkIsError
     * @property {number} timeout
     * @property {number} maxRedirects
    */
    class Dame {
        constructor(constructorOptions?: {});
        baseUrl: any;
        options: any;
        headers: any;
        checkIsError: any;
        timeout: any;
        maxRedirects: any;
        get(url: any, config?: {}): any;
        post(...args: any[]): any;
        put(...args: any[]): any;
        patch(...args: any[]): any;
        delete(...args: any[]): any;
        new(config: any, instanceName: any): Dame;
        instances: {};
    }
    export const baseUrl: any;
    export const options: any;
    export const headers: any;
    export const checkIsError: any;
    export const timeout: any;
    export const maxRedirects: any;
    export function get(url: any, config?: {}): any;
    export function post(...args: any[]): any;
    export function put(...args: any[]): any;
    export function patch(...args: any[]): any;
    function _delete(...args: any[]): any;
    function _new(config: any, instanceName: any): Dame;
    export const instances: {};
    export { _delete as delete, _new as new };
}
