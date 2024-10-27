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
    function _exports({ method, fullUrl, body, config, instance, }: RequestWebOptions): Promise<ResponseWeb>;
    export = _exports;
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
    function _exports({ method, fullUrl, body, config, instance, }: RequestNodeOptions): Promise<ResponseNode>;
    export = _exports;
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
    export = dame;
    /**
     * @type {DameInstance}
     */
    const dame: DameInstance;
    namespace dame {
        export { Response, Config, GetFnc, PostFnc, NewFnc, DameInstance };
    }
    type DameInstance = {
        get: GetFnc;
        post: PostFnc;
        put: PostFnc;
        patch: PostFnc;
        delete: GetFnc;
        new: NewFnc;
        instances: Array<DameInstance>;
        baseUrl: string;
        options: any;
        headers: any;
        checkIsError: Function;
        timeout: number;
        maxRedirects: number;
    };
    type Response = {
        isError: boolean;
        code: number;
        status: string;
        response: any;
        error: any | null;
    };
    type Config = {
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
         * **Browser only**. Default `"json"`. Type of the data that the server will respond with.
         */
        responseType?: "arraybuffer" | "stream" | "json" | "text";
        /**
         * Request or fetch extra options.
         */
        requestOptions: any;
    };
    type GetFnc = (url: Url, config?: Config) => Promise<Response>;
    type PostFnc = (url: Url, body: any, config?: Config) => Promise<Response>;
    /**
     * Creates a new instance of dame with pre-set configuration.
     */
    type NewFnc = (config: Config, instanceName?: string) => DameInstance;
}
