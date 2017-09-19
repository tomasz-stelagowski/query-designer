/**
 * SQL Table class.
 */
import { ModelColumn } from "./model-column";
import { ImmutableMap } from "./helpers/immutable-map";
import { ISerializable, autoserialize, autoserializeAs } from "../serialize";

export class ModelTable {
    @autoserialize readonly name: string;
    readonly columns: ImmutableMap<string, ModelColumn>;

    constructor(name: string, columns: Map<string, ModelColumn>) {
        this.name = name;
        this.columns = new ImmutableMap<string, ModelColumn>(columns);
    }

    public static OnSerialized(instance: ModelTable, json: any): void {
        json.columns = [];

        instance.columns.forEach((value, key) => {
            json.columns.push({ key: key, value: value });
        })
    }

    public static OnDeserialized(instance, json: any): void {
        let columns = new Map<string, ModelColumn>();

        for (let entry of json.columns) {
            columns.set(entry.key, entry.value);
        }

        instance.columns = new ImmutableMap(columns);
    }
}
