import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges } from "@angular/core";
import { MdMenuModule } from "@angular/material";
import { IMessage } from "../../../message";
import { Column, JoinCondition, TableJoiner } from "../../../../query/query.helpers";
import { SelectComponent } from "../../../../controls/controls.module"
import { SqlJoinType } from "../../../../expression-tree/SqlJoinType";

/**
 * Popup component for performing joins on tables.
 */
@Component({
    selector: "join-parameters",
    template: require("./join-parameters.component.html"),
    styles: [require("./join-parameters.component.less")]
})
export class JoinParametersComponent implements OnInit {
    @Input() currentTable: number;
    @Input() tableJoiner: TableJoiner;
    @Input() changeDetector: boolean;

    @ViewChild("selectBase") private selectBase: SelectComponent<Column>;
    @ViewChild("selectJoinee") private selectJoinee: SelectComponent<Column>;

    baseColumns: Column[];
    joineeColumns: Column[];

    baseSelectValue: Column;
    joineeSelectValue: Column;

    conditions: JoinCondition[] = [];
    possibleBaseColumns: Column[] = [];
    possibleJoineeColumns: Column[] = [];
    images;

    private tryToPreSelectColumns(): void {

    }

    ngOnInit() {
        this.images = [
            {
                url: require("./INNER_JOIN.png"),
                value: "INNER JOIN",
                type: SqlJoinType.Inner,
            },
            {
                url: require("./FULL_OUTER_JOIN.png"),
                value: "FULL OUTER JOIN",
                type: SqlJoinType.Full,
            }, {
                url: require("./LEFT_OUTER_JOIN.png"),
                value: "LEFT OUTER JOIN",
                type: SqlJoinType.LeftOuter,
            }, {
                url: require("./RIGHT_OUTER_JOIN.png"),
                value: "RIGHT OUTER JOIN",
                type: SqlJoinType.RightOuter,
            },
        ];


        this.initInputs();
        this.functionToBeCalledOnChanges = this.prepareCleanInputs;

    }

    functionToBeCalledOnChanges: () => void;
    ngOnChanges() {
        if (!!this.functionToBeCalledOnChanges)
            this.functionToBeCalledOnChanges();

    }

    initInputs() {
        this.possibleJoineeColumns = [];
        this.possibleBaseColumns = this.tableJoiner.getColumnsUpToIndex(this.currentTable).filter(
            (col) => !this.tableJoiner.joinedSources[this.currentTable].getConditions().some(
                (con: JoinCondition) => con.left.isEqual(col)
            )
        );
    }

    onBaseSelected($event) {
        this.possibleJoineeColumns = [];
        this.selectJoinee.cleanSelect();
        this.tableJoiner.joinedSources[this.currentTable].getJoinedTable().getColumns().forEach(
            (col) => {
                if (!!this.baseSelectValue && col.type == this.baseSelectValue.type) {
                    this.possibleJoineeColumns.push(col);
                }
            });
    }


    prepareCleanInputs() {
        if (!!this.selectBase) this.selectBase.cleanSelect();
        if (!!this.selectJoinee) this.selectJoinee.cleanSelect();
        this.initInputs();
    }

    /**
    * Function that handles event of adding new condition.
    * @param none
    * @return void
    */
    addCondition() {
        if(this.joineeSelectValue != undefined){
            if (!!this.baseSelectValue
                && !!this.joineeSelectValue) {

                let isConditionPresent = this.tableJoiner.joinedSources[this.currentTable].getConditions().some(
                    (condition) => {
                        if (condition.left.isEqual(this.baseSelectValue)
                            && condition.right.isEqual(this.joineeSelectValue)) {
                            return true;
                        }

                        else return false;
                    }
                );

                if (!isConditionPresent) {
                    this.tableJoiner.addCondition(this.currentTable,
                        this.baseSelectValue,
                        this.joineeSelectValue);
                }
            }

            this.ngOnChanges();
        }
    }

    /**
    * Function that handles event of removing condition.
    * @param index    index of condition to be removed
    * @return void
    */
    removeCondition(index: number) {
        this.tableJoiner.removeCondition(this.currentTable, index);
        this.prepareCleanInputs()
        return;
    }
    /**
     * Function that performs after clicking chosen type of join.
     * @param tile clicked that indicates type
     * @return void
     */
    selectType(type: SqlJoinType) {
        this.tableJoiner.setConditionType(this.currentTable, type)
    }
}