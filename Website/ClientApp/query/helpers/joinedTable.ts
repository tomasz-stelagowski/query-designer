//source: TableInterface, type: string, condition: Object
import { Column } from "./column";
import { Limit } from "./limit";
import { Table } from "./table";
import { JoinCondition } from "./joinCondition"
import { ComparableInterface } from "./comparableInterface";
import { SqlJoinType } from "../../expression-tree/SqlJoinType"
import { autoserialize, autoserializeAs } from "../../serialize";

export class JoinedTable {
    @autoserializeAs(Table) table: Table;
    @autoserialize type: SqlJoinType;
    @autoserializeAs(JoinCondition) conditions: JoinCondition[];

    constructor(table: Table, type: SqlJoinType, conditions: JoinCondition[]) {
        this.table = table;
        this.type = type;
        this.conditions = conditions;
    }

    deepCopy(): JoinedTable {
        let joinedTable = new JoinedTable(this.table.deepCopy(), this.type, this.conditions);

        return joinedTable;
    }

    getJoinedTable(): Table {
        return this.table.deepCopy();
    }

    getType(): SqlJoinType {
        return this.type;
    }

    getConditions(): JoinCondition[] {
        return this.conditions.map(condition => condition);
    }

    private setTable(table: Table) {
        this.table = table;
        return this;
    }

    private setType(type: SqlJoinType) {
        this.type = type;
        return this;
    }

    private setCondition(conditions: JoinCondition[]) {
        this.conditions = conditions;
        return this;
    }
}