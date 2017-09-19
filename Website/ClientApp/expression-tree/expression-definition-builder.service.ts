import { Injectable } from "@angular/core"

import { Observable } from "rxjs/Rx";
import { SqlExpression, SqlExpressionBuilder } from "./SqlExpression";
import { SqlQueryExpression, SqlQueryExpressionBuilder } from "./SqlQueryExpression";
import { SqlBinaryExpressionBuilder } from "./SqlBinaryExpression";
import { SqlColumnExpression, SqlColumnExpressionBuilder } from "./SqlColumnExpression";
import { SqlExpressionType } from "./SqlExpressionType";
import { SqlJoinExpressionBuilder } from "./SqlJoinExpression";
import { SqlTableExpressionBuilder } from "./SqlTableExpression";
import { SqlUnaryExpressionBuilder } from "./SqlUnaryExpression";
import { ISource } from "./ISource";
import { SqlConstantExpression, SqlContantExpressionBuilder } from "./SqlConstantExpression";
import { ExpressionType } from "@angular/compiler/src/output/output_ast";
import { SqlJoinType } from "./SqlJoinType";
import { SqlType } from "./SqlType";
import { SqlTypeEnum } from "./SqlTypeEnum";
import { Model } from "../model/model";
import { Table } from "../query/query.helpers";
import { TransferObjectId } from "./TransferObjectId";

/**
 * Service which exposes builder pattern/factory method for a given expression type
 * for more complex types we use builder pattern.
 */
@Injectable()
export class ExpressionDefinitionBuilderService {

    public getISource(callName: string): ISource {
        return { "CallName": callName, "TransferObjectId": TransferObjectId.ISource };
    }

    public getSqlBinaryExpressionBuilder(): SqlBinaryExpressionBuilder {
        return new SqlBinaryExpressionBuilder();
    }

    /**
     * Gives you builder which takes into account columns are compatible with the model.
     * @param table
     * @returns {SqlColumnExpressionBuilder}
     */
    public getSqlColumnExpressionBuilder(table: Table): SqlColumnExpressionBuilder {
        return new SqlColumnExpressionBuilder(table);
    }

    public getSqlContantExpressionBuilder(): SqlContantExpressionBuilder {
        return new SqlContantExpressionBuilder();
    }

    public getExpressionBuilder(): SqlExpressionBuilder {
        return new SqlExpressionBuilder();
    }

    /**
     * It"s just a type conversion.
     * @param type
     * @returns {number}
     */
    public getSqlExpressionType(type: number): SqlExpressionType {
        return type;
    }

    public getSqlJoinExpressionBuilder(): SqlJoinExpressionBuilder {
        return new SqlJoinExpressionBuilder();
    }

    /**
     * Just a type conversion.
     * @param type
     * @returns {number}
     */
    public getSqlJoinType(type: number): SqlJoinType {
        return type;

    }

    public getSqlQueryExpressionBuilder(): SqlQueryExpressionBuilder {
        return new SqlQueryExpressionBuilder();
    }

    /**
     * Gives you builder which takes into account tables are compatible with the model.
     * @param model
     * @returns {SqlTableExpressionBuilder}
     */
    public getSqlTableExpressionBuilder(model: Model): SqlTableExpressionBuilder {
        return new SqlTableExpressionBuilder(model);
    }

    /**
     * Wrapper object factory method.
     * @param Nullable
     * @param type
     * @returns {{Nullable: boolean, SqlTypeEnum: SqlTypeEnum}}
     */
    public getSqlType(Nullable: boolean, type: SqlTypeEnum): SqlType {
        return {
            "Nullable": Nullable,
            "SqlTypeEnum": type,
            "TransferObjectId": TransferObjectId.SqlType
        }
    }

    /**
     * Type conversion.
     * @param type
     * @returns {number}
     */
    public getSqlTypeEnum(type: number): SqlTypeEnum {
        return type;

    }

    public getSqlUnaryExpressionBuilder(): SqlUnaryExpressionBuilder {
        return new SqlUnaryExpressionBuilder();
    }
}
