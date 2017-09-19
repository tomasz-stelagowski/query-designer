import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { ISource } from "./ISource";
import { Table } from "../query/query.helpers";
import { TransferObjectId } from "./TransferObjectId";


/*
 * Used to describe a node in expression tree which describes a column.
 */
export interface SqlColumnExpression extends SqlExpression {
    Name: string;
    Source: ISource;
}

export class SqlColumnExpressionBuilder {
    Name: string;
    Source: ISource;
    table: Table;
    protected ExpressionType: SqlExpressionType = SqlExpressionType.Column;
    protected ReturnType: SqlType;

    setReturnType(value: SqlType): SqlColumnExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    constructor(table: Table) {
        this.table = table;
    }

    /**
     * valides with the model
     * @param value
     * @returns {SqlColumnExpressionBuilder}
     */
    setName(value: string): SqlColumnExpressionBuilder {
        // if (! this.table.columns.has(value)) console.log("column name not existing in a table " + value); @todo enable
        this.Name = value;
        return this;
    }

    setSource(value: ISource): SqlColumnExpressionBuilder {
        this.Source = value;
        return this;
    }

    build(): SqlColumnExpression {
        return {
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            Name: this.Name,
            Source: this.Source,
            TransferObjectId: TransferObjectId.SqlColumnExpression
        };
    }
}
