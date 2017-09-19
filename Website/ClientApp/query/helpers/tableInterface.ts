import { Column } from "./column";
import { Limit } from "./limit";
import { Table } from "./table";
import { SqlTableExpression } from "../../expression-tree/SqlTableExpression";
import { JoinedTable } from "./joinedTable";
import { ExpressionDefinitionBuilderService } from "../../expression-tree/expression-definition-builder.service";

/**
 * Interface of tables
 */
export interface TableInterface {
    getColumns(): Column[];
    getName(): string;
    getAliasOrName(): string;
    deepCopy(): TableInterface;

    getExpression(expressionBuilderService: ExpressionDefinitionBuilderService): SqlTableExpression;
}