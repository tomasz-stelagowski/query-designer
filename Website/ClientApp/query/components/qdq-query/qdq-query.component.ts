import { Component, Input, Output, SimpleChange, OnInit, EventEmitter } from "@angular/core";
import { TableJoiner, Table, Query, Column, Limit, Filter, Order, TableInterface, JoinedTable } from "../../../query/query.helpers";
import { DialogService, MessageService } from "../../../dialog/dialog.module";
import { SqlTableExpression } from "../../../expression-tree/SqlTableExpression";
import { Http } from "@angular/http"
import { Serialize } from "../../../serialize";

/**
 * Component responsible for displaying the query with FROM tables,
 * selected columns and filters and limits modificators.
 */
@Component({
    selector: "qdq-query",
    template: require("./qdq-query.component.html"),
    styles: [require("./qdq-query.component.less")]
})

export class QdqQueryComponent {
    constructor(
        private popup: DialogService,
        private messageService: MessageService,
        private http: Http,
    ) { }

    @Input("query") private query: Query;
    @Output() save: EventEmitter<TableInterface> = new EventEmitter<TableInterface>();
    @Output() clear: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Function that remove given column.
     * @param index	index of column to be removed
     * @return void
     */
    removeColumn(index: number): void {
        this.query.removeColumn({ index: index });
    }

    /**
     * shows a dialog with user expression
     * @todo move it to a service
     */
    showExpression(table: TableInterface): void {
        this.http.post(
            "api/expressionparser/parse",
            this.query.getQueryExpression()
        ).subscribe(response => {
            this.messageService.showSuccessMessage(
                response.text()
            );
        });
    }

    /**
     * Function that adds the chosen column.
     * Column is chosen by user in displayed modal window.
     * @param none
     * @return void
     */
    addColumn(): void {
        let dialogRef = this.popup.showSelectDialog(this.query.getUnselectedColumns(), "Add Column");

        dialogRef.componentInstance.save.subscribe((val: Column) => {
            this.query.addColumn({ column: val });
        });
    }

    /**
     * Function that changes name of query.
     * The new name is selected by the user in displayed modal window.
     * @param none
     * @return void
     */
    changeQueryName(): void {
        let dialogRef = this.popup.showInputDialog(this.query.getAliasOrName(), "Set Alias", "string");

        dialogRef.componentInstance.save.subscribe(
            (val: string) => {
                this.query.setAlias(val);
            }
        );
    }

    /**
     * Function that adds certain limit field to table.
     * The value of the limit is choosen by user in modal window.
     * @param lim 	limit to be added
     * @return void
     */
    addLimit(lim: Limit): void {
        let dialogRef = this.popup.showInputDialog("Number eg.: 4, 5", `Set value: ${lim.name}`, ["number", "maxlengthTop"]);

        dialogRef.componentInstance.save.subscribe((val: string) => {
            let parsed = Number(val)
            if (parsed || parsed == 0) {
                this.query.addLimit({ limit: new Limit(lim.name, parsed) });
            }
        });
    }

    /**
     * Function that resets the value of the limit.
     * New value is set by user in modal window.
     * @param lim	limit to be edited
     * @return void
     */
    editLimit(lim: Limit): void {
        let dialogRef = this.popup.showInputDialog(`Present: ${lim.value}`, `Set value: ${lim.name}`, ["number", "maxlengthTop"]);

        dialogRef.componentInstance.save.subscribe((val: string) => {
            if (Number(val) || Number(val) == 0) {
                this.query.removeLimit({ limit: lim });
                this.query.addLimit({ limit: new Limit(lim.name, Number(val)) });
            }
        });
    }

    /**
     * Function that remove given limit.
     * @param index	index of limit to be removed
     * @return void
     */
    removeLimit(index: number): void {
        this.query.removeLimit({ index: index });
    }

    /**
     * Function that saves the actual working table
     * and place it in menu under user saved tables.
     * @param none
     * @return void
     */
    saveTable(): void {
        this.save.next(this.query.deepCopy());
    }

    /**
     * Function that sends information to clear query from playground.
     * @param none
     * @return void
     */
    clearQuery(): void {
        this.clear.next();
    }

    saveQuery(): void {
        this.messageService.showSuccessMessage(JSON.stringify(Serialize(this.query)));
    }

    /**
     * Function that that performs a join on tables.
     * @param table to be joined
     * @return void
     */
    joinTable(table: Table) {
        let dialogRef = this.popup.showJoinDialog(new TableJoiner(this.query).addTable(table, undefined, []));
        dialogRef.componentInstance.save.asObservable().subscribe((newTable) => {
            this.query = newTable;
        });
    }

    addFilter() {
        let dialogRef = this.popup.showAddFilterDialog(this.query.getSourceColumns());
        dialogRef.componentInstance.save.subscribe((data) => {
            this.query.addFilter({ filter: new Filter(data.left, data.operation, data.right) });
        });
    }

    removeFilter(index: number): void {
        this.query.removeFilter({ index: index });
    }

    editFilter(filter: Filter, index: number): void {
        let dialogRef = this.popup.showEditFilterDialog(filter);
        dialogRef.componentInstance.save.subscribe((data) => {
            this.query.removeFilter({ index: index });
            this.query.addFilter({ filter: new Filter(data.left, data.operation, data.right), index: index });
        });
    }

    addOrder() {
        let dialogRef = this.popup.showAddOrderDialog(this.query.getUnSortedSourceColumns());

        dialogRef.componentInstance.save.subscribe((order: Order) => {
            this.query.addOrder({ order: order });
        });
    }

    removeOrder(index: number) {
        this.query.removeOrder({ index: index });
    }

    editOrder(order: Order, index: number) {
        let dialogRef = this.popup.showEditOrderDialog(order);

        dialogRef.componentInstance.save.subscribe((order: Order) => {
            this.query.removeOrder({ index: index });
            this.query.addOrder({ order: order, index: index });
        });
    }
}