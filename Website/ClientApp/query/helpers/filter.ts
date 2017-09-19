import { ComparableInterface } from "./comparableInterface"
import { Column } from "./column";
import { SqlExpressionType } from "../../expression-tree/SqlExpressionType";
import { autoserializeAs, autoserialize } from "../../serialize";

export class Filter implements ComparableInterface {
    @autoserializeAs(Column) readonly column: Column;
    @autoserialize readonly operation: SqlExpressionType;
    @autoserialize readonly value: any;

    constructor(column: Column, operation: SqlExpressionType, value: any) {
        this.column = column;
        this.operation = operation;
        this.value = value;
    }

    get copy(): Filter {
        return new Filter(this.column, this.operation, this.value);
    }
    isEqual(filter: Filter) {
        if (this.column.isEqual(filter.column) && this.value == filter.value) return true;
        else return false;
    }

    get simpleMessage() {
        return this.column.simpleName + " " + this.operationMessage + " " + this.value;
    }

    get message() {
        return this.column.name + " " + this.operationMessage + " " + this.value;
    }

    get operationMessage(): string {
        switch (this.operation) {
            case SqlExpressionType.Equal:
                return "=";
            case SqlExpressionType.Smaller:
                return "<";
            case SqlExpressionType.SmallerEqual:
                return "<=";
            case SqlExpressionType.Greater:
                return ">";
            case SqlExpressionType.GreaterEqual:
                return ">=";
            case SqlExpressionType.NotEqual:
                return "<>";
            case SqlExpressionType.Like:
                return "LIKE";
        }
    }

}