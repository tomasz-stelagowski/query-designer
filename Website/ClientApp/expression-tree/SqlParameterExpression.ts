import { SqlConstantExpression } from "./SqlConstantExpression";
import { SqlType } from "./SqlType";
import { SqlExpressionType } from "./SqlExpressionType";
import { TransferObjectId } from "./TransferObjectId";


export interface SqlParameterExpression extends SqlConstantExpression {
    Name: string;
    FullType: string;
}