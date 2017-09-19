import { Column, Table, TableInterface, Query, JoinCondition, JoinedTable, Limit, Filter, Order } from "../query.helpers";
import { SqlJoinType } from "../../expression-tree/SqlJoinType";

export class TableJoiner {
    table: Query;
    joinedSources: JoinedTable[];
    constructor(table: Query) {
        this.table = table.deepCopy();

        this.joinedSources = [
            new JoinedTable(this.table.getBaseTable(), undefined, []),
            ...this.table.getJoinedSources()
        ]
    }

    public extractTableExpr(): Query {
        let newTable = new Query(this.table["expressionBuilderService"], this.joinedSources[0].getJoinedTable());
        newTable.setJoinedSources(this.joinedSources.slice(1));

        newTable.setName(this.table.getName());
        newTable.setAlias(this.table.getAliasName());

        this.table.getColumns().forEach((col: Column) => newTable.addColumn({ column: col }));
        this.table.getLimits().forEach((lim: Limit) => newTable.addLimit({ limit: lim }));
        this.table.getFilters().forEach((fil: Filter) => newTable.addFilter({ filter: fil }));
        this.table.getOrders().forEach((ord: Order) => newTable.addOrder({ order: ord }));

        return newTable;
    }

    public getSourceTables(): TableInterface[] {
        return this.joinedSources.map(
            (table: JoinedTable) => table.getJoinedTable()
        )
    }

    public shiftTableUp(index: number) {
        if (index == 0 || index >= this.joinedSources.length) return;
        let shiftedTable = this.joinedSources.splice(index, 1)[0];
        this.joinedSources.splice(index - 1, 0, shiftedTable);
        if (index == 1) {
            this.joinedSources[0].conditions = [];
            this.joinedSources[0].type = SqlJoinType.Inner;
            this.joinedSources[1].conditions = [];
            this.joinedSources[1].type = SqlJoinType.Inner;
        }

        return this;
    }

    public shiftTableDown(index: number) {
        if (index < 0 || index >= this.joinedSources.length - 1) return;

        let shiftedTable = this.joinedSources.splice(index, 1)[0];
        if(index == 0){
            shiftedTable.conditions = [];
            shiftedTable.type = SqlJoinType.Inner;
        }
        this.joinedSources.splice(index + 1, 0, shiftedTable);

        return this;
    }

    public addCondition(tableIndex: number, left: Column, right: Column) {
        if (this.isPossibleCondition(tableIndex, left, right)) {
            let pomTable = new JoinedTable(
                this.joinedSources[tableIndex].getJoinedTable(),
                this.joinedSources[tableIndex].getType(),
                [
                    ...this.joinedSources[tableIndex].getConditions(),
                    { left: left, right: right }
                ]
            )
            this.joinedSources.splice(tableIndex, 1, pomTable);
        }
        return this;
    }

    public getConditons(tableIndex: number): JoinCondition[] {
        return this.joinedSources[tableIndex].getConditions();
    }

    public removeCondition(tableIndex: number, conditionIndex: number) {
        this.joinedSources[tableIndex].conditions.splice(conditionIndex, 1);
    }

    public addTable(table: Table, type: SqlJoinType, conditions: JoinCondition[]) {
        this.joinedSources.push(new JoinedTable(
            table.deepCopy(),
            !!type ? type : SqlJoinType.Inner,
            !!conditions ? conditions : []
        ))
        return this;
    }

    public removeTable(index: number) {
        this.joinedSources.splice(index, 1);
        if (index == 0) {
            this.joinedSources[0].conditions = [];
            this.joinedSources[0].type = undefined;
        }
        return 0;
    }

    private isPossibleCondition(index: number, left: Column, right: Column): boolean {
        let isPresent = this.joinedSources[index].getConditions().some(
            (condition: JoinCondition) => {
                if (condition.left.isEqual(left) && condition.right.isEqual(right))
                    return true;
                else
                    return false;
            }
        );
        if (isPresent) return false;
        else return true;
    }

    public setConditionType(tableIndex: number, type: SqlJoinType) {
        this.joinedSources[tableIndex].type = type;
    }
    public getConditionType(tableIndex: number): SqlJoinType {
        return this.joinedSources[tableIndex].type;
    }

    getColumnsUpToIndex(tableIndex): Column[] {
        let columns: Column[] = [];
        for (let i = 0; i < tableIndex; i++) {
            columns = [...columns, ...this.joinedSources[i].getJoinedTable().getColumns()];
        }
        return columns;
    }

    validateCondition(tableIndex: number, conditionIndex: number): boolean {
        if (tableIndex == 0 || tableIndex >= this.joinedSources.length) return true;
        let columns: Column[] = this.getColumnsUpToIndex(tableIndex);
        let leftColumnOK: boolean = false;
        let rightColumnOK: boolean = false;
        let testedCondition: JoinCondition = this.joinedSources[tableIndex].getConditions()[conditionIndex];

        leftColumnOK = columns.some(
            (column: Column) => column.isEqual(testedCondition.left)
        );
        rightColumnOK = this.joinedSources[tableIndex].getJoinedTable().getColumns().some(
            (column: Column) => column.isEqual(testedCondition.right)
        );

        return (leftColumnOK && rightColumnOK);

    }
    validateConitions(tableIndex: number) {
        return this.joinedSources[tableIndex].getConditions().length > 0
            && this.joinedSources[tableIndex].getConditions().every(
                (_, conditionIndex: number) => this.validateCondition(tableIndex, conditionIndex)
            )
    }

    validateTable(tableIndex: number): boolean {
        if (tableIndex == 0) return true;
        return this.validateJoinType(tableIndex)
            && this.validateConitions(tableIndex);
    }

    validateJoinType(tableIndex: number): boolean {
        if (tableIndex == 0 || tableIndex >= this.joinedSources.length) return true;
        if (this.joinedSources[tableIndex].getType() != undefined) return true;

        return false;
    }

    validate(): boolean {
        return this.joinedSources.every(
            (_: JoinedTable, index: number) => this.validateTable(index)
        );
    }
}