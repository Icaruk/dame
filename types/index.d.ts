declare class Dame {
    config: {};
    get(): void;
    post(): void;
    put(): void;
    delete(): void;
    /**
     *
     * @param {string} configKey
     * @param {"baseUrl" | "token" | string} key
     * @param {*} value
    */
    setConfig(configKey: string, key: "baseUrl" | "token" | string, value: any): void;
}
declare const dame: Dame;
