import { ComparableInterface } from "./comparableInterface";
import { IMessage } from "../../dialog/message";
import { ModelColumn } from "../../model/model-column";
import { SqlTypeEnum } from "../../expression-tree/SqlTypeEnum";
import { autoserialize, autoserializeAs } from "../../serialize";

/**
 * colum model class
 */
export class Column implements ComparableInterface, IMessage {
    @autoserializeAs(ModelColumn) private readonly model: ModelColumn;

    @autoserialize readonly _name: string;
    @autoserialize readonly type: string;
    @autoserialize readonly source: string[];

    constructor(model: ModelColumn) {
        this.source = [];

        if (model instanceof ModelColumn) {
            this._name = model.name;
            this.type = model.type;
            this.model = model;
        }
    }

    get message() {
        return this.name;
    }

    get simpleName() {
        return this._name;
    }

    get copy(): Column {
        let col: Column = new Column(this.model);
        this.source.forEach(source => col.addSource(source));
        return col;
    }
    get name() {
        if (this.source.length == 0) return this._name;
        else return (this.source[0] + "." + this._name);
    }
    isEqual(column: Column) {
        if (this._name == column._name && this.type == column.type) {
            return true;
        } else {
            return false;
        }
    }
    addSource(source: string) {
        this.source.unshift(source);
        return this;
    }

    get sqlType(): SqlTypeEnum {
        switch (this.type) {
            case "int":
                return SqlTypeEnum.Integer;
            case "nvarchar":
                return SqlTypeEnum.Varchar;
            case "datetime":
                return SqlTypeEnum.DateTime;
            case "timestamp":
                return SqlTypeEnum.DateTime;
            case "smalldatetime":
                return SqlTypeEnum.DateTime;
            case "decimal":
                return SqlTypeEnum.Decimal;
            case "money":
                return SqlTypeEnum.Decimal;
            default:
                throw Error("Not implemented column type " + this.type);
        }
    }
}
