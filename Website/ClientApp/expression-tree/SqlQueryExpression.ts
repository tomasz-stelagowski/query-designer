import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { SqlTableExpression } from "./SqlTableExpression";
import { TransferObjectId } from "./TransferObjectId";


export interface SqlQueryExpression extends SqlExpression {
    Annotations: SqlExpression[];
    From: SqlExpression;
    GroupBy: SqlExpression[];
    Having: SqlExpression;
    OrderBy: SqlExpression[];
    Select: SqlExpression[];
    Where: SqlExpression;
    Limit: number;
}

export class SqlQueryExpressionBuilder {
    Annotations: SqlExpression[];
    From: SqlExpression;
    GroupBy: SqlExpression[];
    Having: SqlExpression;
    OrderBy: SqlExpression[];
    Select: SqlExpression[];
    Where: SqlExpression;
    Limit: number;
    protected ExpressionType: SqlExpressionType;
    protected ReturnType: SqlType;


    setExpressionType(value: SqlExpressionType): SqlQueryExpressionBuilder {
        this.ExpressionType = value;
        return this;
    }

    setReturnType(value: SqlType): SqlQueryExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    setAnnotations(value: SqlExpression[]): SqlQueryExpressionBuilder {
        this.Annotations = value;
        return this;
    }

    setFrom(value: SqlExpression): SqlQueryExpressionBuilder {
        this.From = value;
        return this;
    }

    setGroupBy(value: SqlExpression[]): SqlQueryExpressionBuilder {
        this.GroupBy = value;
        return this;
    }

    setHaving(value: SqlExpression): SqlQueryExpressionBuilder {
        this.Having = value;
        return this;
    }

    setOrderBy(value: SqlExpression[]): SqlQueryExpressionBuilder {
        this.OrderBy = value;
        return this;
    }

    setSelect(value: SqlExpression[]): SqlQueryExpressionBuilder {
        this.Select = value;
        return this;
    }

    setWhere(value: SqlExpression): SqlQueryExpressionBuilder {
        this.Where = value;
        return this;
    }

    setLimit(value: number): SqlQueryExpressionBuilder {
        this.Limit = value;
        return this;
    }

    build(): SqlQueryExpression {
        return {
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            Annotations: this.Annotations,
            From: this.From,
            GroupBy: this.GroupBy,
            Having: this.Having,
            OrderBy: this.OrderBy,
            Select: this.Select,
            Where: this.Where,
            Limit: this.Limit,
            TransferObjectId: TransferObjectId.SqlQueryExpression
        };
    }
}
