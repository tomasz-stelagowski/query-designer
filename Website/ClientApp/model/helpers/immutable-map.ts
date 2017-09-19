export class ImmutableMap<K, V> {
    private readonly map: Map<K, V>;

    constructor(map: Map<K, V>) {
        if (map instanceof Map) {
            this.map = new Map<K, V>(map.entries());
        }
    }

    entries(): IterableIterator<[K, V]> {
        return this.map.entries();
    }

    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        return this.map.forEach(callbackfn, thisArg);
    }

    get(key: K): V | undefined {
        return this.map.get(key);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    keys(): IterableIterator<K> {
        return this.map.keys();
    }

    values(): IterableIterator<V> {
        return this.map.values();
    }

    get size(): number {
        return this.map.size;
    }
}