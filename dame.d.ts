
declare module "dame" {
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
         * Request or fetch extra options.
         */
        requestOptions: any;
    };
    type GetFnc = (url: any, config?: Config) => Promise<Response>;
    type PostFnc = (url: any, body: any, config?: Config) => Promise<Response>;
    /**
     * Creates a new instance of dame with pre-set configuration.
     */
    type NewFnc = (config: Config, instanceName?: string) => DameInstance;
}
