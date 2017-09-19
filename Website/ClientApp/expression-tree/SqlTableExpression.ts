import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { SqlColumnExpression } from "./SqlColumnExpression";
import { Model } from "../model/model";
import { TransferObjectId } from "./TransferObjectId";


export interface SqlTableExpression extends SqlExpression {
    Alias: string;
    CallName: string;
    Columns: SqlColumnExpression[];
    TableName: string;
}

export class SqlTableExpressionBuilder {
    model: Model;
    Alias: string;
    CallName: string;
    Columns: SqlColumnExpression[];
    TableName: string;
    protected ExpressionType: SqlExpressionType = SqlExpressionType.Table;
    protected ReturnType: SqlType;


    setReturnType(value: SqlType): SqlTableExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    constructor(model: Model) {
        this.model = model;
    }

    setAlias(value: string): SqlTableExpressionBuilder {
        this.Alias = value;
        return this.setCallName(value);
    }

    setCallName(value: string): SqlTableExpressionBuilder {
        this.CallName = value;
        return this;
    }

    setColumns(value: SqlColumnExpression[]): SqlTableExpressionBuilder {
        this.Columns = value;
        return this;
    }

    /**
     * valides with the model whether table exists in it
     * @param value
     * @returns {SqlTableExpressionBuilder}
     */
    setTableName(value: string): SqlTableExpressionBuilder {
        // if (! this.model.tables.has(value)) console.log("table name not existing in a model " + value); @todo enable it in future
        this.TableName = value;
        return this;
    }

    build(): SqlTableExpression {
        return {
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            Alias: this.Alias,
            CallName: this.CallName,
            Columns: this.Columns,
            TableName: this.TableName,
            TransferObjectId: TransferObjectId.SqlTableExpression
        };
    }
}
