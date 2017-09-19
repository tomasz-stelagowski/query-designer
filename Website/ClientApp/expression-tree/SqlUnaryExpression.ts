import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { Expression } from "@angular/compiler/src/output/output_ast";
import { TransferObjectId } from "./TransferObjectId";

/**
 * Used to describe a node in expression tree which has one son.
 */
export interface SqlUnaryExpression extends SqlExpression {
    Expression: SqlExpression;
}

export class SqlUnaryExpressionBuilder {
    Expression: SqlExpression;
    protected ExpressionType: SqlExpressionType;
    protected ReturnType: SqlType;


    setExpressionType(value: SqlExpressionType): SqlUnaryExpressionBuilder {
        this.ExpressionType = value;
        return this;
    }

    setReturnType(value: SqlType): SqlUnaryExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    setExpression(value: SqlExpression): SqlUnaryExpressionBuilder {
        this.Expression = value;
        return this;
    }

    build(): SqlUnaryExpression {
        return {
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            Expression: this.Expression,
            TransferObjectId: TransferObjectId.SqlUnaryExpression
        };
    }
}
