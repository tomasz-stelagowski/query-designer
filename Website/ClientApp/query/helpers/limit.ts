import { ComparableInterface } from "./comparableInterface"
import { autoserialize } from "../../serialize";

export class Limit implements ComparableInterface {
    @autoserialize readonly name: string;
    @autoserialize readonly value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }

    get copy(): Limit {
        return new Limit(this.name, this.value);
    }
    isEqual(limit: Limit) {
        //there cant be more than one limit of a type. 
        //This is enough to check equality
        if (this.name == limit.name) return true;
        else return false;
    }
}