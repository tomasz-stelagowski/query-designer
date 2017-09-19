import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges } from "@angular/core";
import { TableJoiner, Column, JoinCondition, JoinedTable, Query } from "../../../../query/query.helpers";
import { SelectComponent } from "../../../../controls/controls.module"
import { SqlJoinType } from "../../../../expression-tree/SqlJoinType";

/**
 * Popup component for performing joins on tables.
 */
@Component({
    selector: "join-order",
    template: require("./join-order.component.html"),
    styles: [require("./join-order.component.less")]
})
export class JoinOrderComponent {
    constructor() { }

    @Input() tableJoiner: TableJoiner;
    @Input() currentTable: number;

    @Output("moveTableUp") _moveTableUp: EventEmitter<number> = new EventEmitter<number>();
    @Output("removeTable") _removeTable: EventEmitter<number> = new EventEmitter<number>();
    @Output("editTable") _editTable: EventEmitter<number> = new EventEmitter<number>();
    @Output("moveTableDown") _moveTableDown: EventEmitter<number> = new EventEmitter<number>();
    ngOnInit() { }

    moveTableUp(index: number): void {
        this._moveTableUp.emit(index);
    }
    removeTable(index: number): void {
        this._removeTable.emit(index);
    }
    editTable(index: number): void {
        if(index > 0)
            this._editTable.emit(index);
    }
    moveTableDown(index: number): void {
        this._moveTableDown.emit(index);
    }

}