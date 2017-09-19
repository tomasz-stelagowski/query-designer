
import { Column } from "./column";
import { Limit } from "./limit";
import { TableInterface } from "./tableInterface"
import { ExpressionDefinitionBuilderService } from "../../expression-tree/expression-definition-builder.service";
import { SqlTableExpression } from "../../expression-tree/SqlTableExpression";
import { SqlTypeEnum } from "../../expression-tree/SqlTypeEnum";
import { SqlColumnExpression, SqlColumnExpressionBuilder } from "../../expression-tree/SqlColumnExpression";
import { ModelTable } from "../../model/model-table";
import { autoserializeAs, autoserialize, ISerializable, Deserialize } from "../../serialize";
import { ModelColumn } from "../../model/model.module";

/**
 * SQL Table class.
 */
export class Table implements TableInterface {
    @autoserializeAs(ModelTable) private readonly model: ModelTable;

    @autoserialize readonly name: string;
    readonly columns: Map<string, Column> = new Map<string, Column>();

    constructor(model?: ModelTable) {
        if (typeof model !== "undefined") {
            this.name = model.name;
            this.model = model;

            this.model.columns.forEach((value, key) => this.columns.set(key, new Column(value)));
        }
    }


    get clone(): Table {
        let clonedTable = new Table(this.model);
        this.columns.forEach((value: Column, key: string) => {
            clonedTable.columns.set(key, value.copy);
        });
        return clonedTable;
    }

    getColumns(): Column[] {
        let columns: Column[] = [];
        this.columns.forEach((column: Column) => columns.push(column.copy.addSource(this.getAliasOrName())));

        return columns;
    }

    protected getColumnExpressionTable(expressionBuilderService: ExpressionDefinitionBuilderService): SqlColumnExpression[] {
        return this.getColumns().map((column: Column) => this.getColumnExpression(column, expressionBuilderService));
    }

    protected getColumnExpression(column: Column, expressionBuilderService: ExpressionDefinitionBuilderService): SqlColumnExpression {
        let builder: SqlColumnExpressionBuilder = expressionBuilderService.getSqlColumnExpressionBuilder(null)

        let columnExp = builder
            .setName(column.simpleName)
            .setSource(expressionBuilderService.getISource(column.source[0]))
            .setReturnType(expressionBuilderService.getSqlType(true, 1))
            .build();

        return columnExp;
    }


    getName(): string {
        return this.name;
    }

    getAliasOrName(): string {
        return this.getName();
    }

    deepCopy(): Table {
        let clonedTable: Table = new Table(this.model);
        this.columns.forEach((value: Column, key: string) => {
            clonedTable.columns.set(key, value.copy);
        });

        return clonedTable;
    }

    getExpression(expressionBuilderService: ExpressionDefinitionBuilderService): SqlTableExpression {
        let sqlTableExp: SqlTableExpression = expressionBuilderService.getSqlTableExpressionBuilder(null)
            .setAlias(this.getAliasOrName())
            .setTableName(this.getName())
            .setCallName(this.getAliasOrName())
            .setColumns(this.getColumnExpressionTable(expressionBuilderService))
            .setReturnType(expressionBuilderService.getSqlType(true, SqlTypeEnum.Object))
            .build();

        return sqlTableExp;
    }

    public static OnDeserialized(instance, json: any): void {
        instance.model = Deserialize(json.model, ModelTable);

        instance.model.columns.forEach((value, key) => {
            let modelColumn: ModelColumn = Deserialize(value, ModelColumn);

            instance.columns.set(key, new Column(modelColumn));
        });
    }
}
