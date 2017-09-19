import { ModelTable } from "./model-table"
import { ImmutableMap } from "./helpers/immutable-map";

export class Model {
    readonly tables: ImmutableMap<string, ModelTable>;

    constructor(tables: Map<string, ModelTable>) {
        this.tables = new ImmutableMap<string, ModelTable>(tables);
    }
}