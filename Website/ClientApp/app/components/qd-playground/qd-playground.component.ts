import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { QdqQueryMenuCommunicationService } from "../../qd-menu-communication.service";
import { QdqQueryComponent } from "../../../query/query.module";
import { Table, Query, Limit, TableInterface } from "../../../query/query.helpers";
import { ExpressionDefinitionBuilderService } from "../../../expression-tree/expression-definition-builder.service";

/**
 * Component that manages whole working area. It displays tables,
 * send change notifications to services.
 *
 * Files in the component:
 *
 * qd-playground.component.html - describes structure of the playground
 *
 * qd-playground.component.less - describes position of components
 */
@Component({
    selector: "qd-playground",
    template: require("./qd-playground.component.html"),
    styles: [require("./qd-playground.component.less")]
})

export class QdPlaygroundComponent implements OnInit {
    @ViewChild(QdqQueryComponent) private tableComponent: QdqQueryComponent;
    private tables: Query[] = new Array<Query>();

    constructor(private queryComService: QdqQueryMenuCommunicationService,
        private expressionBuilderService: ExpressionDefinitionBuilderService
    ) { }

	/**
	* Function that changes the displayed table
	* @param table 	table to be displayed
	* @return void
	*/
    selectedTable(table: Table): void {
        if (!this.tables[0]) {
            this.tables[0] = new Query(this.expressionBuilderService, table);
        } else {
            if (this.tableComponent) {
                this.tableComponent.joinTable(table);
            }
        }
    }

	/**
	* Function that adds limit to current working table.
	* @param limit 	limit to be added
	* @return void
	*/
    newLimit(limit): void {
        if (this.tableComponent) {
            this.tableComponent.addLimit(limit);
        }
    }

    loadQuery(query: Query): void {
        this.tables[0] = query;
    }

    ngOnInit(): void {
        this.queryComService.getTable().subscribe((table: Table) => this.selectedTable(table));
        this.queryComService.getlimit().subscribe((limit: Limit) => this.newLimit(limit));
        this.queryComService.getFilters().subscribe(() => this.newFilter());
        this.queryComService.getOrders().subscribe(() => this.newOrder());
        this.queryComService.getQueryToLoad().subscribe((query: Query) => this.loadQuery(query));
    }

	/**
	* Function that sends notification that user wants to save a working table.
	* @param table 	table to be saved
	* @return void
	*/
    tableSave(table): void {
        this.queryComService.saveTable(table);
    }

	/**
	* Function that removes the table.
	* Currently application supports only one working table.
	* @param none
	* @return void
	*/
    clearTable(): void {
        this.tables.shift();
    }

    newFilter() {
        if (this.tableComponent)
            this.tableComponent.addFilter();
    }

    newOrder() {
        if (this.tableComponent)
            this.tableComponent.addOrder();
    }
}
