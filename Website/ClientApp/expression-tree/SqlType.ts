import { SqlTypeEnum } from "./SqlTypeEnum"
import { TransferObjectId } from "./TransferObjectId";
import { IExpressionTransferObject } from "./IExpressionTransferObject";

export interface SqlType extends IExpressionTransferObject {
    Nullable: boolean;
    SqlTypeEnum: SqlTypeEnum;
}
