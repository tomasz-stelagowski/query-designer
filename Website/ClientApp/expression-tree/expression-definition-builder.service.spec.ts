import { } from "jasmine";

import { TestBed, inject, async } from "@angular/core/testing";
import { ExpressionDefinitionBuilderService } from "./expression-definition-builder.service";
import { SqlExpressionType } from "./SqlExpressionType";
import { SqlTypeEnum } from "./SqlTypeEnum";

describe("Expression Tree module", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                ExpressionDefinitionBuilderService
            ]
        }).compileComponents();
    });

    it("return all the builders without error",
        async(inject([ExpressionDefinitionBuilderService], (service: ExpressionDefinitionBuilderService) => {
            service.getSqlBinaryExpressionBuilder();
            service.getSqlColumnExpressionBuilder(null);
            service.getSqlTableExpressionBuilder(null);
            service.getExpressionBuilder();
            service.getSqlContantExpressionBuilder();
            service.getSqlJoinExpressionBuilder();
            service.getSqlQueryExpressionBuilder();
            service.getSqlUnaryExpressionBuilder();
        }
        )
        )
    );

    it("allow to build column Exp",
        async(inject([ExpressionDefinitionBuilderService], (service: ExpressionDefinitionBuilderService) => {
            let sqlQueryExp = service.getSqlColumnExpressionBuilder(null)
                .setReturnType(service.getSqlType(true, SqlTypeEnum.None))
                .setName("")
                .build()
        }
        )
        )
    );

    it("allow to build Table Exp",
        async(inject([ExpressionDefinitionBuilderService], (service: ExpressionDefinitionBuilderService) => {
            let sqlQueryExp = service.getSqlTableExpressionBuilder(null)
                .setReturnType(service.getSqlType(true, SqlTypeEnum.None))
                .setAlias("")
                .setColumns([])
                .setTableName("")
                .setCallName("")
                .build()
        }
        )
        )
    );

    it("allow to build table Exp",
        async(inject([ExpressionDefinitionBuilderService], (service: ExpressionDefinitionBuilderService) => {
            let sqlTableExp = service.getSqlTableExpressionBuilder(null)
                .setAlias("")
                .setTableName("")
                .setCallName("")
                .setColumns([])
                .setReturnType(service.getSqlType(true, 1))
                .build()
        }
        )
        )
    );


    it("allow to build table Query Exp",
        async(inject([ExpressionDefinitionBuilderService], (service: ExpressionDefinitionBuilderService) => {
            let sqlQueryExp = service.getSqlQueryExpressionBuilder()
                .setAnnotations([])
                .setFrom(null)
                .setGroupBy([])
                .setHaving(null)
                .setOrderBy([])
                .setSelect([])
                .setWhere(null)
                .setExpressionType(SqlExpressionType.Query)
                .setReturnType(service.getSqlType(true, SqlTypeEnum.None))
                .build()
        }
        )
        )
    );
});