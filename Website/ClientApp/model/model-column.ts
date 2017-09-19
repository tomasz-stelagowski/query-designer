import { autoserialize } from "../serialize";

/**
 * Column model class
 */
export class ModelColumn  {
    @autoserialize readonly name: string;
    @autoserialize readonly type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }
}
