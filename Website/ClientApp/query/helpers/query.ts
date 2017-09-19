import { Column, Limit, Table, TableInterface, ComparableInterface, JoinedTable, JoinCondition, Filter, Order } from "../query.helpers";

import { ExpressionDefinitionBuilderService } from "../../expression-tree/expression-definition-builder.service";
import { SqlExpression } from "../../expression-tree/SqlExpression";
import { SqlQueryExpressionBuilder, SqlQueryExpression } from "../../expression-tree/SqlQueryExpression";
import { SqlColumnExpression, SqlColumnExpressionBuilder } from "../../expression-tree/SqlColumnExpression";
import { SqlTableExpression, SqlTableExpressionBuilder } from "../../expression-tree/SqlTableExpression";
import { SqlJoinExpression, SqlJoinExpressionBuilder } from "../../expression-tree/SqlJoinExpression";
import { SqlJoinType } from "../../expression-tree/SqlJoinType";
import { SqlExpressionType } from "../../expression-tree/SqlExpressionType";
import { SqlTypeEnum } from "../../expression-tree/SqlTypeEnum";
import { SqlBinaryExpression, SqlBinaryExpressionBuilder } from "../../expression-tree/SqlBinaryExpression";
import { SqlOrderedExpression } from "../../expression-tree/SqlOrderedExpression";
import { SqlConstantExpression } from "../../expression-tree/SqlConstantExpression";
import { autoserialize, autoserializeAs } from "../../serialize";

export class Query extends Table {
    @autoserialize private _name: string;
    @autoserializeAs(Column) private _columns: Column[] = [];
    @autoserializeAs(Limit) private _limits: Limit[] = [];
    @autoserializeAs(Filter) private _filters: Filter[] = [];
    @autoserializeAs(JoinedTable) private _joinedSources: JoinedTable[] = [];
    @autoserializeAs(Order) private _orders: Order[] = [];

    @autoserializeAs(Table) private _baseTable: Table;

    @autoserialize public _alias: string;

    private expressionBuilderService: ExpressionDefinitionBuilderService;

    constructor(expressionBuilderService?: ExpressionDefinitionBuilderService, table?: Table) {
        super();

        if (typeof expressionBuilderService !== "undefined") {
            this.expressionBuilderService = expressionBuilderService;
            this._name = table.getName();
            this._baseTable = table;
        }
    }

    public getBaseTable(): Table {
        return this._baseTable.deepCopy();
    }

    public setBaseTable(base: Table): void {
        this._baseTable = base;
    }

    getColumns(): Column[] {
        let columns: Column[] = [];
        this._columns.forEach((column: Column) => columns.push(column.copy));

        return columns;
    }

    getUnselectedColumns(): Column[] {
        let columns: Column[] =
            this.getSourceColumns().filter(col => !this.columnIsPresent<Column>(this._columns, col));

        return columns;
    }

    getLimits(): Limit[] {
        let limits: Limit[] = [];
        this._limits.forEach((limit: Limit) => limits.push(limit.copy));

        return limits;
    }

    getFilters(): Filter[] {
        let filters: Filter[] = [];
        this._filters.forEach((filter: Filter) => filters.push(filter.copy));

        return filters;
    }

    getOrders(): Order[] {
        let orders: Order[] = [];
        this._orders.forEach((order: Order) => orders.push(order.copy));

        return orders;
    }

    getSourceTables(): TableInterface[] {
        let sources: TableInterface[] = [this._baseTable];
        this.getJoinedSources().forEach((source: JoinedTable) => sources.push(source.getJoinedTable()));

        return sources;
    }

    getJoinedSources(): JoinedTable[] {
        let joinedSources: JoinedTable[] = []
        this._joinedSources.forEach((join: JoinedTable) => joinedSources.push(join.deepCopy()));

        return joinedSources;
    }

    addJoinedTable(table: Table, type: SqlJoinType, conditions: JoinCondition[]): void {
        this._joinedSources.push(new JoinedTable(table, type, conditions));
    }

    getSourceColumns(): Column[] {
        let columns: Column[] = [];
        this.getSourceTables().forEach((source: TableInterface) => {
            source.getColumns().forEach((column: Column) => columns.push(column))
        });

        return columns;
    }

    getUnFilteredSourceColumns(): Column[] {
        let columns: Column[] = [];
        this.getSourceTables().forEach((source: TableInterface) => {
            source.getColumns().forEach((column: Column) => {
                let condition = this.getFilters().some((fil: Filter) => {
                    return fil.column.isEqual(column);
                });
                if (!condition)
                    columns.push(column);
            })
        });

        return columns;
    }

    getUnSortedSourceColumns(): Column[] {
        let columns: Column[] = [];
        this.getSourceTables().forEach((source: TableInterface) => {
            source.getColumns().forEach((column: Column) => {
                let condition = this.getOrders().some((ord: Order) => {
                    return ord.column.isEqual(column);
                });
                if (!condition)
                    columns.push(column);
            })
        });

        return columns;
    }

    getName(): string {
        return this._name;
    }

    hasAlias(): boolean {
        return this.alias ? true : false;
    }

    getAliasName(): string {
        return this.alias;
    }

    getAliasOrName(): string {
        return this.hasAlias() ? this.getAliasName() : this.getName();
    }

    deepCopy(): Query {
        let copy: Query = new Query(this.expressionBuilderService, this._baseTable);

        copy.setName(this.getName())
            .setColumns(this.getColumns())
            .setLimits(this.getLimits())
            .setJoinedSources(this.getJoinedSources())
            .alias = this.alias;

        return copy;
    }


    addColumn(params: { index?: number, column: Column }): boolean {
        if (params.column === undefined) return false;

        if (this.columnIsPresent<Column>(this.getSourceColumns(), params.column) &&
            !this.columnIsPresent<Column>(this.getColumns(), params.column)) {

            if (params.index !== undefined) {
                this._columns.splice(params.index, 0, params.column);
                return true;
            } else {
                this._columns.push(params.column);
                return true;
            }

        } else {
            return false;
        }
    }

    removeColumn(params: { index?: number, column?: Column }): boolean {
        let current_length = this._columns.length;

        this._columns = this._columns.filter((col: Column, idx: number) => {

            if (params.column !== undefined && params.index !== undefined) {
                return !(col.isEqual(params.column) && idx == params.index);
            } else if (params.index !== undefined) {
                return !(idx == params.index);
            } else if (params.column !== undefined) {
                return !(col.isEqual(params.column));
            } else {
                return true;
            }
        });

        return (current_length != this._columns.length);
    }

    private addElement<T extends ComparableInterface>
        (collection: string, params: { index?: number, element: T }): boolean {
        if (params.element === undefined) {
            return false;
        }
        if (this[collection].some((el: T) => el.isEqual(params.element))) {
            return false;
        } else if (params.index !== undefined && params.index < this[collection].length) {
            this[collection].splice(params.index, 0, params.element);
            return true;
        } else {
            this[collection].push(params.element);
            return true;
        }
    }

    private removeElement<T extends ComparableInterface>
        (collection: string, params: { index?: number, element?: T }): boolean {
        let current_length = this[collection].length;
        this[collection] = this[collection].filter((el: T, idx: number) => {
            if (params.element !== undefined && params.index !== undefined) {
                return !(el.isEqual(params.element) && idx == params.index);
            } else if (params.index !== undefined) {
                return !(idx == params.index);
            } else if (params.element !== undefined) {
                return !(el.isEqual(params.element));
            } else {
                return true;
            }
        });

        return (current_length != this[collection].length);
    }

    public addLimit(params: { index?: number, limit: Limit }): boolean {
        return this.addElement("_limits", { index: params.index, element: params.limit });
    }

    public removeLimit(params: { index?: number, limit?: Limit }): boolean {
        return this.removeElement("_limits", { index: params.index, element: params.limit });
    }

    public addFilter(params: { index?: number, filter: Filter }): boolean {
        return this.addElement("_filters", { index: params.index, element: params.filter });

    }

    public removeFilter(params: { index?: number, filter?: Filter }): boolean {
        return this.removeElement("_filters", { index: params.index, element: params.filter });
    }

    public addOrder(params: { index?: number, order: Order }): boolean {
        return this.addElement("_orders", { index: params.index, element: params.order });
    }

    public removeOrder(params: { index?: number, order?: Order }): boolean {
        return this.removeElement("_orders", { index: params.index, element: params.order });
    }

    setAlias(alias: string): boolean {
        this.alias = alias;
        return true;
    }

    setName(name: string): Query {
        this._name = name;
        return this;
    }

    private setColumns(columns: Column[]): Query {
        this._columns = columns;
        return this;
    }

    private setLimits(limits: Limit[]): Query {
        this._limits = limits;
        return this;
    }

    setJoinedSources(sources: JoinedTable[]): Query {
        this._joinedSources = sources;
        return this;
    }

    public set alias(alias: string) {
        this._alias = alias;
    }

    public get alias() {
        return this._alias;
    }

    private columnIsPresent<T extends ComparableInterface>(collection: T[], element: T, index?: number) {
        if (index != undefined) {
            if (index < collection.length) {
                return collection[index].isEqual(element);
            } else {
                return false;
            }
        }

        return collection.some((el: T) => el.isEqual(element));
    }

    private getBinaryExpression(left: SqlExpression, compareType: SqlExpressionType, right: SqlExpression) {
        return this.expressionBuilderService.getSqlBinaryExpressionBuilder()
            .setExpressionType(compareType)
            .setLeft(left)
            .setRight(right)
            .setReturnType(this.expressionBuilderService.getSqlType(false, SqlTypeEnum.Boolean))
            .build();
    }

    private getConditionExpression(condition: JoinCondition): SqlBinaryExpression {
        let conditionExpressionType: SqlExpressionType = SqlExpressionType.Equal;

        //TODO: Write a service to resolve type of column.
        if (condition.left.type.indexOf("varchar") !== -1) {
            conditionExpressionType = SqlExpressionType.Like;
        }

        return this.getBinaryExpression(
            this.getColumnExpression(condition.left, this.expressionBuilderService),
            conditionExpressionType,
            this.getColumnExpression(condition.right, this.expressionBuilderService)
        );
    }

    private getWhereExpressionForFilter(filter: Filter): SqlBinaryExpression {
        let column: SqlColumnExpression = this.getColumnExpression(filter.column, this.expressionBuilderService);

        let constant: SqlConstantExpression = this.expressionBuilderService.getSqlContantExpressionBuilder()
            .setConstant(filter.value)
            .setReturnType(this.expressionBuilderService.getSqlType(false, filter.column.sqlType))
            .build();

        return this.getBinaryExpression(column, filter.operation, constant);
    }

    private getWhereExpression(): SqlBinaryExpression {
        return this._filters.reduce(
            (whereExpression: SqlBinaryExpression, filter) => {
                if (whereExpression === null) {
                    return this.getWhereExpressionForFilter(filter);
                }

                return this.getBinaryExpression(
                    whereExpression,
                    SqlExpressionType.And,
                    this.getWhereExpressionForFilter(filter));
            }, null);
    }

    getOrderedExpressionTable(): SqlOrderedExpression[] {
        return this._orders.map((order: Order) => this.getOrderedExpression(order));
    }

    getOrderedExpression(order: Order): SqlOrderedExpression {
        let columnExpression: SqlColumnExpression;
        columnExpression = this.getColumnExpression(order.column, this.expressionBuilderService);

        let orderedExpression: SqlOrderedExpression = new SqlOrderedExpression(columnExpression, order.orderType);

        return orderedExpression;
    }

    getQueryExpression(): SqlQueryExpression {
        let sqlFromExpression: SqlExpression = this.getExpression(this.expressionBuilderService);

        if (this._joinedSources.length > 0) {
            let sqlJoinExpressionBuilder: SqlJoinExpressionBuilder = this.expressionBuilderService
                .getSqlJoinExpressionBuilder();

            this._joinedSources.forEach(joinedSource => {
                let condition: SqlBinaryExpression = this.getConditionExpression(joinedSource.conditions[0]);

                for (let i = 1; i < joinedSource.conditions.length; i++) {
                    condition = this.getBinaryExpression(
                        condition,
                        SqlExpressionType.And,
                        this.getConditionExpression(joinedSource.conditions[i]))
                }

                sqlFromExpression = sqlJoinExpressionBuilder
                    .setLeft(sqlFromExpression)
                    .setJoinType(joinedSource.type)
                    .setRight(joinedSource.getJoinedTable().getExpression(this.expressionBuilderService))
                    .setReturnType(this.expressionBuilderService.getSqlType(false, SqlTypeEnum.Object))
                    .setCondition(condition)
                    .build();

            });
        }

        let limit = this._limits.length > 0 ? this.getLimits()[0].value : null;

        let sqlQueryExp: SqlQueryExpression = this.expressionBuilderService.getSqlQueryExpressionBuilder()
            .setAnnotations([])
            .setFrom(sqlFromExpression)
            .setGroupBy([])
            .setHaving(null)
            .setOrderBy(this.getOrderedExpressionTable())
            .setLimit(limit)
            .setSelect(this.getColumnExpressionTable(this.expressionBuilderService))
            .setWhere(this.getWhereExpression())
            .setExpressionType(SqlExpressionType.Query)
            .setReturnType(this.expressionBuilderService.getSqlType(true, SqlTypeEnum.None))
            .build();

        sqlQueryExp.From = sqlFromExpression;
        sqlQueryExp.Select = this.getColumnExpressionTable(this.expressionBuilderService);

        return sqlQueryExp
    }

    public static OnDeserialized(instance: Query, json: any): void {
        if (typeof instance._columns === "undefined") {
            instance._columns = [];
        }
        if (typeof instance._limits === "undefined") {
            instance._limits = [];
        }
        if (typeof instance._filters === "undefined") {
            instance._filters = [];
        }
        if (typeof instance._joinedSources === "undefined") {
            instance._joinedSources = [];
        }
        if (typeof instance._orders === "undefined") {
            instance._orders = [];
        }
    }
}