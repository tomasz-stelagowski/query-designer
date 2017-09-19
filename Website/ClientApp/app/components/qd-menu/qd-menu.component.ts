import { Component, Input, OnInit, SimpleChange } from "@angular/core";
import { ModelService, Model } from "../../../model/model.module";
import { Table, Query, Limit, TableInterface, Filter } from "../../../query/query.helpers";
import { QdqQueryMenuCommunicationService } from "../../qd-menu-communication.service";
import { Observable } from "rxjs/Rx";

/**
 * Component containing menu of the application.
 *
 * Files in the component:
 *
 * qd-menu.component.html - describes structure of the menu
 *
 * qd-menu.component.less - describes position of components
 */
@Component({
    selector: "qd-menu",
    template: require("./qd-menu.component.html"),
    styles: [require("./qd-menu.component.less")]
})

export class QdMenuComponent implements OnInit {
    private tables: TableInterface[] = [];
    private userTables: TableInterface[] = [];
    private limits: Limit[] = [];
    constructor(private modelService: ModelService,
        private queryComService: QdqQueryMenuCommunicationService
    ) { }

    public name: string;

	/**
	* Function that sends information to tableComService
	* that user choosed new Table to work on.
	* @param table 	table chosen by the user.
	* @return void
	*/
    addTable(table: TableInterface): void {
        this.queryComService.setTable(table.deepCopy());
    }

	/**
	* Function that receive tables from modelService.
	* @param none
	* @return void
	*/
    getTables(): void {
        this.modelService.Model.subscribe(model => {
            model.tables.forEach(table => this.tables.push(new Table(table)));
        });
    }

	/**
	* Function that send informartion about limits
	* to add, chosen by the user.
	* @param limit 	limit to be added
	* @return void
	*/
    addLimit(limit: Limit): void
    {
        this.queryComService.sendlimit(limit);
    }

    addFilter(): void {
        this.queryComService.addFilter();
    }

    addOrder(): void {
        this.queryComService.addOrders();
    }

	/**
	* Function to remove table previously saved by the user.
	* @param index 	index of the table to be removed in array of all tables
	* @return void
	*/
    removeUserTable(index: number): void
    {
        this.userTables.splice(index, 1);
    }

    ngOnInit(): void {
        this.getTables();

        this.limits.push(new Limit("TOP", 0));

        this.queryComService.getSavedTable().subscribe((table: Query) => this.userTables.push(table));
    }
}
