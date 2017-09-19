import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { TransferObjectId } from "./TransferObjectId";

/*
 * node in expression tree which holds a constant
 */
export interface SqlConstantExpression extends SqlExpression {
    Constant: any;
}

export class SqlContantExpressionBuilder {
    Constant: any;
    protected ReturnType: SqlType;

    setReturnType(value: SqlType): SqlContantExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    setConstant(value: string): SqlContantExpressionBuilder {
        this.Constant = value;
        return this;
    }

    build(): SqlConstantExpression {
        return {
            ExpressionType: SqlExpressionType.Constant,
            ReturnType: this.ReturnType,
            Constant: this.Constant,
            TransferObjectId: TransferObjectId.SqlConstantExpression
        };
    }
}
