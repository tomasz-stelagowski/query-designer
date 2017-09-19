import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Table, Query, Limit, TableInterface, Filter } from "../query/query.helpers";

/**
* Service used in communication between menu and playground components.
*/
@Injectable()
export class QdqQueryMenuCommunicationService {

    private table: Subject<TableInterface> = new Subject<TableInterface>();
    private savedTable: Subject<TableInterface> = new Subject<TableInterface>();
    private limit: Subject<Limit> = new Subject<Limit>();
    private filter: Subject<void> = new Subject<void>();
    private order: Subject<void> = new Subject<void>();

    private load: Subject<Query> = new Subject<Query>();

    /**
    * Function that changes the observable table value to new table
    * set by menu component.
    * @param table    table set by menu to be displayed
    * @return void
    */
    setTable(table: TableInterface): void {
        this.table.next(table);
    }

    /**
    * Function that serve the table observable of table to be displayed.
    * Usually called by playground component.
    * @param none
    * @return Observable<TableInterface>    observable of table to be displayed
    */
    getTable(): Observable<TableInterface> {
        return this.table.asObservable();
    }

    /**
    * Function that sets new limit to be added to working table.
    * @param limit    limit to be set
    * @return void
    */
    sendlimit(limit: Limit) {
        this.limit.next(limit);
    }

    /**
    * Function that serve observable of the limited to be added to working table.
    * @param none
    * @return Observable<Limit>    limit to be added to working table
    */
    getlimit(): Observable<Limit> {
        return this.limit.asObservable();
    }

    addFilter() {
        this.filter.next();
    }

    getFilters(): Observable<void> {
        return this.filter.asObservable();
    }

    addOrders() {
        this.order.next();
    }

    getOrders(): Observable<void> {
        return this.order.asObservable();
    }
    /**
    * Function that sends notification that table should be send and
    * placed on menu under user saved tables.
    * @param table    table to be saved
    * @return void
    */
    saveTable(table: TableInterface) {
        this.savedTable.next(table);
    }

    /**
    * Function that serve observable of the table saved by the user.
    * @param none
    * @return Observable<TableInterface>    Table to be saved
    */
    getSavedTable(): Observable<TableInterface> {
        return this.savedTable.asObservable();
    }

    loadQuery(query: Query): void {
        return this.load.next(query);
    }

    getQueryToLoad(): Observable<Query> {
        return this.load.asObservable();
    }
}