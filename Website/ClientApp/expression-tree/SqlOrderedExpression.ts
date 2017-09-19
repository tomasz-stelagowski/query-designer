import { SqlExpression } from "./SqlExpression";
import { OrderType } from "./OrderType";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { TransferObjectId } from "./TransferObjectId";


export class SqlOrderedExpression implements SqlExpression {
    ExpressionType: SqlExpressionType = SqlExpressionType.Ordered;
    TransferObjectId: TransferObjectId = TransferObjectId.SqlOrderedExpression;

    InnerExpression: SqlExpression;
    OrderType: OrderType;
    ReturnType: SqlType;

    constructor(innerExpression: SqlExpression, orderType: OrderType) {
        this.ReturnType = innerExpression.ReturnType;
        this.InnerExpression = innerExpression;
        this.OrderType = orderType;
    }
}