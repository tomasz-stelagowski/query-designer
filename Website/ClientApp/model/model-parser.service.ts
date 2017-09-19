import {Injectable, Inject} from "@angular/core"
import { Http } from "@angular/http";

import { Observable } from "rxjs/Rx";

import { Model } from "./model";
import { ModelTable } from "./model-table";
import { ModelColumn } from "./model-column";

const XMLNS_EDMX: string = "http://schemas.microsoft.com/ado/2009/11/edmx";

/**
 * Service where you pass the EDMX model of you database,
 * you get a parsed version of it that we use to validate our expression
 */
@Injectable()
export class ModelParserService {
    constructor(@Inject(Http) private http: Http) { }

  /**
   * helper function for downloading
   * @param modelEndpoint @todo change type to an URL
   * @returns {Observable<R>}
   */
    private getXmlFromServer(modelEndpoint: string): Observable<string> {
        return this.http.get(modelEndpoint).map(response => <string>response.text());
    }

  /**
   * parses generic element object into Column
   * @param columnDocument
   * @returns {Column}
   */
    private parseColumn(columnDocument: Element): ModelColumn {
        let parsedColumn: ModelColumn = new ModelColumn(columnDocument.getAttribute("Name"), columnDocument.getAttribute("Type"));

        return parsedColumn;
    }

  /**
   * parses element into a Table
   * @param tableDocument
   * @returns {Table}
   */
    private parseTable(tableDocument: Element): ModelTable {
        let columnsMap: Map<string, ModelColumn> = new Map<string, ModelColumn>();

        let name: string = tableDocument.getAttribute("Name");
        let columns: NodeListOf<Element> = tableDocument.getElementsByTagName("Property");

        for (let i: number = 0; i < columns.length; i++) {
            let parsedColumn: ModelColumn = this.parseColumn(columns.item(i));

            columnsMap.set(parsedColumn.name, parsedColumn);
        }

        return new ModelTable(name, columnsMap);
    }

  /**
   *
   * @param edmxDocument
   * @returns {Element}
   */
    private getSchemaFromXml(edmxDocument: Document) : Element {
        return edmxDocument.getElementsByTagNameNS(XMLNS_EDMX, "Edmx").item(0)
            .getElementsByTagNameNS(XMLNS_EDMX, "Runtime").item(0)
            .getElementsByTagNameNS(XMLNS_EDMX, "StorageModels").item(0)
            .getElementsByTagName("Schema").item(0);
    }

  /**
   * returns model object given a xml string
   * @param xml
   * @returns {Model}
   */
    private parseXml(xml: string): Model {
        let parser: DOMParser = new DOMParser();
        let tablesMap: Map<string, ModelTable> = new Map<string, ModelTable>();

        let schema: Element = this.getSchemaFromXml(parser.parseFromString(xml, "text/xml"));
        let tables: NodeListOf<Element> = schema.getElementsByTagName("EntityType");

        for (let i: number = 0; i < tables.length; i++) {
            let parsedTable: ModelTable = this.parseTable(tables.item(i));

            tablesMap.set(parsedTable.name, parsedTable);
        }

        return new Model(tablesMap);
    }

  /**
   * downloads the model and parses it
   * @param endpoint @todo change endpoint type to URL
   * @returns {Observable<R>}
   */
    public parseModel(endpoint: string): Observable<Model> {
        let xmlObservable: Observable<string> = this.getXmlFromServer(endpoint);

        return xmlObservable.map(xml => this.parseXml(xml));
    }

    public parseModelString(content:string) : Model {
        return this.parseXml(content);
    }
}
