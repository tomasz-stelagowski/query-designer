import { SqlExpressionType } from "./SqlExpressionType";
import { SqlType } from "./SqlType";
import { TransferObjectId } from "./TransferObjectId";
import { IExpressionTransferObject } from "./IExpressionTransferObject";

export interface SqlExpression extends IExpressionTransferObject {
    ExpressionType: SqlExpressionType;
    ReturnType: SqlType;
}

export class SqlExpressionBuilder {
    constructor() {
    }

    protected ExpressionType: SqlExpressionType;
    protected ReturnType: SqlType;


    setExpressionType(value: SqlExpressionType): SqlExpressionBuilder {
        this.ExpressionType = value;
        return this;
    }

    setReturnType(value: SqlType): SqlExpressionBuilder {
        this.ReturnType = value;
        return this;
    }

    build(): SqlExpression {
        return {
            ExpressionType: this.ExpressionType,
            ReturnType: this.ReturnType,
            TransferObjectId: TransferObjectId.SqlQueryExpression // Tu coś innego trzeba ustawić...
        };
    }
}
