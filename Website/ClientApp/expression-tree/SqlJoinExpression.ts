import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { SqlJoinType } from "./SqlJoinType";
import { SqlBinaryExpressionBuilder, SqlBinaryExpression } from "./SqlBinaryExpression";
import { TransferObjectId } from "./TransferObjectId";


export interface SqlJoinExpression extends SqlBinaryExpression {
    Condition: SqlExpression;
    JoinType: SqlJoinType;
}


export class SqlJoinExpressionBuilder {
    Condition: SqlExpression;
    JoinType: SqlJoinType;
    protected ExpressionType: SqlExpressionType = SqlExpressionType.Join;
    protected ReturnType: SqlType;
    Left: SqlExpression;
    Right: SqlExpression;

    setLeft(value: SqlExpression): SqlJoinExpressionBuilder {
        this.Left = value;
        return this;
    }

    setRight(value: SqlExpression): SqlJoinExpressionBuilder {
        this.Right = value;
        return this;
    }


    setExpressionType(value: SqlExpressionType): SqlJoinExpressionBuilder {
        this.ExpressionType = value;
        return this;
    }

    setReturnType(value: SqlType): SqlJoinExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    setCondition(value: SqlExpression): SqlJoinExpressionBuilder {
        this.Condition = value;
        return this;
    }

    setJoinType(value: SqlJoinType): SqlJoinExpressionBuilder {
        this.JoinType = value;
        return this;
    }

    build(): SqlJoinExpression {
        return {
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            Condition: this.Condition,
            JoinType: this.JoinType,
            Left: this.Left,
            Right: this.Right,
            TransferObjectId: TransferObjectId.SqlJoinExpression
        };
    }
}
