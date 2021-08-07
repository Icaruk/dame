declare module "utils/buildUrl" {
    function _exports(url: any, dameInstance: any): any;
    export = _exports;
}
declare module "utils/buildHeaders" {
    function _exports(config: any, dameInstance?: {}): any;
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
declare module "utils/requestWeb" {
    function _exports({ method, fullUrl, body, config, instance, }: Options): Promise<ResponseWeb>;
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
}
declare module "utils/requestNode" {
    function _exports({ method, fullUrl, body, config, instance, }: Options): Promise<ResponseNode>;
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
    class Dame {
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
    export const baseUrl: any;
    export const options: any;
    export const headers: any;
    export const checkIsError: any;
    export const timeout: any;
    export const get: GetFnc;
    export const post: PostFnc;
    export const put: PostFnc;
    export const patch: PostFnc;
    const _delete: PostFnc;
    export function _new(config: Config, instanceName?: string): Dame;
    export const instances: {};
    export { _delete as delete, _new as new };
}
