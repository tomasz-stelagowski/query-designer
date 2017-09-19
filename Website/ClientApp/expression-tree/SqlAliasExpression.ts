import { SqlExpression } from "./SqlExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { TransferObjectId } from "./TransferObjectId";

export interface SqlAliasExpression extends SqlExpression {
    InnerExpression: SqlExpression;
    Alias: string;
}