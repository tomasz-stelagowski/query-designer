import { Injectable } from "@angular/core"
import { MdDialog, ComponentType } from "@angular/material";
import { IMessage } from "./message";
import { TableJoiner, Column, Filter, Order, JoinedTable, Query } from "../query/query.helpers";

import { InputDialogComponent } from "./components/input-dialog/input-dialog.component";
import { SelectDialogComponent } from "./components/select-dialog/select-dialog.component";
import { JoinDialog } from "./components/join-dialog/join-dialog.component";
import { FilterDialogComponent } from "./components/filter-dialog/filter-dialog.component";
import { OrderDialogComponent } from "./components/order-dialog/order-dialog.component";

@Injectable()
export class DialogService {
    constructor(private dialog: MdDialog) { }

    showInputDialog(placeholder: string, title: string, validationType?: string | string[]) {

        let validationTypeArray: string[] = Array.isArray(validationType) ? validationType : [validationType]

        let dialogRef = this.dialog.open(InputDialogComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.placeholder = placeholder ? placeholder : "";
        dialogRef.componentInstance.title = title ? title : "";
        dialogRef.componentInstance.validationType = validationTypeArray;

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.subscribe((val: string) => { dialogRef.close(); });

        return dialogRef;
    }

    showSelectDialog(optionList: any[], title: string) {
        let dialogRef = this.dialog.open(SelectDialogComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.title = title ? title : "";
        dialogRef.componentInstance.optionList = optionList ? optionList : [];

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.subscribe((val: string) => { dialogRef.close(); });

        return dialogRef;
    }

    showJoinDialog(tableJoiner: TableJoiner) {
        let dialogRef = this.dialog.open(JoinDialog, {
            disableClose: true
        });
        //dialogRef.componentInstance.baseColumns = baseColumns ? baseColumns : [];
        //dialogRef.componentInstance.joineeColumns = joineeColumns ? joineeColumns : [];
        dialogRef.componentInstance.tableJoiner = tableJoiner;

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.asObservable().subscribe(val => { dialogRef.close(); });

        return dialogRef;
    }

    showAddFilterDialog(columns: Column[]) {
        let dialogRef = this.dialog.open(FilterDialogComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.selectList = !!columns ? columns : [];
        dialogRef.componentInstance.title = "Add Filter";

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.asObservable().subscribe(val => { dialogRef.close(); });

        return dialogRef;
    }

    showEditFilterDialog(filter: Filter) {
        let dialogRef = this.dialog.open(FilterDialogComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.selectList = !!filter ? [filter.column] : [];
        dialogRef.componentInstance.placeholder = !!filter ? filter.value : "";
        dialogRef.componentInstance.title = "Edit Filter";

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.asObservable().subscribe(val => { dialogRef.close(); });

        return dialogRef;
    }

    showAddOrderDialog(columns: Column[]) {
        let dialogRef = this.dialog.open(OrderDialogComponent, {
            disableClose: true
        });

        dialogRef.componentInstance.selectList = !!columns ? columns : [];
        dialogRef.componentInstance.title = "Add Sorting";

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.asObservable().subscribe(val => { dialogRef.close(); });

        return dialogRef;
    }

    showEditOrderDialog(order: Order) {
        let dialogRef = this.dialog.open(OrderDialogComponent, {
            disableClose: true
        });

        if (!!order) {
            dialogRef.componentInstance.selectList = [order.column];
            dialogRef.componentInstance.setOrder(order);
        } else {
            dialogRef.componentInstance.selectList = [];
        }
        dialogRef.componentInstance.title = "Edit Sorting";

        dialogRef.componentInstance.cancel.subscribe((val: boolean) => { if (val) dialogRef.close() });
        dialogRef.componentInstance.save.asObservable().subscribe(val => { dialogRef.close(); });

        return dialogRef;
    }
}