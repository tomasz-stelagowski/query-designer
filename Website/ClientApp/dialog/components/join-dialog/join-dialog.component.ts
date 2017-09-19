import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges } from "@angular/core";
import { MdMenuModule } from "@angular/material";
import { IMessage } from "../../message";
import { Column, JoinCondition, JoinedTable, Query, TableJoiner } from "../../../query/query.helpers";
import { SelectComponent } from "../../../controls/controls.module"
import { SqlJoinType } from "../../../expression-tree/SqlJoinType";
import { JoinOrderComponent } from "./join-order/join-order.component";
import { JoinParametersComponent } from "./join-parameters/join-parameters.component";

/**
 * Popup component for performing joins on tables.
 */
@Component({
    selector: "join-dialog",
    template: require("./join-dialog.component.html"),
    styles: [require("./join-dialog.component.less")]
})
export class JoinDialog {

    @Input() tableJoiner: TableJoiner;
    @Input() startngTable?: number;
    _currentTable: number;

    changeEventEmitter: boolean = false;
    toggleChangeEventEmitter(){
        this.changeEventEmitter = !this.changeEventEmitter;
    }

    ngOnInit() {
        if (this.tableJoiner.getSourceTables().length <= 1) {
            return this.saveButton();
        }
        if (!!this.startngTable) {
            this.currentTable = this.startngTable;
            return;
        }

        this.currentTable = this.tableJoiner.getSourceTables().length - 1;
    }

    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() save: EventEmitter<Query> = new EventEmitter<Query>();


    cancelButton() {
        this.cancel.emit(true);
    }
    saveButton(): void {
        if (this.tableJoiner.validate()) {
            this.save.emit(this.tableJoiner.extractTableExpr());
        }
    }

    moveTableUp(index: number): void {
        if (this.currentTable == index) this.currentTable = index - 1;
        else if (this.currentTable == index - 1) this.currentTable = index;
        this.tableJoiner.shiftTableUp(index);

        this.toggleChangeEventEmitter();
    }
    set currentTable(i: number) {
        if (i == 0) {
            if (this.tableJoiner.getSourceTables().length == 1) {
                this.saveButton();
            } else {
                this._currentTable = 1;
            }
        } else {
            this._currentTable = i;
        }
    }
    get currentTable(): number {
        return this._currentTable;
    }
    removeTable(index: number): void {
        this.tableJoiner.removeTable(index);
        if (this.currentTable >= index) this.currentTable = index - 1;

        this.toggleChangeEventEmitter();
    }
    editTable(index: number): void {
        this.currentTable = index;

        this.toggleChangeEventEmitter();
    }
    moveTableDown(index: number): void {
        if (this.currentTable == index) this.currentTable = index + 1;
        else if (this.currentTable == index + 1) this.currentTable = index;
        this.tableJoiner.shiftTableDown(index);

        this.toggleChangeEventEmitter();
    }

}

export { JoinOrderComponent, JoinParametersComponent };