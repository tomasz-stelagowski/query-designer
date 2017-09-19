import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression"
import { SqlType } from "./SqlType"
import { SqlExpressionType } from "./SqlExpressionType";
import { TransferObjectId } from "./TransferObjectId";


/**
 * Used to describe a node in expression tree which has two sons.
 */
export interface SqlBinaryExpression extends SqlExpression {
    Left: SqlExpression;
    Right: SqlExpression;
}

export class SqlBinaryExpressionBuilder {
    Left: SqlExpression;
    Right: SqlExpression;
    protected ExpressionType: SqlExpressionType;
    protected ReturnType: SqlType;

    setExpressionType(value: SqlExpressionType): SqlBinaryExpressionBuilder {
        this.ExpressionType = value;
        return this;
    }

    setReturnType(value: SqlType): SqlBinaryExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    setLeft(value: SqlExpression): SqlBinaryExpressionBuilder {
        this.Left = value;
        return this;
    }

    setRight(value: SqlExpression): SqlBinaryExpressionBuilder {
        this.Right = value;
        return this;
    }

    build(): SqlBinaryExpression {
        return {
            TransferObjectId: TransferObjectId.SqlBinaryExpression,
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            Left: this.Left,
            Right: this.Right
        };
    }
}
