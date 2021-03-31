import BTCacheInterface from "./interfaces/BTCacheInterface";

export default class Cache implements BTCacheInterface {
    get(key: string, defaultValue?: any) {
        throw new Error("Method not implemented.");
    }
    put(key: string, value: any, keep_for?: number): boolean {
        throw new Error("Method not implemented.");
    }
    forever(key: string, value: any): boolean {
        throw new Error("Method not implemented.");
    }
    forget(key: string): boolean {
        throw new Error("Method not implemented.");
    }
}